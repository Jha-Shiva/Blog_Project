import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    test:{
        type:String
    }
});

const Test = mongoose.model('test', testSchema);

export default Test