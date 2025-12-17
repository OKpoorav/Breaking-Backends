import { Router } from "express"; 
import { retry } from "../services/index.js";
const router = Router()



router.post('/test',async (req,res)=>{
 const response = await retry()
    return res.status(response.status).json(response.health)
})

export default router