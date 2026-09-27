import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);

      if (user.role === 'innovator') {
        navigate('/dashboard');
      } else if (user.role === 'official' || user.role === 'super_admin') {
        navigate('/partners');
      } else {
        setError('This account does not have access to a workspace.');
      }
    } catch {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center mt-16 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-900 border border-gray-800 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>
        
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-900 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-3 text-white bg-mist-900 border border-gray-700 rounded-lg focus:border-brand-teal focus:ring-1 focus:ring-brand-teal focus:outline-none transition-shadow"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-3 text-white bg-mist-900 border border-gray-700 rounded-lg focus:border-brand-teal focus:ring-1 focus:ring-brand-teal focus:outline-none transition-shadow"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 mt-6 font-semibold text-white transition-colors bg-brand-teal rounded-lg hover:bg-brand-teal-hover"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-400">
          Don't have an account? <Link to="/register" className="text-brand-teal hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}