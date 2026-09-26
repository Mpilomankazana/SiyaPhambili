import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        consent_accepted: consentAccepted,
      });
      navigate('/dashboard');
    } catch {
      setError('Registration failed. Check your details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-16 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-900 border border-gray-800 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white">
          Create your account
        </h1>

        {error && (
          <p role="alert" className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-900 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full p-3 text-white bg-mist-900 border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full p-3 text-white bg-mist-900 border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full p-3 text-white bg-mist-900 border border-gray-700 rounded-lg"
              minLength={8}
              required
            />
            <p className="mt-1 text-sm text-gray-400">At least 8 characters.</p>
          </div>

          <label className="flex items-start gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={consentAccepted}
              onChange={(event) => setConsentAccepted(event.target.checked)}
              required
              className="mt-1"
            />
            <span>
              I consent to using my registration information to create and manage my account.
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400">
          Already registered?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}