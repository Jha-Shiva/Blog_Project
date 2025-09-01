import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import testRouter from './routes/test.routes.js';

//config dotenv
dotenv.config()

//config db
connectDb()

//config express object
const app = express();
const PORT = process.env.PORT || 8080

//middlewares
app.use(express.json())

//routes
app.use('/test', testRouter)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`.bgCyan);
})