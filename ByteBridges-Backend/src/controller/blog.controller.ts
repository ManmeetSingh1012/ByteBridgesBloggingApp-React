import { Blog } from "../models/blog.models";
import { Request, Response } from "express";
import { userdata } from "../models/user.model";

import fs from "fs";
import uploadaws from "../service/AwsS3";

const addblog = async (req: Request, res: Response) => {

   try {

      const authod_id = req.user?._id
      const { title, content, topics  } = req.body



      if (!title || !content || !topics ) {
         res.status(400).json({ status: false, message: "All fields are required" })
         throw new Error("All fields are required")
      }

      const img  = req.file 
      const buffer = img?.buffer
      const filename = img?.originalname

      console.log("buffer",buffer)
      console.log("img",img)
      console.log("filename",filename)

      const result = await uploadaws({ buffer: buffer!, filename: filename!, mimetype: img?.mimetype! })
      console.log("result",result)

      let image = ""
      let message = ""
      if(result)
      {
         image = result
      }else{
         message = "Image not uploaded"
      }

      const blog = await Blog.create({
         title,
         content,
         author : authod_id,
         image,
         topics
      })

      if (!blog) {
         res.status(400).json({ status: false, message: "Blog not created" , "Image Message": message })
         //throw new Error("Blog not created")
      } else {
         if(image =="")
         {
            res.status(200).json({ status: true, message: "Blog created", data: blog , "Image Message": "failed to store image"})
         }
         res.status(200).json({ status: true, message: "Blog created", data: blog  , "Image Message": "Image stored successfully"})
         
      }



   } catch (error) {
      if (error instanceof Error) {
         console.log(error.message)
      }
   }
}

const editblog = async (req: Request, res: Response) => {

   try {

      const authod_id = req.user?._id
      const  blogid  = req.params.id

      const { title, content, topics  } = req.body


      if (!title ) {
         res.status(400).json({ status: false, message: "title fields are required" })
         throw new Error("All fields are required")
      }

      if (  !content ) {
         res.status(400).json({ status: false, message: "content fields are required" })
         throw new Error("All fields are required")
      }

      if ( !topics ) {
         res.status(400).json({ status: false, message: "topics fields are required" })
         throw new Error("All fields are required")
      }

      
      

     

      const blog = await Blog.updateOne({ _id: blogid }, {
         $set:{
            title,
            content,
            topics
            
         }
      })
      

      if (!blog) {
         res.status(400).json({ status: false, message: "Blog not updated" })
         throw new Error("Blog not updated")
      } else {
         res.status(200).json({ status: true, message: "Blog updated", data: blog })
      }

   } catch (error) {
      if (error instanceof Error) {
         console.log(error.message)
      }
   }
}

const deleteblog = async (req: Request, res: Response) => {

   try {


      const blogid = req.params.id

      const blog = await Blog.findByIdAndDelete({ _id: blogid })

      if (!blog) {
         res.status(400).json({ status: false, message: "Blog not deleted" })
         throw new Error("Blog not deleted")

      } else {
         res.status(200).json({ status: true, message: "Blog deleted" })
      }
   } catch (error) {
      if (error instanceof Error) {
         console.log(error.message)
      }
   }
}

const getblog = async (req: Request, res: Response) => {
   try {

      const  blogid  = req.params.id

      const blog = await Blog.findById({ _id: blogid })

      if (!blog) {
         res.status(400).json({ status: false, message: "Blog not found" })
         throw new Error("Blog not found")
      } else {
         res.status(200).json({ status: true, message: "Blog found", data: blog })
      }
   } catch (error) {
      if (error instanceof Error) {
         console.log(error.message)
      }
   }
}

const getallblog = async (req: Request, res: Response) => {

   try {

      const blog = await Blog.find()

      if (!blog) {
         res.status(400).json({ status: false, message: "No blog found" })
         throw new Error("No blog found")
      } else {
         res.status(200).json({ status: true, message: "All blog found", data: blog })
      }
   } catch (error) {
      if (error instanceof Error) {
         console.log(error.message)
      }
   }
}


const getallbloguser = async (req: Request, res: Response) => {

   try {

      const id=req.user?._id
      const blog = await Blog.find({author:id})

      if (!blog) {
         res.status(400).json({ status: false, message: "No blog found" })
         throw new Error("No blog found")
      } else {
         res.status(200).json({ status: true, message: "All blog found", data: blog })
      }
   } catch (error) {
      if (error instanceof Error) {
         console.log(error.message)
      }
   }
}

const getallbloglatest = async (req: Request, res: Response) => {
   try {

      const blog = await Blog.aggregate(
         [
            {
               $sort: { createdAt: -1 }
            }
         ]
      )

      console.log("blog latest", blog)

      if (!blog) {
         res.status(400).json({ status: false, message: "No blog found" })
         throw new Error("No blog found")
      } else {
         res.status(200).json({ status: true, message: "All blog found", data: blog })
      }
   } catch (error) {
      if (error instanceof Error) {
         console.log(error.message)
      }
   }
}

const getallblogtoprated = async (req: Request, res: Response) => {

   try {

      const blog = await Blog.aggregate([
         {
            $sort: { likes: -1 }
         }
      ])

      if (!blog) {
         res.status(400).json({ status: false, message: "No blog found" })
         throw new Error("No blog found")
      } else {
         res.status(200).json({ status: true, message: "All blog found", data: blog })
      }
   } catch (error) {
      if (error instanceof Error) {
         console.log(error.message)
      }
   }
}


const getallblogkeyword = async (req: Request, res: Response) => {

   // match will match the thing which is present in the keyword
   // project is used to project the data to next stage of pipline :- and filter the data which values to be sent to next stage
   // sort will sort the final data

   try {

      const { sortkeyword } = req.body
      const blog = await Blog.aggregate([{
         $match: { topics: sortkeyword }
      }
         ,
      {
         $sort: { likes: -1 }
      }
      ])

      if (!blog) {
         res.status(400).json({ status: false, message: "No blog found" })
         throw new Error("No blog found")
      } else {
         res.status(200).json({ status: true, message: "All blog found", data: blog })
      }
   } catch (error) {
      if (error instanceof Error) {
         console.log(error.message)
      }
   }
}


const editbloglikes = async (req:Request , res :Response) =>
{
   try{

      
      const blogid = req.params.id
      const userid = req.user?._id

      const update = await Blog.findByIdAndUpdate(
         {_id:blogid},
         {
            $push:{
               likes : userid
            } // this will increase the likes by one 
         }
      )

      if (!update) {
         res.status(400).json({ status: false, message: "No blog found" })
         throw new Error("No blog found")
      } else {
         res.status(200).json({ status: true, message: "Likes Updated", data: update })
      }

   }catch(error)
   {
      if(error instanceof Error)
      {
         console.log(error.message)
      }
   }
}



export { addblog,  editblog, deleteblog, getallbloguser,getblog, getallblog, getallbloglatest, getallblogtoprated , getallblogkeyword ,editbloglikes}