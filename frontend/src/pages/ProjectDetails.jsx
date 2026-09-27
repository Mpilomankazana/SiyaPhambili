import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../api/projects';
import apiClient from '../api/client';

const stages = ['Idea', 'Prototype', 'Pilot', 'Scale', 'Implemented'];

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [sectorName, setSectorName] = useState('Other sector');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactConsent, setContactConsent] = useState(false);
  const [contactStatus, setContactStatus] = useState('');
  const [submittingContact, setSubmittingContact] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchProjectDetails = async () => {
      try {
        const [projectResponse, historyResponse, sectorsResponse] = await Promise.all([
          getProject(id),
          apiClient.get(`/projects/${id}/stage-history`),
          apiClient.get('/projects/sectors'),
        ]);
        if (active) {
          const projectData = projectResponse.data;
          setProject(projectData);
          setHistory(historyResponse.data.data);
          const sector = sectorsResponse.data.data.find(
            (item) => item.id === projectData.sector_id
          );
          if (sector) setSectorName(sector.name);
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.response?.status === 404
            ? 'This project is unavailable or is not public.'
            : 'Could not load this project. Check your connection and try again.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchProjectDetails();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <div className="py-12 text-center text-gray-400">Loading project details...</div>;
  if (!project) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-red-300">
        <p role="alert">{error || 'Project not found.'}</p>
        <Link to="/projects" className="mt-4 inline-block text-cyan-400 hover:underline">
          Return to the registry
        </Link>
      </div>
    );
  }

  const currentStageIndex = stages.indexOf(project.current_stage);

  async function handleContactSubmit(event) {
    event.preventDefault();
    setContactStatus('');
    setSubmittingContact(true);
    try {
      await apiClient.post(`/projects/${id}/contact-requests`, {
        requester_name: contactName.trim(),
        requester_email: contactEmail.trim(),
        message: contactMessage.trim(),
        consent_accepted: contactConsent,
      });
      setContactStatus('Your introduction request was sent to the project owner.');
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setContactConsent(false);
    } catch (requestError) {
      setContactStatus(requestError.response?.data?.detail || 'Could not send your request. Please try again.');
    } finally {
      setSubmittingContact(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-12">
      <Link to="/projects" className="inline-block mb-6 text-sm text-blue-400 hover:text-blue-300">
        &larr; Back to Registry
      </Link>
      
      <div className="p-8 border shadow-lg bg-zinc-900 border-gray-800 rounded-xl">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-white">{project.title}</h1>
          <span className="px-4 py-2 text-sm font-semibold text-blue-400 bg-blue-900/30 rounded-full">
            {project.current_stage}
          </span>
        </div>
        
        <div className="flex gap-4 mb-8 text-sm font-medium text-gray-400">
          <p>Sector: <span className="text-gray-200">{sectorName}</span></p>
          <p>&bull;</p>
          <p>Visibility: <span className="text-gray-200">{project.visibility || 'Public'}</span></p>
        </div>

        <section aria-label="Project stage progress" className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-white">Stage progress</h2>
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {stages.map((stage, index) => (
              <li key={stage} className={`rounded-md border p-3 text-sm ${
                index <= currentStageIndex
                  ? 'border-cyan-700 bg-cyan-950/50 text-cyan-200'
                  : 'border-gray-700 text-gray-400'
              }`}>
                <span className="mr-2" aria-hidden="true">{index < currentStageIndex ? '✓' : index === currentStageIndex ? '●' : '○'}</span>
                {stage}
              </li>
            ))}
          </ol>
        </section>

        <div className="space-y-8">
          {project.description && (
            <section>
              <h2 className="mb-3 border-b border-gray-800 pb-2 text-xl font-semibold text-white">Overview</h2>
              <p className="leading-relaxed text-gray-300">{project.description}</p>
            </section>
          )}
          {project.problem_statement ? (
            <section>
              <h2 className="mb-3 border-b border-gray-800 pb-2 text-xl font-semibold text-white">Problem statement</h2>
              <p className="leading-relaxed text-gray-300">{project.problem_statement}</p>
            </section>
          ) : (
            <p className="text-sm text-gray-400">
              Detailed project information is shared with the innovator and authorized reviewers.
            </p>
          )}
          {project.solution && (
            <section>
              <h2 className="mb-3 border-b border-gray-800 pb-2 text-xl font-semibold text-white">Proposed solution</h2>
              <p className="leading-relaxed text-gray-300">{project.solution}</p>
            </section>
          )}

            <p className="text-xs leading-5 text-gray-500">
              Registry attribution and timestamps do not establish legal ownership or exclusivity. Avoid relying on this prototype to protect sensitive intellectual property.
            </p>

          <section>
            <h2 className="mb-3 border-b border-gray-800 pb-2 text-xl font-semibold text-white">Stage history</h2>
            {history.length === 0 ? (
              <p className="text-sm text-gray-400">No stage transitions have been recorded yet.</p>
            ) : (
              <ol className="space-y-3">
                {history.map((entry) => (
                  <li key={entry.id} className="border-l-2 border-cyan-800 pl-4 text-sm">
                    <p className="font-medium text-white">{entry.previous_stage} → {entry.new_stage}</p>
                    <p className="mt-1 text-gray-400">{new Date(entry.transitioned_at).toLocaleString()}</p>
                    {entry.verification_notes && <p className="mt-1 text-gray-300">{entry.verification_notes}</p>}
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-800">
          {project.contact_required && (
            <p className="mb-4 text-sm text-gray-400">The innovator asks that introductions be made through SiyaPhambili.</p>
          )}
          <h2 className="text-xl font-semibold text-white">Contact the project team</h2>
          {contactStatus && <p role="status" className="mt-3 text-sm text-cyan-300">{contactStatus}</p>}
          <form onSubmit={handleContactSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-gray-300">
              Your name
              <input value={contactName} onChange={(event) => setContactName(event.target.value)} required maxLength={255} className="mt-1 w-full rounded-md border border-gray-700 bg-zinc-800 px-3 py-2 text-white" />
            </label>
            <label className="text-sm text-gray-300">
              Your email
              <input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} required className="mt-1 w-full rounded-md border border-gray-700 bg-zinc-800 px-3 py-2 text-white" />
            </label>
            <label className="text-sm text-gray-300 sm:col-span-2">
              Message
              <textarea value={contactMessage} onChange={(event) => setContactMessage(event.target.value)} required maxLength={4000} rows={4} className="mt-1 w-full rounded-md border border-gray-700 bg-zinc-800 px-3 py-2 text-white" />
            </label>
            <p className="text-xs leading-5 text-gray-400 sm:col-span-2">
              Your name, email, and message will be shared with this project’s owner to respond to your request. SiyaPhambili does not publish your email in the public registry.
            </p>
            <label className="flex items-start gap-3 text-sm text-gray-300 sm:col-span-2">
              <input type="checkbox" checked={contactConsent} onChange={(event) => setContactConsent(event.target.checked)} required className="mt-1" />
              <span>I consent to sharing these contact details and this message with the project owner.</span>
            </label>
            <button type="submit" disabled={submittingContact} className="justify-self-start rounded-md bg-cyan-700 px-5 py-3 font-semibold text-white hover:bg-cyan-600 disabled:opacity-60">
              {submittingContact ? 'Sending…' : 'Request an introduction'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}