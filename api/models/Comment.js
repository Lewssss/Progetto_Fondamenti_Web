import mongoose, { Mongoose } from "mongoose"

const {Schema, model} = mongoose;

const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId, 
        required:true, 
        ref:"Post"
    },
    author: {
        type: Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    text: {
        type:String,
        required:true
    },
    replyTo:{
        type: Schema.Types.ObjectId,
        ref:"Comment",
    },
    createdAt: {
        type:Date,
        default: Date.now,
        required:true
    }

});

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;

