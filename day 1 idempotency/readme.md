# Day 1 – Idempotency under retries

## Problem

When making a payment, sometimes the UI gets stuck, times out, or does not update.  
Users click the button again or refresh the page.  
Each click or refresh sends a new request to the server.

If the backend is not handled correctly, this can result in multiple payments for the same action.

The core issue is that the client does not know whether the previous request succeeded or failed, so it retries.

---

## Fix

This is where **idempotency** comes in.

Idempotency means that performing the same logical operation multiple times produces the same result.

To achieve this:
- The client generates an **Idempotency-Key** for a single user action
- The key is sent with every retry in the request header
- The server stores the key along with the request result
- If the same key + same payload is received again, the server returns the same response instead of executing again

This ensures retries do not cause duplicate side effects.

---

## What we did today

- Built a mock payment endpoint
- Simulated random failures and timeouts
- Implemented idempotency using an in-memory store
- Observed how retries can cause double execution without idempotency
- Added protection so the same action executes only once

---

## Tradeoffs

- In-memory storage breaks on server restart
- Concurrent requests can still race without proper locking
- Idempotency keys must be expired safely
- Same key with different payloads must be rejected

This solves retries, not distributed consistency.

---

## Key takeaway

Idempotency protects systems from uncertainty caused by retries, not from bugs or bad UX.