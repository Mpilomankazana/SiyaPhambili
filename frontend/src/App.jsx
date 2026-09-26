import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Registry from './pages/Registry';
import ProjectDetails from './pages/ProjectDetails';
import NewProject from './pages/NewProject';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Tailwind Styled Navigation */}
        <nav className="bg-zinc-900 border-b border-gray-800 p-4 mb-8">
          <div className="container mx-auto flex gap-6">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors font-medium">Home</Link>
            <Link to="/projects" className="text-white hover:text-gray-300 transition-colors font-medium">Registry</Link>
            <Link to="/login" className="text-white hover:text-gray-300 transition-colors font-medium">Login</Link>
            <Link to="/register" className="text-white hover:text-gray-300 transition-colors font-medium">Register</Link>
            <Link to="/dashboard" className="text-white hover:text-gray-300 transition-colors font-medium">Dashboard</Link>
            <Link to="/projects/new" className="text-white hover:text-gray-300 transition-colors font-medium">New Project</Link>
          </div>
        </nav>

        {/* Main Content Container */}
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<Registry />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="*" element={<h2 className="text-2xl font-bold text-white">404 - Page Not Found</h2>} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}