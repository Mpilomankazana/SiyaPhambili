import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // Show a dark-themed loading state while AuthContext checks local storage
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-xl font-medium text-gray-400">Loading...</div>
      </div>
    );
  }

  // If no user is authenticated, intercept and redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a user exists, render the protected component
  return children;
}