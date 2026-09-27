import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';
import { Search, Filter, LayoutGrid } from 'lucide-react';

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
      } catch (requestError) {
        if (active) {
          const status = requestError.response?.status;
          setError(status
            ? `Could not load the registry (API ${status}). Check the service logs and try again.`
            : 'Could not reach the API. Check that the services are running and try again.');
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
    const matchesSearch = `${project.title} ${project.description ?? ''}`
      .toLowerCase()
      .includes(normalizedSearch);
    const matchesSector = !sectorId || String(project.sector_id) === sectorId;
    const matchesStage = !stage || project.current_stage === stage;

    return matchesSearch && matchesSector && matchesStage;
  });

  return (
    <section className="mx-auto max-w-6xl py-8">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase text-brand-teal">
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
          <span className="mb-2 block text-sm font-medium text-gray-300">Search projects</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by project title"
              className="w-full rounded-lg border border-gray-700 bg-zinc-900 pl-9 pr-3 py-2.5 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal focus:outline-none transition-shadow"
            />
          </div>
        </label>

        <label>
          <span className="mb-2 block text-sm font-medium text-gray-300">Sector</span>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select
              value={sectorId}
              onChange={(event) => setSectorId(event.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-zinc-900 pl-9 pr-3 py-2.5 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal focus:outline-none transition-shadow appearance-none"
            >
              <option value="">All sectors</option>
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label>
          <span className="mb-2 block text-sm font-medium text-gray-300">Stage</span>
          <div className="relative">
            <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select
              value={stage}
              onChange={(event) => setStage(event.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-zinc-900 pl-9 pr-3 py-2.5 text-white focus:border-brand-teal focus:ring-1 focus:ring-brand-teal focus:outline-none transition-shadow appearance-none"
            >
              <option value="">All stages</option>
              {stages.map((stageName) => (
                <option key={stageName} value={stageName}>
                  {stageName}
                </option>
              ))}
            </select>
          </div>
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
            className="mt-3 font-semibold underline text-red-400 hover:text-red-300"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && filteredProjects.length === 0 && (
        <div className="py-12 text-center text-gray-400 border border-gray-800 border-dashed rounded-xl">
          No projects found matching your criteria.
        </div>
      )}

      {!loading && !error && filteredProjects.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col rounded-xl border border-gray-800 bg-zinc-900 p-6 transition-shadow hover:shadow-lg"
            >
              <p className="text-sm font-medium text-brand-teal">
                {sectorNames[project.sector_id] ?? 'Other sector'}
              </p>
              <h2 className="mt-2 text-xl font-bold text-white line-clamp-2">
                {project.title}
              </h2>
              {project.description && (
                <p className="mt-3 flex-grow text-sm leading-6 text-gray-400 line-clamp-3">{project.description}</p>
              )}
              
              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{project.current_stage}</span>
                  <span className="text-gray-500">{project.license_type}</span>
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="mt-4 inline-block w-full text-center rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold text-brand-teal hover:bg-zinc-700 transition-colors"
                >
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}