import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl py-10 sm:py-16">
      <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-brand-teal">
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
              className="rounded-md bg-brand-teal px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-teal-hover"
            >
              Explore the registry
            </Link>
          </div>
        </div>

        {/* Razor-thin elegant border on the left */}
        <aside className="border-l border-brand-teal py-2 pl-6 sm:pl-8">
          <p className="text-sm font-semibold uppercase text-gray-400">From discovery to delivery</p>
          <ol className="mt-5 space-y-4">
            {['Idea', 'Prototype', 'Pilot', 'Scale', 'Implemented'].map((stage, index) => (
              <li key={stage} className="group flex cursor-pointer items-center gap-4">
                {/* Static Number Circle */}
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-brand-teal bg-zinc-800 text-sm font-bold text-white">
                  {index + 1}
                </span>
                
                {/* Disney Beam Text Container */}
                <span className="relative overflow-hidden rounded-full px-4 py-1.5">
                  {/* The animated beam sweeping left to right on hover */}
                  <span className="absolute left-0 top-0 h-full w-0 rounded-full bg-brand-teal opacity-30 shadow-[0_0_15px_var(--color-brand-teal)] transition-all duration-500 ease-out group-hover:w-full"></span>
                  
                  {/* The stage text standing securely above the beam */}
                  <span className="relative z-10 font-medium tracking-wide text-white">
                    {stage}
                  </span>
                </span>
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