function Layout({ children }) {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')
  const hideFloatingButtons = isAdmin || pathname === '/get-quote'

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <TopHeader />}
      <main className={`flex-1 ${!isAdmin ? 'pb-16 lg:pb-0' : ''}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!hideFloatingButtons && <WhatsAppButton />}
      {!hideFloatingButtons && <GetQuoteButton />}
      {!hideFloatingButtons && <CallButton />}
      {!isAdmin && <MobileBottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/track-booking" element={<TrackBooking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

