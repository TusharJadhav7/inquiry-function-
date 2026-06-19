import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { SidebarProvider } from './components/Sidebar'
import Sidebar, { useSidebar } from './components/Sidebar'
import Footer from './components/Footer'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Profile from './pages/Profile'
import Registration from './pages/Registration'
import Search from './pages/Search'
import Catalog from './pages/Catalog'
import Fees from './pages/Fees'
import About from './pages/About'
import Inquiry from './pages/Inquiry'
import InquirySearch from './pages/InquirySearch'



// Pages that should show the sidebar
const SIDEBAR_PAGES = ['/home', '/profile', '/registration', '/search', '/catalog', '/fees', '/about', '/inquiry', '/inquiry-search']

function AppLayout() {
  const location = useLocation()
  const { isOpen } = useSidebar()
  const showSidebar = SIDEBAR_PAGES.includes(location.pathname)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar rendered ONCE at app level — never unmounts on navigation */}
      {showSidebar && <Sidebar />}

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/search" element={<Search />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/about" element={<About />} />
            <Route path = "/inquiry-search" element ={<InquirySearch/>}/>
            <Route path="/inquiry" element={<Inquiry />} />

          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <SidebarProvider>
        <AppLayout />
      </SidebarProvider>
    </Router>
  )
}

export default App
