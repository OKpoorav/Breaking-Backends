function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

export async function callDependency() {
  await sleep(randInt(200, 2000));

  const x = randInt(1, 100);
  return x % 5 === 0
    ? { ok: false }
    : { ok: true };
}