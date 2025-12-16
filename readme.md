# 30 Days of Breaking Backends

This repository documents a 30 day self guided challenge focused on understanding how backend systems fail and how to design them to recover safely.

Each day covers one real world failure mode commonly seen in production systems.  
The goal is not to build large systems, but to build small, sharp examples that expose why naive solutions break.

---

## What this is

- Practical backend and systems engineering practice
- Learning through building, breaking, and fixing
- Focused on failure modes, retries, race conditions, and recovery
- Each day produces a runnable example and a short README

---

## What this is not

- A framework
- A tutorial series
- Interview answer memorization
- A collection of system design diagrams

This repo prioritizes behavior under failure, not happy paths.

---

## Structure

```text
30-days-of-breaking-backends/
│
├── day-01-idempotency/
│   └── README.md
│
├── day-02-retries-backoff/
│   └── README.md
│
├── day-03-...
│
└── README.md

Each folder contains:
	•	A minimal backend or script
	•	A README explaining:
	•	The problem
	•	The naive approach
	•	What breaks
	•	The fix
	•	Remaining tradeoffs

⸻

Why this exists

Most production incidents are not caused by:
	•	Bad algorithms
	•	Syntax errors
	•	Missing libraries

They are caused by:
	•	Retries
	•	Partial failures
	•	Timeouts
	•	Duplicate requests
	•	Crashes at the worst possible time

This repo is an attempt to build intuition around those failures.

⸻

How to use this repo
	•	Pick any day
	•	Read the README first
	•	Run the code
	•	Break it
	•	Observe what fails

The order matters less than the thinking.

⸻

Progress
	•	Day 01 - Idempotency under retries ✅
	•	Day 02 - Retries and backoff (coming)
	•	Day 03 - Exactly-once is a lie
	•	Day 04 - Timeouts vs retries
	•	Day 05 - Partial failure and compensation
	•	…

(Updated daily)

⸻

Ground rules
	•	Start simple
	•	In memory before infrastructure
	•	Assume crashes can happen anywhere
	•	Prefer correctness over convenience
	•	Document tradeoffs honestly

⸻

Who this is for
	•	Backend engineers
	•	Full stack developers curious about systems
	•	Anyone who wants to understand why real systems are designed the way they are

⸻

License

MIT

