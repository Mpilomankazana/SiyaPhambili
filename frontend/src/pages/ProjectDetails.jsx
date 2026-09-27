import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../api/projects';
import apiClient from '../api/client';
import { User, Mail, MessageSquare, ArrowLeft } from 'lucide-react';

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
        <Link to="/projects" className="mt-4 inline-block text-brand-teal hover:underline">
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
    <div className="max-w-4xl mx-auto mt-8 mb-16">
      <Link to="/projects" className="inline-flex items-center gap-2 mb-6 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Registry
      </Link>
      
      <div className="p-8 border shadow-lg bg-zinc-900 border-gray-800 rounded-xl">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-white leading-tight">{project.title}</h1>
          <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-teal bg-brand-teal/10 border border-brand-teal/20 rounded-full whitespace-nowrap">
            {project.current_stage}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-10 text-sm font-medium text-gray-400 bg-zinc-950 p-4 rounded-lg border border-gray-800">
          <p>Sector: <span className="text-gray-200">{sectorName}</span></p>
          <p className="hidden sm:block">&bull;</p>
          <p>Visibility: <span className="text-gray-200">{project.visibility || 'Public'}</span></p>
          <p className="hidden sm:block">&bull;</p>
          <p>License: <span className="text-gray-200">{project.license_type}</span></p>
        </div>

        <section aria-label="Project stage progress" className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-white">Stage progress</h2>
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {stages.map((stage, index) => (
              <li key={stage} className={`rounded-lg border p-3 text-sm font-medium transition-colors ${
                index <= currentStageIndex
                  ? 'border-brand-teal bg-brand-teal/10 text-brand-teal'
                  : 'border-gray-800 text-gray-500 bg-zinc-950/50'
              }`}>
                <span className="mr-2 inline-block" aria-hidden="true">
                  {index < currentStageIndex ? '✓' : index === currentStageIndex ? '●' : '○'}
                </span>
                {stage}
              </li>
            ))}
          </ol>
        </section>

        <div className="space-y-10">
          {project.description && (
            <section>
              <h2 className="mb-4 border-b border-gray-800 pb-2 text-xl font-bold text-white">Overview</h2>
              <p className="leading-relaxed text-gray-300">{project.description}</p>
            </section>
          )}
          {project.problem_statement ? (
            <section>
              <h2 className="mb-4 border-b border-gray-800 pb-2 text-xl font-bold text-white">Problem statement</h2>
              <p className="leading-relaxed text-gray-300">{project.problem_statement}</p>
            </section>
          ) : (
            <p className="text-sm text-gray-500 italic p-4 bg-zinc-950 rounded-lg border border-gray-800">
              Detailed problem statements are securely shared only with the innovator and authorized reviewers.
            </p>
          )}
          {project.solution && (
            <section>
              <h2 className="mb-4 border-b border-gray-800 pb-2 text-xl font-bold text-white">Proposed solution</h2>
              <p className="leading-relaxed text-gray-300">{project.solution}</p>
            </section>
          )}

          <p className="text-xs leading-6 text-gray-500 bg-zinc-950 p-4 rounded-lg border border-gray-800">
            <strong>Note:</strong> Registry attribution and timestamps do not establish legal ownership or exclusivity. Avoid relying on this prototype to protect sensitive intellectual property.
          </p>

          <section>
            <h2 className="mb-4 border-b border-gray-800 pb-2 text-xl font-bold text-white">Stage history</h2>
            {history.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No stage transitions have been recorded yet.</p>
            ) : (
              <ol className="space-y-4">
                {history.map((entry) => (
                  <li key={entry.id} className="border-l-2 border-brand-teal pl-4 text-sm bg-zinc-950 p-4 rounded-r-lg border-y border-r border-gray-800">
                    <p className="font-bold text-white text-base">{entry.previous_stage} &rarr; {entry.new_stage}</p>
                    <p className="mt-1 text-xs text-brand-teal uppercase tracking-wider">{new Date(entry.transitioned_at).toLocaleString()}</p>
                    {entry.verification_notes && <p className="mt-3 text-gray-300 leading-relaxed border-t border-gray-800 pt-3">{entry.verification_notes}</p>}
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Contact the project team</h2>
            {project.contact_required && (
              <p className="mt-2 text-sm text-gray-400">The innovator asks that introductions be made through SiyaPhambili.</p>
            )}
          </div>
          
          {contactStatus && <p role="status" className="mb-6 p-4 rounded-lg bg-brand-teal/10 border border-brand-teal text-sm text-brand-teal">{contactStatus}</p>}
          
          <form onSubmit={handleContactSubmit} className="grid gap-5 sm:grid-cols-2 bg-zinc-950 p-6 rounded-xl border border-gray-800">
            <label className="text-sm font-medium text-gray-300">
              Your name
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input value={contactName} onChange={(event) => setContactName(event.target.value)} required maxLength={255} className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-700 bg-zinc-900 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal focus:outline-none transition-shadow" placeholder="Jane Doe" />
              </div>
            </label>
            
            <label className="text-sm font-medium text-gray-300">
              Your email
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} required className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-700 bg-zinc-900 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal focus:outline-none transition-shadow" placeholder="name@example.com" />
              </div>
            </label>
            
            <label className="text-sm font-medium text-gray-300 sm:col-span-2">
              Message
              <div className="relative mt-2">
                <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-gray-500" />
                <textarea value={contactMessage} onChange={(event) => setContactMessage(event.target.value)} required maxLength={4000} rows={4} className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-700 bg-zinc-900 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal focus:outline-none transition-shadow" placeholder="How can you support this project?" />
              </div>
            </label>
            
            <p className="text-xs leading-5 text-gray-500 sm:col-span-2 p-3 bg-zinc-900 rounded-lg border border-gray-800">
              Your name, email, and message will be shared with this project’s owner to respond to your request. SiyaPhambili does not publish your email in the public registry.
            </p>
            
            <label className="flex items-start gap-3 text-sm text-gray-300 sm:col-span-2 pt-2">
              <input type="checkbox" checked={contactConsent} onChange={(event) => setContactConsent(event.target.checked)} required className="mt-1 accent-brand-teal" />
              <span>I consent to sharing these contact details and this message with the project owner.</span>
            </label>
            
            <button type="submit" disabled={submittingContact} className="mt-2 sm:col-span-1 justify-self-start rounded-lg bg-brand-teal px-6 py-3 font-semibold text-white hover:bg-brand-teal-hover transition-colors disabled:opacity-60">
              {submittingContact ? 'Sending…' : 'Request introduction'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}