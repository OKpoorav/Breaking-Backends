import express from 'express';
import indexRouter from './routes/index.js'
 


const app = express()


const PORT = 3000
app.use('/',indexRouter)
app.listen(PORT,()=>{
    console.log(
     `server listening on port ${PORT}`)
})