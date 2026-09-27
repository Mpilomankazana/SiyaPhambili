import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'official' || user.role === 'super_admin') {
    return <Navigate to="/partners" replace />;
  }

  return (
    <section className="mx-auto max-w-5xl py-8">
      <p className="text-sm font-semibold uppercase text-cyan-400">Innovator workspace</p>
      <h1 className="mt-2 text-3xl font-bold text-white">Welcome, {user.name}</h1>
      <p className="mt-2 text-gray-300">Manage your account and continue building your project story.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-md border border-gray-700 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-white">Submit an innovation</h2>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            Add your solution to the registry so potential partners can discover it.
          </p>
          <Link to="/projects/new" className="mt-5 inline-block font-semibold text-cyan-400 hover:underline">
            Create a project
          </Link>
        </article>

        <article className="rounded-md border border-gray-700 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold text-white">Explore the registry</h2>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            See public projects and the stages they have reached.
          </p>
          <Link to="/projects" className="mt-5 inline-block font-semibold text-cyan-400 hover:underline">
            Browse projects
          </Link>
        </article>
      </div>

      <div className="mt-8 border-t border-gray-800 pt-6">
        <h2 className="text-lg font-semibold text-white">Account</h2>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-gray-400">Name</dt>
            <dd className="mt-1 text-white">{user.name}</dd>
          </div>
          <div>
            <dt className="text-gray-400">Email</dt>
            <dd className="mt-1 text-white">{user.email}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}