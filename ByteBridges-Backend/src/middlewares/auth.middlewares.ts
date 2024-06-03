import { NextFunction , Request , Response } from "express";
import  jwt  from "jsonwebtoken";
import { User , userdata } from "../models/user.model";
import { JwtPayload } from "jsonwebtoken";

declare module 'express-serve-static-core' {
   interface Request {
     user?: userdata
   }
   
 }

 // || req.header("Authorization")?.replace("Bearer ","")

export const verifyjwt = async (req:Request , res:Response , next:NextFunction) =>{

   try {

   
      const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ","")
      console.log("token jwt",token)

      if(!token)
      {
         res.status(401).json({ 

            success:false,
            message:"Unauthorized Reaquest or token does not exist"
         
         })

         return;
      }
      const secret_token :string | undefined = process.env.ACCESS_TOKEN_SECRET 

      const data = jwt.verify(token, secret_token!) as JwtPayload;
      const user = await User.findById({_id : data._id}) as userdata

      if(!user)
      {
         res.status(401).json({
            success:false,
            message:"Unauthorized Request | user not found or wrong or expired token"
         })
      }

      req.user = user 

      next()



   }catch(error)
   {
      if(error instanceof Error)
      {
         console.log("error",error.message)
         //throw error
      }
   }
}