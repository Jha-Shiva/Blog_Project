import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

//files import
import connectDb from './config/db.js';
import testRoutes from './routes/test.routes.js';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comment.routes.js'
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
app.use('/test', testRoutes);
// app.use('/api/user')
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

//validation middlewares
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`.bgCyan);
})