import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <article className="mx-auto max-w-3xl py-10 text-gray-300">
      <p className="text-sm font-semibold uppercase text-cyan-400">Privacy notice · demo version</p>
      <h1 className="mt-2 text-3xl font-bold text-white">How SiyaPhambili uses information</h1>
      <p className="mt-4 leading-7">
        SiyaPhambili is a hackathon-stage prototype. This notice describes the information currently used by the application; it is not legal advice or a claim of full POPIA compliance.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">Information used</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
        <li>Account name and email are used for registration, login, and identifying the account owner. Passwords are stored as bcrypt hashes.</li>
        <li>Project title, sector, stage, license choice, and visibility are used to operate the innovation registry. A public project summary is visible to visitors.</li>
        <li>Project problem statements are visible to the project owner and authorized officials; do not submit confidential or commercially sensitive material.</li>
        <li>When you request an introduction, your name, email, and message are shared with that project’s owner. Your email is not shown in the public registry.</li>
        <li>Officials’ stage decisions and verification notes are retained in the project’s stage history.</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-white">Retention and requests</h2>
      <p className="mt-3 leading-7">
        A production retention schedule and account/data deletion process have not yet been established for this prototype. Avoid entering information you would not want stored during the demo. These processes must be agreed and published before production use.
      </p>

      <p className="mt-8 text-sm text-gray-400">
        Read the <Link to="/terms" className="text-cyan-400 underline">project terms</Link> and the <Link to="/projects" className="text-cyan-400 underline">public registry</Link>.
      </p>
    </article>
  );
}
