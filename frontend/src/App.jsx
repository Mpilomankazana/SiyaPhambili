import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import the new guard

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Registry from './pages/Registry';
import ProjectDetails from './pages/ProjectDetails';
import NewProject from './pages/NewProject';
import Dashboard from './pages/Dashboard';
import Partners from './pages/Partners';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Tailwind Styled Navigation */}
        <nav className="p-4 mb-8 border-b bg-zinc-900 border-gray-800">
          <div className="container flex gap-6 mx-auto">
            <Link to="/" className="font-medium text-white transition-colors hover:text-gray-300">Home</Link>
            <Link to="/projects" className="font-medium text-white transition-colors hover:text-gray-300">Registry</Link>
            <Link to="/login" className="font-medium text-white transition-colors hover:text-gray-300">Login</Link>
            <Link to="/register" className="font-medium text-white transition-colors hover:text-gray-300">Register</Link>
            <Link to="/dashboard" className="font-medium text-white transition-colors hover:text-gray-300">Dashboard</Link>
            <Link to="/projects/new" className="font-medium text-white transition-colors hover:text-gray-300">New Project</Link>
          </div>
        </nav>

        {/* Main Content Container */}
        <main className="container px-4 mx-auto">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<Registry />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
      </BrowserRouter>
    </AuthProvider>
  );
}