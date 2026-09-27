import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import apiClient from '../api/client';
import { FolderGit2, Search, PlusCircle, MessageSquare, UserCircle, Mail } from 'lucide-react';

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
    <section className="mx-auto max-w-5xl py-8 mb-12">
      <p className="text-sm font-semibold uppercase text-brand-teal">Innovator workspace</p>
      <h1 className="mt-2 text-3xl font-bold text-white">Welcome, {user.name}</h1>
      <p className="mt-2 text-gray-300">Manage your account and continue building your project story.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-gray-800 bg-zinc-900 p-6 shadow-md">
          <div className="flex items-center gap-3">
            <PlusCircle className="w-6 h-6 text-brand-teal" />
            <h2 className="text-xl font-semibold text-white">Submit an innovation</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-400">
            Add your solution to the registry so potential partners can discover it.
          </p>
          <Link to="/projects/new" className="mt-5 inline-block text-sm font-semibold text-brand-teal hover:underline">
            Create a project &rarr;
          </Link>
        </article>

        <article className="rounded-xl border border-gray-800 bg-zinc-900 p-6 shadow-md">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-brand-teal" />
            <h2 className="text-xl font-semibold text-white">Explore the registry</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-400">
            See public projects and the stages they have reached.
          </p>
          <Link to="/projects" className="mt-5 inline-block text-sm font-semibold text-brand-teal hover:underline">
            Browse projects &rarr;
          </Link>
        </article>
      </div>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6 border-b border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <FolderGit2 className="w-7 h-7 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">Your projects</h2>
              <p className="mt-1 text-sm text-gray-400">Track stage progress and partner enquiries.</p>
            </div>
          </div>
          <Link to="/projects/new" className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold text-brand-teal hover:bg-zinc-700 transition-colors">Submit a project</Link>
        </div>

        {loading && <p role="status" className="py-6 text-gray-400">Loading your projects…</p>}
        {error && <p role="alert" className="mt-4 rounded-md border border-red-800 p-4 text-red-300">{error}</p>}
        
        {!loading && !error && projects.length === 0 && (
          <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-gray-800 border-dashed bg-zinc-900/50 p-12 text-center">
            <FolderGit2 className="w-12 h-12 text-gray-600 mb-4" />
            <p className="text-gray-300">You have not submitted a project yet.</p>
            <Link to="/projects/new" className="mt-4 text-sm font-semibold text-brand-teal hover:underline">Create your first project</Link>
          </div>
        )}

        <div className="mt-4 grid gap-6">
          {projects.map((project) => (
            <article key={project.id} className="rounded-xl border border-gray-800 bg-zinc-900 p-6 shadow-md">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="mt-2 inline-flex px-3 py-1 text-xs font-semibold text-brand-teal bg-brand-teal/10 rounded-full">Current stage: {project.current_stage}</p>
                </div>
                <Link to={`/projects/${project.id}`} className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">View project details</Link>
              </div>
              <div className="mt-6 border-t border-gray-800 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <h4 className="font-medium text-white">Partner enquiries ({project.requests.length})</h4>
                </div>
                
                {project.requests.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No introduction requests yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {project.requests.map((request) => (
                      <li key={request.id} className="rounded-lg border border-gray-800 bg-zinc-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <UserCircle className="w-4 h-4 text-brand-teal" />
                          <p className="font-medium text-gray-200">{request.requester_name || 'Platform partner'}</p>
                        </div>
                        {request.requester_email && (
                          <div className="flex items-center gap-2 mb-3">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <a href={`mailto:${request.requester_email}`} className="text-sm text-brand-teal hover:underline">{request.requester_email}</a>
                          </div>
                        )}
                        <p className="mt-2 text-sm leading-relaxed text-gray-300 bg-zinc-900 p-3 rounded-md border border-gray-800">{request.message}</p>
                        <p className="mt-3 text-xs text-gray-500 text-right">{new Date(request.created_at).toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-12 border-t border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-white mb-6">Account Details</h2>
        <dl className="grid gap-6 sm:grid-cols-2">
          <div className="p-4 rounded-lg bg-zinc-900 border border-gray-800">
            <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Name</dt>
            <dd className="mt-1 text-lg font-medium text-white">{user.name}</dd>
          </div>
          <div className="p-4 rounded-lg bg-zinc-900 border border-gray-800">
            <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Email</dt>
            <dd className="mt-1 text-lg font-medium text-white">{user.email}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}