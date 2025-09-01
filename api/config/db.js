import mongoose from "mongoose";
import colors from 'colors';

const connectDb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected on ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Database error ${error}`.bgRed.white);
    }
};

export default connectDb