import { Router } from 'express';

const router = Router();
const store = new Map();

const sleep = ms => new Promise(r => setTimeout(r, ms));

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.post('/charge', async (req, res) => {
  const key = req.header('Idempotency-Key');

  if (!key) {
    return res.status(400).json({ error: 'Missing Idempotency-Key' });
  }

  if (store.has(key)) {
    return res.json(store.get(key));
  }

  await sleep(500);

  const x = randInt(1, 100);

  const response =
    x % 10 === 0
      ? { ok: false }
      : { ok: true };

  store.set(key, response);

  return res
    .status(x % 10 === 0 ? 500 : 200)
    .json(response);
});

export default router;