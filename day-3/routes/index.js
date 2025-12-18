import { Router } from "express"; 
const router = Router()

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));



router.post('/slow',async (req,res)=>{
 await sleep(randInt(200, 3000))
    return res.status(200).json({health:"ok"})
})

export default router