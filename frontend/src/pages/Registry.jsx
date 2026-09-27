import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';

const stages = ['Idea', 'Prototype', 'Pilot', 'Scale', 'Implemented'];

export default function Registry() {
  const [projects, setProjects] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [search, setSearch] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [stage, setStage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadRegistry() {
      setLoading(true);
      setError('');

      try {
        const [projectsResponse, sectorsResponse] = await Promise.all([
          apiClient.get('/projects'),
          apiClient.get('/projects/sectors'),
        ]);

        if (active) {
          setProjects(projectsResponse.data.data);
          setSectors(sectorsResponse.data.data);
        }
      } catch {
        if (active) {
          setError('Could not load the registry. Check that the API is running and try again.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadRegistry();

    return () => {
      active = false;
    };
  }, [retryCount]);

  const sectorNames = Object.fromEntries(
    sectors.map((sector) => [sector.id, sector.name])
  );

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(normalizedSearch);
    const matchesSector = !sectorId || String(project.sector_id) === sectorId;
    const matchesStage = !stage || project.current_stage === stage;

    return matchesSearch && matchesSector && matchesStage;
  });

  return (
    <section className="mx-auto max-w-6xl py-8">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase text-cyan-400">
          SiyaPhambili project registry
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">
          Discover South African innovation
        </h1>
        <p className="mt-2 max-w-2xl text-gray-300">
          Explore projects moving from ideas toward real-world impact.
        </p>
      </header>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="sm:col-span-2 lg:col-span-1">
          <span className="mb-1 block text-sm text-gray-300">Search projects</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by project title"
            className="w-full rounded-md border border-gray-700 bg-zinc-900 px-3 py-2 text-white"
          />
        </label>

        <label>
          <span className="mb-1 block text-sm text-gray-300">Sector</span>
          <select
            value={sectorId}
            onChange={(event) => setSectorId(event.target.value)}
            className="w-full rounded-md border border-gray-700 bg-zinc-900 px-3 py-2 text-white"
          >
            <option value="">All sectors</option>
            {sectors.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1 block text-sm text-gray-300">Stage</span>
          <select
            value={stage}
            onChange={(event) => setStage(event.target.value)}
            className="w-full rounded-md border border-gray-700 bg-zinc-900 px-3 py-2 text-white"
          >
            <option value="">All stages</option>
            {stages.map((stageName) => (
              <option key={stageName} value={stageName}>
                {stageName}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading && (
        <p role="status" className="py-8 text-gray-300">
          Loading projects…
        </p>
      )}

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

      {!loading && !error && filteredProjects.length === 0 && (
        <p className="py-8 text-gray-300">
          No projects match those filters.
        </p>
      )}

      {!loading && !error && filteredProjects.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-md border border-gray-700 bg-zinc-900 p-5"
            >
              <p className="text-sm text-cyan-400">
                {sectorNames[project.sector_id] ?? 'Other sector'}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">
                {project.title}
              </h2>
              <p className="mt-3 text-sm text-gray-300">
                Stage: {project.current_stage}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                License: {project.license_type}
              </p>

              <Link
                to={`/projects/${project.id}`}
                className="mt-5 font-semibold text-cyan-400 hover:underline"
              >
                View project
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}