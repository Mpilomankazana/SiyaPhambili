# 9. Use GitHub Actions for CI/CD

**Status:** Accepted
**Date:** 2026-09-06

**Context:** We need a way to automate our testing pipelines to ensure no team member accidentally merges broken code into the main branch.
**Decision:** We will use GitHub Actions.

**Consequences:** 
* Keeps our deployment pipelines integrated with our repository and taskboards.
* Requires creating YAML configuration files in a `.github/workflows` directory.