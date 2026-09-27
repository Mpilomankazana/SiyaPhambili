import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import apiClient from '../api/client';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      try {
        const response = await apiClient.get('/projects/mine');
        const projectsWithRequests = await Promise.all(response.data.data.map(async (project) => {
          try {
            const requestsResponse = await apiClient.get(`/projects/${project.id}/contact-requests`);
            return { ...project, requests: requestsResponse.data.data };
          } catch {
            return { ...project, requests: [] };
          }
        }));
        if (active) setProjects(projectsWithRequests);
      } catch {
        if (active) setError('Your projects could not be loaded. Please try again.');
      } finally {
        if (active) setLoading(false);
      }
    }

    if (user?.role === 'innovator') loadProjects();

    return () => {
      active = false;
    };
  }, [user]);

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

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">Your projects</h2>
            <p className="mt-1 text-sm text-gray-400">Track stage progress and partner enquiries.</p>
          </div>
          <Link to="/projects/new" className="font-semibold text-cyan-400 hover:underline">Submit a project</Link>
        </div>

        {loading && <p role="status" className="py-6 text-gray-300">Loading your projects…</p>}
        {error && <p role="alert" className="mt-4 rounded-md border border-red-800 p-4 text-red-300">{error}</p>}
        {!loading && !error && projects.length === 0 && (
          <p className="mt-4 rounded-md border border-gray-700 bg-zinc-900 p-5 text-gray-300">
            You have not submitted a project yet. <Link to="/projects/new" className="font-semibold text-cyan-400 hover:underline">Create your first project</Link>.
          </p>
        )}

        <div className="mt-4 grid gap-4">
          {projects.map((project) => (
            <article key={project.id} className="rounded-md border border-gray-700 bg-zinc-900 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">Current stage: {project.current_stage}</p>
                </div>
                <Link to={`/projects/${project.id}`} className="font-semibold text-cyan-400 hover:underline">View project</Link>
              </div>
              <div className="mt-4 border-t border-gray-800 pt-4">
                <h4 className="font-medium text-white">Partner enquiries ({project.requests.length})</h4>
                {project.requests.length === 0 ? (
                  <p className="mt-2 text-sm text-gray-400">No introduction requests yet.</p>
                ) : (
                  <ul className="mt-3 space-y-3">
                    {project.requests.map((request) => (
                      <li key={request.id} className="rounded-md bg-zinc-800 p-3 text-sm">
                        <p className="font-medium text-gray-100">{request.requester_name || 'Platform partner'}{request.requester_email ? ` · ${request.requester_email}` : ''}</p>
                        <p className="mt-1 text-gray-300">{request.message}</p>
                        <p className="mt-1 text-xs text-gray-500">{new Date(request.created_at).toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

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