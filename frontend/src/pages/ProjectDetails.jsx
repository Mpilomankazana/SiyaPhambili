import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiClient from '../api/client';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProject() {
      setLoading(true);
      setError('');

      try {
        const response = await apiClient.get(`/projects/${id}`);
        if (active) setProject(response.data.data);
      } catch (requestError) {
        if (active) {
          setError(requestError.response?.status === 404
            ? 'This project could not be found or is not available to you.'
            : 'Project details could not be loaded. Please try again.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProject();
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <section className="mx-auto max-w-4xl py-8">
      <Link to="/projects" className="text-sm font-medium text-cyan-400 hover:underline">
        Back to registry
      </Link>

      {loading && <p role="status" className="py-10 text-gray-300">Loading project…</p>}

      {!loading && error && (
        <p role="alert" className="mt-6 rounded-md border border-red-800 p-4 text-red-300">{error}</p>
      )}

      {!loading && project && (
        <article className="mt-5">
          <p className="text-sm font-semibold uppercase text-cyan-400">{project.current_stage}</p>
          <h1 className="mt-2 text-3xl font-bold text-white">{project.title}</h1>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
            <p>Sector ID: {project.sector_id}</p>
            <p>License: {project.license_type}</p>
            <p>Contact required: {project.contact_required ? 'Yes' : 'No'}</p>
          </div>

          {project.problem_statement && (
            <section className="mt-8 border-t border-gray-800 pt-6">
              <h2 className="text-lg font-semibold text-white">The problem</h2>
              <p className="mt-3 whitespace-pre-wrap leading-7 text-gray-300">
                {project.problem_statement}
              </p>
            </section>
          )}

          {project.license_note && (
            <section className="mt-6">
              <h2 className="text-lg font-semibold text-white">License note</h2>
              <p className="mt-2 whitespace-pre-wrap text-gray-300">{project.license_note}</p>
            </section>
          )}

          <p className="mt-8 text-sm text-gray-400">
            Added {new Date(project.created_at).toLocaleDateString()}
          </p>
        </article>
      )}
    </section>
  );
}