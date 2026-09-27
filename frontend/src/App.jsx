import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import the new guard

import Home from './pages/Home';
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

  return (
    <nav className="border-b border-gray-800 bg-zinc-900 p-4">
      <div className="container mx-auto flex flex-wrap items-center gap-6">
        <Link to="/" className="font-medium text-white transition-colors hover:text-gray-300">Home</Link>
        <Link to="/projects" className="font-medium text-white transition-colors hover:text-gray-300">Registry</Link>
        {user?.role === 'innovator' && (
          <>
            <Link to="/dashboard" className="font-medium text-white transition-colors hover:text-gray-300">Dashboard</Link>
            <Link to="/projects/new" className="font-medium text-white transition-colors hover:text-gray-300">New Project</Link>
          </>
        )}
        {['official', 'super_admin'].includes(user?.role) && (
          <Link to="/partners" className="font-medium text-white transition-colors hover:text-gray-300">Partners</Link>
        )}
        {user ? (
          <button type="button" onClick={handleLogout} className="font-medium text-gray-300 hover:text-white">Sign out</button>
        ) : (
          <>
            <Link to="/login" className="font-medium text-white transition-colors hover:text-gray-300">Login</Link>
            <Link to="/register" className="font-medium text-white transition-colors hover:text-gray-300">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />

        {/* Main Content Container */}
        <main className="container px-4 mx-auto">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/projects" element={<Registry />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/partners" element={<Partners />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/projects/new" 
              element={
                <ProtectedRoute>
                  <NewProject />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<h2 className="text-2xl font-bold text-white">404 - Page Not Found</h2>} />
          </Routes>
        </main>
        <footer className="mt-12 border-t border-gray-800 bg-zinc-900 px-4 py-6 text-sm text-gray-400">
          <div className="container mx-auto flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-white">Privacy notice</Link>
            <Link to="/terms" className="hover:text-white">Project terms</Link>
            <Link to="/projects" className="hover:text-white">Public registry</Link>
            <span>SiyaPhambili · Hackathon prototype</span>
          </div>
        </footer>
      </BrowserRouter>
    </AuthProvider>
  );
}