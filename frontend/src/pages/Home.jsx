import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="mx-auto max-w-6xl py-10 sm:py-16">
      <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-cyan-400">
            SiyaPhambili · We move forward
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            South African innovation, moving from idea to impact.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            Discover civic and community projects, follow their progress, and
            connect innovators with people who can help them grow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="rounded-md bg-cyan-700 px-5 py-3 font-semibold text-white hover:bg-cyan-600"
            >
              Explore the registry
            </Link>
            <Link
              to={user ? '/dashboard' : '/register'}
              className="rounded-md border border-gray-600 px-5 py-3 font-semibold text-white hover:bg-zinc-800"
            >
              {user ? 'Go to your workspace' : 'Join as an innovator'}
            </Link>
          </div>
        </div>

        <aside className="border-l-2 border-cyan-700 py-2 pl-6 sm:pl-8">
          <p className="text-sm font-semibold uppercase text-gray-400">From discovery to delivery</p>
          <ol className="mt-5 space-y-4">
            {['Idea', 'Prototype', 'Pilot', 'Scale', 'Implemented'].map((stage, index) => (
              <li key={stage} className="flex items-center gap-4 text-white">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-zinc-800 text-sm text-cyan-300">
                  {index + 1}
                </span>
                <span className="font-medium">{stage}</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="mt-16 grid gap-8 border-t border-gray-800 pt-8 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-white">Innovators</h2>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            Share a solution, track its stage, and choose how people can approach your team.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-white">Government and sponsors</h2>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            Find relevant projects and request an introduction without exposing private contact details.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-white">Public registry</h2>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            Browse public project summaries and see how solutions progress toward implementation.
          </p>
        </div>
      </section>
    </div>
  );
}