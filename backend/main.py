import os
from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_KEY"]
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(title="Wedding Tabs Studio API")

# CORS — list every real frontend origin explicitly, no trailing slashes
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://photography-beta-one.vercel.app",
        "https://www.weddingtabs.com",   # replace with real production URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Models ----------
class BookingRequest(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    shoot_type: str
    event_date: Optional[str] = None
    package: Optional[str] = "Standard"
    address: Optional[str] = None
    distance_km: Optional[float] = None
    estimate: Optional[float] = None
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    services_selected: Optional[list] = None
    sub_events_selected: Optional[list] = None
    album_selected: Optional[str] = None
    deliverables_selected: Optional[list] = None
    notes: Optional[str] = None


class StatusUpdate(BaseModel):
    status: str


# ---------- Admin auth dependency ----------
def verify_admin(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization token")
    token = authorization.replace("Bearer ", "")
    try:
        user = supabase.auth.get_user(token)
        if not user or not user.user:
            raise HTTPException(status_code=401, detail="Invalid token")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return user.user


# ---------- Public routes ----------
@app.post("/booking")
def create_booking(booking: BookingRequest):
    # Upsert customer
    customer = supabase.table("customers").insert({
        "name": booking.name,
        "phone": booking.phone,
        "email": booking.email,
        "address": booking.address,
    }).execute()
    customer_id = customer.data[0]["id"]

    result = supabase.table("bookings").insert({
        "customer_id": customer_id,
        "shoot_type": booking.shoot_type,
        "event_date": booking.event_date,
        "package": booking.package,
        "distance_km": booking.distance_km,
        "estimate": booking.estimate,
        "status": "Pending",
        "event_type": booking.shoot_type,
        "location": booking.location,
        "latitude": booking.latitude,
        "longitude": booking.longitude,
        "services_selected": booking.services_selected,
        "sub_events_selected": booking.sub_events_selected,
        "album_selected": booking.album_selected,
        "deliverables_selected": booking.deliverables_selected,
        "notes": booking.notes,
        "total_estimate": booking.estimate,
    }).execute()

    return {"success": True, "booking": result.data[0]}


@app.get("/booking/{booking_id}")
def get_booking(booking_id: str):
    result = supabase.table("bookings").select("*").eq("id", booking_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Booking not found")
    return result.data[0]


@app.get("/bookings/by-phone/{phone}")
def get_bookings_by_phone(phone: str):
    customers = supabase.table("customers").select("id").eq("phone", phone).execute()
    if not customers.data:
        return []
    customer_ids = [c["id"] for c in customers.data]
    bookings = supabase.table("bookings").select("*").in_("customer_id", customer_ids).execute()
    return bookings.data


# ---------- Admin-only routes ----------
@app.get("/bookings")
def list_bookings(admin=Depends(verify_admin)):
    result = supabase.table("bookings").select("*, customers(name, phone)").order("created_at", desc=True).execute()
    # Flatten customer info for convenience
    rows = []
    for b in result.data:
        customer = b.pop("customers", {}) or {}
        rows.append({**b, "name": customer.get("name"), "phone": customer.get("phone")})
    return rows


@app.put("/booking/{booking_id}/status")
def update_booking_status(booking_id: str, update: StatusUpdate, admin=Depends(verify_admin)):
    result = supabase.table("bookings").update({"status": update.status}).eq("id", booking_id).execute()
    return {"success": True, "booking": result.data[0] if result.data else None}


@app.get("/customers")
def list_customers(admin=Depends(verify_admin)):
    result = supabase.table("customers").select("*").execute()
    return result.data


@app.get("/")
def health_check():
    return {"status": "ok", "service": "Wedding Tabs Studio API"}
