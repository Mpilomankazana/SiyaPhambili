# 4. Use Makefile for Task Automation

**Status:** Accepted
**Date:** 2026-09-06

**Context:** The team needs a centralized way to trigger builds, run tests, and spin up Docker containers without memorizing complex terminal strings.
**Decision:** We will use a standard `Makefile` for task orchestration.

**Consequences:** 
* Simplifies developer onboarding.
* Windows users will run commands through WSL2 (Ubuntu) to ensure cross-platform compatibility.