import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../api/projects';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const data = await getProject(id);
        setProject(data);
      } catch {
        setError('Failed to connect to the backend. Displaying demo data.');
        setProject(getMockProjectDetails(id));
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [id]);

  if (loading) return <div className="py-12 text-center text-gray-400">Loading project details...</div>;
  if (!project) return <div className="py-12 text-center text-red-400">Project not found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-12">
      <Link to="/projects" className="inline-block mb-6 text-sm text-blue-400 hover:text-blue-300">
        &larr; Back to Registry
      </Link>
      
      {error && (
        <div className="p-4 mb-6 text-sm text-yellow-400 border border-yellow-900 rounded-lg bg-yellow-900/20">
          {error}
        </div>
      )}

      <div className="p-8 border shadow-lg bg-zinc-900 border-gray-800 rounded-xl">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-white">{project.title}</h1>
          <span className="px-4 py-2 text-sm font-semibold text-blue-400 bg-blue-900/30 rounded-full">
            {project.current_stage}
          </span>
        </div>
        
        <div className="flex gap-4 mb-8 text-sm font-medium text-gray-400">
          <p>Sector: <span className="text-gray-200">{project.sector}</span></p>
          <p>&bull;</p>
          <p>Visibility: <span className="text-gray-200">{project.visibility || 'Public'}</span></p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white border-b border-gray-800 pb-2">Description</h2>
            <p className="leading-relaxed text-gray-300">{project.description}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white border-b border-gray-800 pb-2">Problem Statement</h2>
            <p className="leading-relaxed text-gray-300">{project.problem_statement || "Information not provided yet."}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white border-b border-gray-800 pb-2">Proposed Solution</h2>
            <p className="leading-relaxed text-gray-300">{project.solution || "Information not provided yet."}</p>
          </section>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-800">
          <button className="px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
            Contact Innovator
          </button>
        </div>
      </div>
    </div>
  );
}

function getMockProjectDetails(id) {
  return {
    id: parseInt(id),
    title: "Digiguard SOC",
    sector: "Technology",
    current_stage: "Prototype",
    visibility: "Public",
    description: "A tri-stack AI-powered Security Operations Center utilizing Python, Java WebSockets, and React to monitor network anomalies in real-time.",
    problem_statement: "Cybersecurity infrastructure in public institutions is reactive rather than proactive. Currently, most municipal networks lack real-time anomaly detection, leading to extended downtime when breaches occur.",
    solution: "Digiguard acts as an intelligent shield, leveraging machine learning models to detect unusual traffic patterns and automatically isolate affected nodes before lateral movement can happen."
  };
}