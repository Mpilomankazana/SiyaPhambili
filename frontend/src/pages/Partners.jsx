import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import apiClient from '../api/client';

const nextStages = {
  Idea: 'Prototype',
  Prototype: 'Pilot',
  Pilot: 'Scale',
  Scale: 'Implemented',
};

export default function Partners() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [requestingProject, setRequestingProject] = useState(null);
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [transitionProject, setTransitionProject] = useState(null);
  const [transitionNotes, setTransitionNotes] = useState('');
  const [transitionStatus, setTransitionStatus] = useState('');

  const canPartner = ['official', 'super_admin'].includes(user?.role);

  useEffect(() => {
    if (authLoading || !canPartner) return undefined;

    let active = true;

    async function loadProjects() {
      setLoading(true);
      setError('');

      try {
        const response = await apiClient.get('/projects');
        const projectsWithHistory = await Promise.all(response.data.data.map(async (project) => {
          try {
            const historyResponse = await apiClient.get(`/projects/${project.id}/stage-history`);
            return { ...project, history: historyResponse.data.data };
          } catch {
            return { ...project, history: [] };
          }
        }));
        if (active) setProjects(projectsWithHistory);
      } catch {
        if (active) setError('Projects could not be loaded. Please try again.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProjects();

    return () => {
      active = false;
    };
  }, [authLoading, canPartner, retryCount]);

  if (authLoading) {
    return <p role="status" className="p-6 text-gray-300">Checking your account…</p>;
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!canPartner) return <Navigate to="/dashboard" replace />;

  async function sendContactRequest(event, projectId) {
    event.preventDefault();
    setRequestStatus('');

    try {
      await apiClient.post(`/projects/${projectId}/contact-requests`, {
        message,
      });
      setRequestStatus('Request sent to the project owner.');
      setMessage('');
      setRequestingProject(null);
    } catch {
      setRequestStatus('Could not send the request. Please try again.');
    }
  }

  async function advanceStage(event, project) {
    event.preventDefault();
    setTransitionStatus('');
    const newStage = nextStages[project.current_stage];
    if (!newStage) return;

    try {
      await apiClient.put(`/projects/${project.id}/stage`, {
        new_stage: newStage,
        verification_notes: transitionNotes.trim() || null,
      });
      const historyResponse = await apiClient.get(`/projects/${project.id}/stage-history`);
      setProjects((items) => items.map((item) => item.id === project.id
        ? { ...item, current_stage: newStage, history: historyResponse.data.data }
        : item));
      setTransitionStatus(`${project.title} advanced to ${newStage}.`);
      setTransitionProject(null);
      setTransitionNotes('');
    } catch (requestError) {
      setTransitionStatus(requestError.response?.data?.detail || 'Stage could not be advanced. Please try again.');
    }
  }

  return (
    <section className="mx-auto max-w-6xl py-8">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase text-cyan-400">
          Government and sponsor workspace
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">Find projects to support</h1>
        <p className="mt-2 max-w-2xl text-gray-300">
          Explore public innovation projects and request an introduction to a team.
        </p>
      </header>

      {requestStatus && (
        <p role="status" className="mb-4 text-sm text-cyan-300">
          {requestStatus}
        </p>
      )}
      {transitionStatus && (
        <p role="status" className="mb-4 text-sm text-cyan-300">{transitionStatus}</p>
      )}

      {loading && <p role="status" className="py-8 text-gray-300">Loading projects…</p>}

      {error && (
        <div role="alert" className="rounded-md border border-red-800 p-4 text-red-300">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="mt-3 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="py-8 text-gray-300">No public projects are listed yet.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-md border border-gray-700 bg-zinc-900 p-5"
            >
              <p className="text-sm text-cyan-400">{project.current_stage}</p>
              <h2 className="mt-2 text-xl font-semibold text-white">{project.title}</h2>
              <p className="mt-3 text-sm text-gray-300">
                License: {project.license_type}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                {project.contact_required
                  ? 'Introduction requested through the platform'
                  : 'Contact the team through the platform'}
              </p>

              <Link
                to={`/projects/${project.id}`}
                className="mt-4 font-semibold text-cyan-400 hover:underline"
              >
                View project
              </Link>

              <div className="mt-4 border-t border-gray-800 pt-4">
                <h3 className="font-medium text-white">Stage review</h3>
                {project.history?.length ? (
                  <ol className="mt-2 space-y-2 text-sm text-gray-300">
                    {project.history.map((entry) => (
                      <li key={entry.id}>
                        {entry.previous_stage} → {entry.new_stage}
                        {entry.verification_notes && <span className="block text-gray-400">{entry.verification_notes}</span>}
                      </li>
                    ))}
                  </ol>
                ) : <p className="mt-2 text-sm text-gray-400">No stage changes recorded.</p>}

                {nextStages[project.current_stage] && (
                  transitionProject === project.id ? (
                    <form onSubmit={(event) => advanceStage(event, project)} className="mt-3 space-y-3">
                      <label className="block text-sm text-gray-300">
                        Verification notes <span className="text-gray-500">(optional)</span>
                        <textarea value={transitionNotes} onChange={(event) => setTransitionNotes(event.target.value)} maxLength={2000} rows={3} className="mt-1 w-full rounded-md border border-gray-700 bg-zinc-800 p-3 text-white" />
                      </label>
                      <div className="flex gap-3">
                        <button type="submit" className="rounded-md bg-cyan-700 px-4 py-2 font-semibold text-white hover:bg-cyan-600">Confirm {nextStages[project.current_stage]}</button>
                        <button type="button" onClick={() => setTransitionProject(null)} className="px-3 py-2 text-gray-300 hover:text-white">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <button type="button" onClick={() => { setTransitionStatus(''); setTransitionProject(project.id); }} className="mt-3 rounded-md border border-cyan-700 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-950">
                      Advance to {nextStages[project.current_stage]}
                    </button>
                  )
                )}
              </div>

              {requestingProject === project.id ? (
                <form
                  onSubmit={(event) => sendContactRequest(event, project.id)}
                  className="mt-4 space-y-3"
                >
                  <label className="block text-sm text-gray-300">
                    Message to the project team
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      maxLength={4000}
                      required
                      className="mt-1 min-h-24 w-full rounded-md border border-gray-700 bg-zinc-800 p-3 text-white"
                    />
                  </label>
                  <button
                    type="submit"
                    className="rounded-md bg-cyan-700 px-4 py-2 font-semibold text-white hover:bg-cyan-600"
                  >
                    Send request
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setRequestStatus('');
                    setRequestingProject(project.id);
                  }}
                  className="mt-4 self-start rounded-md bg-cyan-700 px-4 py-2 font-semibold text-white hover:bg-cyan-600"
                >
                  Request introduction
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}