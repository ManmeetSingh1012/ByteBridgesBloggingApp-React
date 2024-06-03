import mongoose , {Document, Schema, Types} from "mongoose";

interface commentinterface extends Document{
   
      content:String,
      comment_owner : mongoose.Schema.Types.ObjectId

}



const comments = new Schema<commentinterface>({

   content :{
      type:String,
      required:true,

   },

   comment_owner :{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
   }

},{timestamps:true})

export const Comments = mongoose.model("Comments",comments)