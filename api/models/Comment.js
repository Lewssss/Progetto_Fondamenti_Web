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
    createdAt: {
        type:Date,
        default: Date.now,
        required:true
    }

});

const CommentModel = mongoose.model("CommentModel", CommentSchema);
export default CommentModel;

