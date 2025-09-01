import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    postId:{
        type:String,
        required: true,
    },
    userId:{
        type: String,
        requred: true
    },
    likes:{
        type: Array,
        default: []
    },
    numberOfLikes:{
        type: Number,
        default: 0
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;