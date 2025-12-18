## Day 3 – Timeouts vs Retries

### Problem
When a dependency becomes slow, requests start taking longer to complete.  
A common reaction is to increase timeouts so requests “have more time” to succeed.

This often looks safe, but it can hide failure and slowly exhaust system resources.

---

### Naive approach
Increase client timeouts and avoid retries.

This reduces retry noise, but causes:
- Long-lived connections
- Requests holding resources while waiting
- Reduced capacity to handle new traffic

The system appears stable while gradually becoming unresponsive.

---

### What actually breaks
In this experiment:
- All requests succeeded
- No retries were triggered
- Requests occupied server resources for up to several seconds

Long timeouts converted load into waiting, silently consuming capacity.

---

### Fix
There is no single correct timeout.

Real systems:
- Set timeouts slightly above normal latency
- Combine timeouts with retries and backoff
- Prefer failing fast over hanging requests
- Treat timeouts as a load-control mechanism

Timeouts and retries must be tuned together.

---

### What we did today
- Built a slow but reliable endpoint
- Ran clients with long timeouts and no retries
- Observed low retry counts but high resource usage
- Compared behavior with short timeouts and retries

---

### Tradeoffs
- Long timeouts reduce retries but risk resource exhaustion
- Short timeouts increase retries and load
- Both extremes can break systems in different ways

---

### Key takeaway
A timeout is not just a client setting.  
It controls how long system resources are allowed to be consumed per request.