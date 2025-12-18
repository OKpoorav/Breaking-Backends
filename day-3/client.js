import axios from "axios";

const URL = "http://localhost:3000/slow";
const PARALLEL_REQUESTS = 30;
const MAX_RETRIES = 5;

// 👇 change this between experiments
const TIMEOUT_MS = 500; // try 5000 for long timeout experiment

const BASE_DELAY_MS = 200;

let totalAttempts = 0;
let successCount = 0;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function backoffWithJitter(attempt) {
  const expDelay = BASE_DELAY_MS * (2 ** (attempt - 1));
  const jitter = Math.random() * expDelay * 0.5;
  return expDelay + jitter;
}

async function sendWithRetry(id) {
  let attempts = 0;

  while (attempts <= MAX_RETRIES) {
    attempts++;
    totalAttempts++;

    try {
      const res = await axios.post(
        URL,
        {},
        { timeout: TIMEOUT_MS }
      );

      if (res.status === 200) {
        successCount++;
        return;
      }
    } catch (err) {
      const isTimeout = err.code === "ECONNABORTED";

      if (!isTimeout) {
        return;
      }

      if (attempts <= MAX_RETRIES) {
        const delay = backoffWithJitter(attempts);
        await sleep(delay);
      }
    }
  }
}

async function run() {
  console.time("total_time");

  const requests = [];
  for (let i = 0; i < PARALLEL_REQUESTS; i++) {
    requests.push(sendWithRetry(i));
  }

  await Promise.all(requests);

  console.timeEnd("total_time");

  console.log({
    parallelRequests: PARALLEL_REQUESTS,
    timeoutMs: TIMEOUT_MS,
    maxRetries: MAX_RETRIES,
    totalRequestsSent: totalAttempts,
    successCount
  });
}

run();