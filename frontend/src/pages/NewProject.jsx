import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import apiClient from '../api/client';

export default function NewProject() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sectors, setSectors] = useState([]);
  const [title, setTitle] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [licenseType, setLicenseType] = useState('Other');
  const [licenseNote, setLicenseNote] = useState('');
  const [contactRequired, setContactRequired] = useState(false);
  const [visibility, setVisibility] = useState('public');
  const [loadingSectors, setLoadingSectors] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadSectors() {
      try {
        const response = await apiClient.get('/projects/sectors');
        if (active) setSectors(response.data.data);
      } catch {
        if (active) setError('Could not load project sectors. Please try again later.');
      } finally {
        if (active) setLoadingSectors(false);
      }
    }

    loadSectors();
    return () => {
      active = false;
    };
  }, []);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'innovator') return <Navigate to="/partners" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await apiClient.post('/projects', {
        title: title.trim(),
        sector_id: Number(sectorId),
        problem_statement: problemStatement.trim(),
        license_type: licenseType,
        license_note: licenseType === 'Other' ? licenseNote.trim() || null : null,
        contact_required: contactRequired,
        visibility,
      });
      navigate(`/projects/${response.data.project_id}`);
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Project could not be submitted. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl py-8">
      <Link to="/dashboard" className="text-sm font-medium text-cyan-400 hover:underline">
        Back to workspace
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-white">Submit a project</h1>
      <p className="mt-2 text-gray-300">Start with the information partners need to understand your solution.</p>

      {error && (
        <p role="alert" className="mt-5 rounded-md border border-red-800 p-3 text-red-300">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 rounded-md border border-gray-700 bg-zinc-900 p-5 sm:p-7">
        <label className="block text-sm font-medium text-gray-300">
          Project title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={255}
            required
            className="mt-1 w-full rounded-md border border-gray-700 bg-zinc-800 px-3 py-2 text-white"
          />
        </label>

        <label className="block text-sm font-medium text-gray-300">
          Sector
          <select
            value={sectorId}
            onChange={(event) => setSectorId(event.target.value)}
            required
            disabled={loadingSectors || sectors.length === 0}
            className="mt-1 w-full rounded-md border border-gray-700 bg-zinc-800 px-3 py-2 text-white disabled:opacity-60"
          >
            <option value="">{loadingSectors ? 'Loading sectors…' : 'Choose a sector'}</option>
            {sectors.map((sector) => (
              <option key={sector.id} value={sector.id}>{sector.name}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-gray-300">
          Problem statement
          <textarea
            value={problemStatement}
            onChange={(event) => setProblemStatement(event.target.value)}
            required
            rows={5}
            className="mt-1 w-full rounded-md border border-gray-700 bg-zinc-800 px-3 py-2 text-white"
          />
        </label>

        <label className="block text-sm font-medium text-gray-300">
          License
          <select
            value={licenseType}
            onChange={(event) => setLicenseType(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-700 bg-zinc-800 px-3 py-2 text-white"
          >
            <option>Other</option>
            <option>MIT</option>
            <option>All Rights Reserved</option>
          </select>
        </label>

        {licenseType === 'Other' && (
          <label className="block text-sm font-medium text-gray-300">
            License note <span className="font-normal text-gray-400">(optional)</span>
            <textarea
              value={licenseNote}
              onChange={(event) => setLicenseNote(event.target.value)}
              rows={2}
              className="mt-1 w-full rounded-md border border-gray-700 bg-zinc-800 px-3 py-2 text-white"
            />
          </label>
        )}

        <label className="flex items-start gap-3 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={contactRequired}
            onChange={(event) => setContactRequired(event.target.checked)}
            className="mt-1"
          />
          <span>Require an introduction request before partners contact the team.</span>
        </label>

        <label className="block text-sm font-medium text-gray-300">
          Visibility
          <select
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-700 bg-zinc-800 px-3 py-2 text-white"
          >
            <option value="public">Public registry</option>
            <option value="restricted">Restricted</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={submitting || loadingSectors || sectors.length === 0}
          className="rounded-md bg-cyan-700 px-5 py-3 font-semibold text-white hover:bg-cyan-600 disabled:opacity-60"
        >
          {submitting ? 'Submitting…' : 'Submit project'}
        </button>
      </form>
    </section>
  );
}