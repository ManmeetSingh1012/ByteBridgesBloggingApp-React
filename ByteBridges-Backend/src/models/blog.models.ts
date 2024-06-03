import mongoose , {Document, Schema} from "mongoose";



interface bloginterface extends Document{

   title:String,
   image:String,

   content : String,
   author : mongoose.Schema.Types.ObjectId,
   likes: Array<mongoose.Schema.Types.ObjectId>,
   comments : Array<mongoose.Schema.Types.ObjectId>,
   topics : String



}


const blog = new Schema<bloginterface>({


   title : {
      type:String,
      required:true
   
   },


   image : {
      type:String,
      
   },

   content : {
      type:String,
      required:true
   },

   author : {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
   },

   likes : [{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      
   }],

   comments : [{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comments"
   }]

 , topics :{
   type:String,

 }


},{timestamps:true})


export const Blog =  mongoose.model("Blog",blog)