# Day 2 – Self-Induced DDoS (Retries and Backoff)

## Problem

When a backend becomes slow or starts failing, clients often retry requests automatically.  
If these retries happen immediately, many clients retry at the same time, increasing load exactly when the system is already struggling.

This creates a retry storm, where retries amplify failures instead of fixing them.  
In extreme cases, a healthy system can be taken down by its own clients, resulting in a self-induced DDoS.

---

## Naive approach

Retry immediately on:
- 500 errors
- Timeouts

This looks reasonable and is commonly implemented, but it causes:
- Request amplification
- Synchronized retry spikes
- Increased latency and cascading failures

---

## What actually breaks

In this experiment:
- 30 logical requests resulted in more than 2x HTTP calls
- Retries increased load during failure
- Some requests still failed despite retries

Retries increased work without guaranteeing success.

---

## Fix

Use **exponential backoff with jitter** on the client side.

Instead of retrying immediately:
- Each retry waits longer than the previous one
- Random jitter is added so retries do not synchronize
- A retry budget limits total attempts

This spreads retries over time and prevents retry storms.

---

## What we did today

- Built a slow, flaky backend endpoint
- Wrote a client with aggressive retries
- Measured request amplification
- Added exponential backoff and jitter on the client
- Observed increased latency but improved system stability

---

## Tradeoffs

- Requests take longer to complete
- Some requests may fail after exhausting retries
- Backoff does not reduce failure rate, it reduces failure amplification

This prioritizes system health over individual request latency.

---

## Key takeaway

Retries convert uncertainty into load.  
Backoff converts load into time.