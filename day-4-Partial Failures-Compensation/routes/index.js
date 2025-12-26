import { Router } from "express"; 
const router = Router()

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));


async function charge() {
  await sleep(randInt(100, 1000))
  const val = randInt(1,100)
  if (val % 5 === 0) {
    throw new Error("charge failed")
  }
  return true
}

async function book() {
  await sleep(randInt(100, 1000))
  const val = randInt(1,100)
  if (val % 10 === 0) {
    throw new Error("booking failed")
  }
  return true
}

async function mail() {
  await sleep(randInt(100, 1000))
  const val = randInt(1,100)
  if (val % 7 === 0) {
    throw new Error("mail failed")
  }
  return true
}

async function refund() {
  await sleep(200)
  return true
}

async function releaseBooking() {
  await sleep(200)
  return true
}


router.post('/book', async (req, res) => {
  try {
    console.log("→ charging user")
    await charge()

    console.log("→ booking seat")
    await book()

    console.log("→ sending confirmation mail")
    await mail()

    return res.send("booking completed successfully ")
  } 
  catch (error) {

    if (error.message === "charge failed") {
      return res.send(" charge failed → no booking started")
    }

    if (error.message === "booking failed") {
      console.log("↩ undo: refund user")
      await refund()
      return res.send("booking failed → refunded user ")
    }

    if (error.message === "mail failed") {
      console.log("⚠ mail failed but booking succeeded")
      return res.send("mail failed → booking is ok, email pending ")
    }

    return res.send("unknown error happened")
  }
})

export default router