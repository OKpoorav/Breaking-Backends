import { callDependency } from "../repositories/index.js";

export async function retry() {
  const res = await callDependency();
  

  if (res.ok === true) {
    return { health: { ok: true }, status: 200 };
  } else {
    return { health: { ok: false }, status: 500 };
  }
}