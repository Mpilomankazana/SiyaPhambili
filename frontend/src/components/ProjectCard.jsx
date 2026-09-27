import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <div className="flex flex-col h-full p-6 transition-shadow border bg-zinc-900 border-gray-800 rounded-xl hover:shadow-lg">
      
      {/* Header: Title and Stage */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="text-xl font-bold text-white line-clamp-2">{project.title}</h3>
        <span className="px-3 py-1 text-xs font-semibold text-blue-400 whitespace-nowrap bg-blue-900/30 rounded-full">
          {project.current_stage}
        </span>
      </div>
      
      {/* Sector */}
      <p className="mb-4 text-sm font-medium text-gray-400">Sector: {project.sector}</p>
      
      {/* Short Description */}
      <p className="flex-grow mb-6 text-gray-300 line-clamp-3">
        {project.description}
      </p>
      
      {/* Action Button */}
      <Link
        to={`/projects/${project.id}`}
        className="inline-block w-full px-4 py-2 text-sm font-medium text-center text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}