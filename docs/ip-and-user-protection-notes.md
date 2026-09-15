# SiyaPhambili — Protecting Innovators & Their Solutions (Working Draft)

`docs/popia-notes.md` covers protecting *account* data (email,
password). This document covers a different risk: protecting the
**solutions themselves** — the ideas, problem statements, and technical
work an innovator submits to a platform whose entire purpose is to
make that submission publicly visible to government and sponsors.

That's a real tension, not a solved problem. The design below
deliberately separates three things that are easy to conflate:

1. **Discoverability** — government/sponsors can find innovations.
2. **Controlled disclosure** — innovators decide how much detail is exposed, and to whom.
3. **Attribution/provenance** — the system records who submitted what and when, without pretending that this creates legal IP rights.

## The core risk

A public registry that shows a compelling solution's full write-up to
anyone — including a well-resourced department or company that could
build a version of it without the original team — creates exactly the
outcome SiyaPhambili exists to prevent (good ideas disappearing from
the people who built them). Six platform-level mitigations:

### 1. Summary vs. full detail — not everything is public by default

`GET /projects` (the public registry) always returns **summary fields
only**: title, sector, current stage, `license_type`,
`contact_required`, submission date. The full `problem_statement` and
any deeper technical detail are only returned by `GET /projects/{id}`
to the project's owner or an authenticated `official`/`super_admin` —
not to anonymous visitors or a scraper hitting the list endpoint.
This doesn't stop a genuinely interested official from reading the
full details (that's the point of the platform), but it does stop
casual scraping of every team's complete write-up.
See `docs/api/api-contracts.md` §2.1–2.2 for the exact field split.

### 2. Ownership is enforced server-side, not just displayed

`Projects.user_id` is set from the verified JWT at creation time —
never accepted from the request body — and only that user (or an
official/super_admin) can modify the record. This is a cheap,
concrete guarantee: nobody can edit or reassign someone else's
submission by crafting a request.

### 3. Attribution & provenance — the audit trail doubles as evidence, not ownership

`Projects.created_at` is immutable and server-set, and
`StageGateHistory` is an append-only record of every stage transition
and who authorized it.

> SiyaPhambili does not grant or establish legal ownership of an
> innovation. It provides attribution, registration history,
> controlled disclosure and an auditable record of submissions and
> changes.
>
> The registration timestamp and stage history provide evidence of
> when a submission was recorded and by whom; they do not create
> exclusivity or constitute legal proof of IP ownership.

This exact wording (or a shortened version of it) should also appear
in the actual product UI — on the submission form and on a project's
detail page — not just in this doc. A disclaimer nobody but the dev
team ever reads isn't protecting anyone.

### 4. Contact requests, not exposed contact info

An official/sponsor who wants to engage a team doesn't get the
innovator's raw email from the registry. They send a `ContactRequest`
(`POST /projects/{id}/contact-requests`); the innovator sees who's
asking and why, and decides whether to respond:

```
Official → SiyaPhambili → Contact Request → Innovator decides whether to respond
```

— never `Official → public registry → team's email/phone`. See
`docs/api/api-contracts.md` §2.5. This keeps discovery working (the
whole point of the platform) while giving innovators control over who
can actually reach them, and it minimizes unnecessary exposure of
personal contact information — the same principle `docs/popia-notes.md`
argues for on the data-minimization side.

### 5. `license_type` and `contact_required` are separate, orthogonal fields

Earlier drafts used a single `license` string (e.g. `"Contact
Required"`), which conflated two different things: the legal reuse
grant, and whether the team wants to be approached. A team can be
`license_type: "MIT"` (anyone may reuse the code under MIT terms) and
still set `contact_required: true` (they still want pilot/partnership
conversations to go through them). Keeping the fields separate makes
both independently true instead of forcing a false choice:

- **`license_type`** — enum: `"MIT"` | `"All Rights Reserved"` | `"Other"`.
- **`license_note`** — free text, only meaningful (and only
  accepted by the API) when `license_type` is `"Other"` — covers
  Apache-2.0, GPL, "proprietary pending patent," etc. without
  enumerating every SPDX identifier during a hackathon.
- **`contact_required`** — boolean, independent of `license_type`.

Both are shown on every registry listing, so government officials and
sponsors see a team's terms before they act — more protection than
most hackathon prototypes ever get.

### 6. Optional restricted visibility for early-stage ideas

`Projects.visibility` (`public` | `restricted`) lets a team keep a
still-forming idea's full details limited to authenticated
officials/super_admins rather than the open internet, while the
summary (title, sector, stage) still appears in the registry so it's
discoverable. A team can flip a project to fully public once they're
comfortable, e.g. once it's past `Idea` stage.

**Open product decision, not an engineering one:** should a fresh
submission default to `public` or `restricted`? More visibility helps
discovery; less visibility protects an unfinished idea. Worth a short
team conversation before the submission form is built.

## What this does NOT protect against

Be straightforward about this in the pitch — judges respect a team
that names the limits of what they built:

- **Independent reproduction of a public idea.** If a `problem_statement`
  is visible to an authenticated official, nothing stops them from
  building something similar elsewhere. The platform creates a
  timestamped, attributed record of who proposed it first — it does
  not grant patent-style exclusivity.
- **Legal IP protection.** Copyright/patent/trade-secret protection is
  a legal matter outside what any platform can enforce. Teams with
  genuinely sensitive IP should not publish full technical detail
  before they've sought their own legal advice.
- **Screenshots, exports, or an official simply remembering an idea.**
  No access control stops someone who legitimately viewed a project
  from acting on what they saw — the goal here is making that
  interaction visible and attributable, not physically impossible.

## Hackathon build scope

- **P1 (do during the event — makes the story demoable):**
  ownership enforcement on `POST /projects` and `PUT /projects/{id}/stage`;
  summary-vs-detail split across `GET /projects` and `GET /projects/{id}`;
  `license_type` / `license_note` / `contact_required` fields on
  submission and on both response shapes; disclaimer copy on the
  submission form and detail page; `ContactRequests` **creation** and
  the innovator being able to see requests made to them.
- **P2 (strengthens it, don't block the demo on it):** accept/decline
  state on a `ContactRequest`; any notification beyond "check your
  dashboard."
- **P3 / post-hackathon:** view logging, a formal MOU workflow before
  `Pilot` stage, etc. — name these as roadmap items in the pitch,
  don't try to build them live.
