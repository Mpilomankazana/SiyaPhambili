import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <article className="mx-auto max-w-3xl py-10 text-gray-300">
      <p className="text-sm font-semibold uppercase text-cyan-400">Project terms · demo version</p>
      <h1 className="mt-2 text-3xl font-bold text-white">Using the SiyaPhambili registry</h1>
      <p className="mt-4 leading-7">
        SiyaPhambili is a hackathon prototype for discovering, submitting, and reviewing South African innovation projects. These plain-language terms explain the current demo behavior and require legal review before production use.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-white">Your submission and intellectual property</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
        <li>You remain responsible for the material you submit and for choosing a license that reflects your intentions.</li>
        <li>SiyaPhambili records attribution and timestamps; it does not establish ownership, exclusivity, patent rights, or legal proof of intellectual property.</li>
        <li>Public project summaries can be viewed by anyone. Detailed problem statements are limited to the owner and authorized officials, but anyone who legitimately sees information may remember or reproduce an idea.</li>
        <li>Do not submit confidential, personal, or commercially sensitive information unless you are authorized to share it.</li>
        <li>An introduction request shares the requester’s contact details and message with the project owner. It does not publish the owner’s email address.</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-white">Project progression</h2>
      <p className="mt-3 leading-7">
        Authorized officials can record forward stage transitions and verification notes. Stage labels are workflow information, not a guarantee of funding, procurement, endorsement, or project quality.
      </p>

      <p className="mt-8 text-sm text-gray-400">
        See the <Link to="/privacy" className="text-cyan-400 underline">privacy notice</Link> for information currently processed by the prototype.
      </p>
    </article>
  );
}
