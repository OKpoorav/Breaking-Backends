## Day 4 – Partial Failures & Compensation

### Problem
Some operations are made of multiple steps that depend on each other.  
Example: charge money → reserve a resource → notify user.

If early steps succeed but later ones fail, the system becomes inconsistent:
- user is charged but booking failed
- booking confirmed but no email sent
- inventory or balance is wrong

This is called a **partial failure**.  
It is one of the most common real-world failure modes in payments, bookings, and ordering systems.

---

### Naive approach
Perform all steps in sequence and assume everything will succeed:
charge()
book()
mail()


If `charge()` succeeds and `book()` fails, the user pays for nothing.  
This breaks trust and corrupts system state.

---

### What actually breaks
Without compensation:
- side effects from earlier steps remain
- later failures leave the system “half done”
- users see inconsistent outcomes

Real systems must deal with *undoing* work when later steps fail.

---

### Fix
Use **compensation**.  
For every step that changes state, define how to undo it if a later step fails.

Examples from the code:
- if `charge()` succeeds but `book()` fails → **refund**
- if `book()` succeeds but `mail()` fails → **booking stands, email pending**

The important idea:
> Compensation reverses or mitigates side effects to restore consistency.

---

### What we did today
- Simulated multi-step work with random failures
- Implemented undo logic for earlier successful steps
- Made the final system outcome consistent even under partial failure

---

### Tradeoffs
- Compensation isn’t always perfect (refund != reversal of all work)
- Some failures require manual remediation or retries
- Compensation logic increases complexity as steps grow
- Correctness often requires **idempotency + retries + compensation together**

---

### Key takeaway
> Systems rarely fail all-or-nothing — compensation keeps state consistent when only part of an operation succeeds.