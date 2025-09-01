import express from 'express';
import colors from 'colors'

//config express object
const app = express();
const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`.bgCyan);
})