import express from 'express';
import indexRouter from './routes/index.js'
import axios from 'axios';
const app = express()

app.use('/',indexRouter)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  
});


