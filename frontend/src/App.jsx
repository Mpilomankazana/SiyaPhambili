import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import our new navigation icons
import { Home, Database, LayoutDashboard, PlusCircle, Users, LogOut, LogIn, ArrowUpRight } from 'lucide-react';

import HomePage from './pages/Home'; // Renamed import to avoid conflict with the Home icon
import Login from './pages/Login';
import Register from './pages/Register';
import Registry from './pages/Registry';
import ProjectDetails from './pages/ProjectDetails';
import NewProject from './pages/NewProject';
import Dashboard from './pages/Dashboard';
import Partners from './pages/Partners';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  // Updated to use your new custom bg-brand-teal color for the half-pill
  const navLinkClass = ({ isActive }) =>
    `relative flex items-center gap-1.5 font-light tracking-wide transition-colors text-sm md:text-base ${
      isActive
        ? 'text-white after:absolute after:-bottom-[17px] after:left-0 after:w-full after:h-1.5 after:bg-brand-teal after:rounded-t-full'
        : 'text-gray-400 hover:text-white'
    }`;

  return (
    <nav className="p-4 border-b border-gray-800 bg-zinc-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        
        {/* Left Spacer */}
        <div className="hidden md:flex md:w-1/3">
           {/* Logo placement */}
        </div>

        {/* Center: Primary Navigation Links */}
        <div className="flex flex-wrap items-center justify-center w-full gap-8 md:w-1/3 md:gap-12">
          <NavLink to="/" className={navLinkClass}>
            <Home className="w-4 h-4" /> Home
          </NavLink>
          
          <NavLink to="/projects" className={navLinkClass}>
            <Database className="w-4 h-4" /> Registry
          </NavLink>
          
          {user?.role === 'innovator' && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </NavLink>
              <NavLink to="/projects/new" className={navLinkClass}>
                <PlusCircle className="w-4 h-4" /> New Project
              </NavLink>
            </>
          )}
          
          {['official', 'super_admin'].includes(user?.role) && (
            <NavLink to="/partners" className={navLinkClass}>
              <Users className="w-4 h-4" /> Partners
            </NavLink>
          )}
        </div>

        {/* Right: Authentication & Growth CTA */}
        <div className="flex items-center justify-center w-full gap-6 mt-4 md:w-1/3 md:justify-end md:mt-0">
          {user ? (
            <button type="button" onClick={handleLogout} className="flex items-center gap-1.5 text-sm font-light tracking-wide text-gray-400 transition-colors md:text-base hover:text-white">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                <LogIn className="w-4 h-4" /> Login
              </NavLink>
              {/* Updated the hover states to use border-brand-teal and bg-brand-teal-hover/20 */}
              <Link 
                to="/register" 
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold tracking-widest text-white uppercase transition-all border border-gray-500 rounded-full hover:border-brand-teal hover:text-brand-teal group"
              >
                Join as an innovator
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />

        <main className="container px-4 mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/projects" element={<Registry />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/partners" element={<Partners />} />
            
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/projects/new" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
            
            <Route path="*" element={<h2 className="mt-12 text-2xl font-bold text-center text-white">404 - Page Not Found</h2>} />
          </Routes>
        </main>
        
        <footer className="px-4 py-8 mt-12 text-sm text-gray-400 border-t border-gray-800 bg-zinc-900">
          <div className="container flex flex-col items-center justify-between gap-4 mx-auto md:flex-row">
            <div className="flex gap-6">
              <Link to="/privacy" className="font-light transition-colors hover:text-white">Privacy notice</Link>
              <Link to="/terms" className="font-light transition-colors hover:text-white">Project terms</Link>
              <Link to="/projects" className="font-light transition-colors hover:text-white">Public registry</Link>
            </div>
            <span className="font-light tracking-wide">SiyaPhambili · Hackathon Prototype</span>
          </div>
        </footer>
      </BrowserRouter>
    </AuthProvider>
  );
}