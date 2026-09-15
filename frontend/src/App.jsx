// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
// import TopHeader from './components/TopHeader'
// import Footer from './components/Footer'
// import WhatsAppButton from './components/WhatsAppButton'
// import GetQuoteButton from './components/GetQuoteButton'
// import MobileBottomNav from './components/MobileBottomNav'
// import ProtectedRoute from './components/ProtectedRoute'

// import Home from './pages/Home'
// import Portfolio from './pages/Portfolio'
// import Services from './pages/Services'
// import GetQuote from './pages/GetQuote'
// import TrackBooking from './pages/TrackBooking'
// import About from './pages/About'
// import Contact from './pages/Contact'
// import AdminLogin from './pages/AdminLogin'
// import AdminDashboard from './pages/AdminDashboard'

// function Layout({ children }) {
//   const { pathname } = useLocation()
//   const isAdmin = pathname.startsWith('/admin')

//   return (
//     <div className="min-h-screen flex flex-col">
//       {!isAdmin && <TopHeader />}
//       <main className={`flex-1 ${!isAdmin ? 'pb-16 lg:pb-0' : ''}`}>{children}</main>
//       {!isAdmin && <Footer />}
//       {!isAdmin && <WhatsAppButton />}
//       {!isAdmin && <GetQuoteButton />}
//       {!isAdmin && <MobileBottomNav />}
//     </div>
//   )
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/portfolio" element={<Portfolio />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/get-quote" element={<GetQuote />} />
//           <Route path="/track-booking" element={<TrackBooking />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />

//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route
//             path="/admin/dashboard"
//             element={
//               <ProtectedRoute>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   )
// }

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import TopHeader from './components/TopHeader'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import GetQuoteButton from './components/GetQuoteButton'
import CallButton from './components/CallButton'
import MobileBottomNav from './components/MobileBottomNav'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Services from './pages/Services'
import GetQuote from './pages/GetQuote'
import TrackBooking from './pages/TrackBooking'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function Layout({ children }) {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <TopHeader />}
      <main className={`flex-1 ${!isAdmin ? 'pb-16 lg:pb-0' : ''}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
      {!isAdmin && <GetQuoteButton />}
      {!isAdmin && <CallButton />}
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