import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

//files import
import connectDb from './config/db.js';
import testRouter from './routes/test.routes.js';
import authRouter from './routes/auth.routes.js'
import errorHandler  from './middlewares/error.middlewares.js';
import cookieParser from 'cookie-parser';

//config dotenv
dotenv.config()

//config db
connectDb()

//config express object
const app = express();
const PORT = process.env.PORT || 8080

//middlewares
app.use(express.json())
app.use(cookieParser())

//routes
app.use('/test', testRouter);
// app.use('/api/user')
app.use('/api/auth', authRouter)

//validation middlewares
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`.bgCyan);
})