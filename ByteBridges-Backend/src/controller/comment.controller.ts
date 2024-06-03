import { Comments } from "../models/comments.model";
import { User } from "../models/user.model";
import { Blog } from "../models/blog.models";
import { userdata } from "../models/user.model";

import { Request , Response } from "express";



const addcomment = async (req:Request,res:Response) =>{

   try {
      const userid = req.user?._id

      console.log("userid",userid)

      const {content,blogid} = req.body

      console.log("userid2",blogid)

      const finduser = await User.findById({_id : userid})

      if(!finduser)
      {
         res.status(404).json({
            "sucess":false,
            "message" : "user not found",
            "data": null
            
         })
      }

      const create = await Comments.create({

         content:content,
         comment_owner:userid
      })

      if(!create)
      {
         res.status(404).json({
            "sucess":false,
            "message" : "comment not created",
            "data": null
         })
      }


      console.log("create",create._id)

      const uploadblog = await Blog.findByIdAndUpdate(
         {_id:blogid},
         {
            $push:
            {
               comments:create._id
            }
         }
      )

      if(!uploadblog)
      {
         res.status(404).json({
            "sucess":false,
            "message" : "Not able to add comment to blog",
            "data": null
         })
      }else{
         res.status(200).json({
            "sucess":true,
            "message" : "comment created",
           
         })
      
      }



   } catch(error)
   {
      if(error instanceof Error)
      {
         console.log("error",error.message)
         throw error
      }
   }

}


const editcomment = async (req:Request,res:Response) =>{


   try{

      const {content} = req.body

      const id = req.params.id

      const findcomment = await Comments.findById({_id:id})

      if(!findcomment)
      {
         res.status(404).json({

           
               "sucess":false,
               "message" : "comment does not exist or comment id is wrong",
               "data": null
            
         })
      }


      const updatecomment = await Comments.findByIdAndUpdate({_id:id},{
         $set :{
            "content":content
         }
      })


      if(!updatecomment)
      {
         res.status(404).json({
            "sucess":false,
            "message" : "Not able to update comment",
            "data": null
         })
      }else{
         res.status(200).json({
            "sucess":true,
            "message" : "comment updated",
            
         })
      
      }
      


   }catch(error)
   {
      if(error instanceof Error)
      {
         console.log("error",error.message)
         throw error
      }
   }

}

const deletecomment = async (req:Request,res:Response) =>{

   try{

      const id = req.params.id

      const {blogid} = req.body
      console.log("blogid",blogid)
      console.log("id",id)

      const findcomment = await Comments.findById({_id:id})

      if(!findcomment)
      {
         return res.status(404).json({

           
               "sucess":false,
               "message" : "comment does not exist or comment id is wrong",
               "data": null
            
         })
      }

      const delet = await Comments.findByIdAndDelete({_id:id})

      const update = await Blog.findByIdAndUpdate({_id:blogid},{

          $pull: { comments: id } 
      

         
      })
      if(!delet)
      {
         res.status(404).json({
            "sucess":false,
            "message" : "Not able to delete comment",
            "data": null
         })
      }else{
         res.status(200).json({
            "sucess":true,
            "message" : "comment deleted",
           
         })
      
      }



   }catch(error)
   {
      if(error instanceof Error)
      {
         console.log("error",error.message)
         throw error
      }
   }

}


const allcomment = async (req:Request,res:Response) =>{ 


   try{

      const  blogid  = req.params.id

      const findcomment = await Blog.findById({_id:blogid}).populate({
         path:"comments",
         populate:{
            path:"comment_owner",
            select:"username"
         }
      
      })

      if(!findcomment)
      {
         res.status(404).json({
            "sucess":false,
            "message" : "blog not found",
            "data": null
         })
      }

      res.status(200).json({
         "sucess":true,
         "message" : "all comments",
         "data": findcomment?.comments
      })

   }catch(error)
   {
      if(error instanceof Error)
      {
         console.log("error",error.message)
         throw error
      }
   }
}

export {addcomment,editcomment, deletecomment , allcomment}