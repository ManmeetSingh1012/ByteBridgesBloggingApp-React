import { DeleteResult } from "mongodb";
import {User} from "../models/user.model"
import { userdata } from "../models/user.model"

import { Request ,Response  } from "express"


const genrate_token = async (id:string)  =>{

   
   try {
      const user = await User.findById(id) as userdata ; // Ensure TypeScript knows this is an IUser
    if (!user) {
      throw new Error("User not found");

    }

    const accesstoken = user.genrateAccessToken();

    user.acesstoken = accesstoken;

    // After changing the access token, save the user without validation
    await user.save({ validateBeforeSave: false });

    return accesstoken;
   }
   catch (error) {
      if(error instanceof Error)
     { throw error}
   }
}

const getuser = async (req:Request,res:Response) =>{

   try{

      //const username = req.params.id
      const user_id = req.user?._id
      const data = await User.findById({_id:user_id})


      if(!data)
      {
         res.status(400).json({
            "message":"No user data found"
         })

         return;

         return;
      }else{
         res.status(200).json({
            "message":"success",
            "data": data
         })

         return;
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


const updateuser =  async (req:Request, res:Response) =>{

   try{

      const username = req.user?.username
      const {password} = req.body

      console.log("newpassword",password)


      if(!password)
      {
         res.status(404).json({
            "message":"password is empty"
         
         })
      }
      const data = await User.findOne({username:username})
      console.log("user",data)


      if(!data)
      {
         res.status(404).json({
            "message":"No user data found"
         })

         return;
      }

      const update = await User.updateOne({username:username},
         {
            $set:{
               "password":password
            },
            $currentDate: { lastModified: true }
         }).select("-password") 
         


         if(update)
         {
            res.status(201).json({
               "message":"password updated successfully",
               "data":update
            })

         }else{
            res.status(404).json({
               "message":"password not updated"
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


const deleteuser =  async(req:Request, res: Response)=>{

   try{

     const username = req.user?.username
     const user = await User.findOne({username:username})

      if(!user)
      {
         res.status(400).json({
            "success":"false",
            "message": "user data does not exist"
         })
      }

      const userdelete  = await User.deleteOne({username:username  })

      if(userdelete)
      {

         res.status(200).json({
            "success":"true",
            "message": "user deleted succesfully"
         })
      }else{
         res.status(404).json({
            "success":"false",
            "message": "failed to delete user data"
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

const addnewuser = async (req:Request, res: Response)=>{


   try{

      
      const { username, email, password } = req.body;

      console.log(req.body)

      if (username == "") {
         res.status(400).json({
            success: false,
            message: "username is empty"
         })

   
         return;
      }

      else if (email == "") {
         res.status(400).json({
            success: false,
            message: "email is empty"
         })

         
         return;
      }

      else if (password == "") {
         res.status(400).json({
            success: false,
            message: "password is empty"
         })

        
         return;
      }


      const user = await User.findOne({

         $or :[{ username : username},{email: email}]
         
      })

      if (user) {
         res.json({
            message: "this user already exists"
         })

         console.log("username already exists", user)

         
         return;
      }

      const newuser = await User.create({
         username,
         email,
         password
      })


      const acesstoken = await genrate_token(newuser._id)
      console.log("token",acesstoken)

      
      if (newuser) {

        const user = await User.findById(newuser._id).select("-password") 

         const options = {
            httpOnly: true,
            secure: true
         }
         
         console.log("user2 created successfully", user)

         res.status(201)
         .cookie("acesstoken",acesstoken,options)
            .json({
               success: true,
               message: "user created successfully",
               user: user
            })

         //console.log("user created successfully", newuser)

         }

         else{
            res.status(400)
            
            .json({
               success: true,
               message: "something went wrong",
               
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


const login = async (req:Request, res:Response) => { 


   try{
      const {username , password} = req.body
      const data  = await User.findOne({username:username}) as userdata


      if(!data )
      {
         return res.status(400).json({
            "message":"No user data found"
         })

        
      }

      const checkpass  = data.ispassowrdMatch(password)

      if(!checkpass)
      {
         res.status(400).json({
            "message":"password does not match"
         })
      }

      const token = await genrate_token(data._id)
      console.log("token signin",token)

      
      const updatedata = await User.findOne({username:username}).select("-password")
      if(updatedata)
      {

         const options = {
            httpOnly: true,
            secure: true
         }

         

         res.status(200)
         .cookie("acesstoken",token,options)
         .json({
            "message":"login success",
            "data": updatedata
         })
      }else{
         res.status(400).json({
            "message":"login failed"
         })
      }

    }
   catch(error)
   {
      if(error instanceof Error)
      {
         console.log("error",error.message)
         throw error
      }
   }
  
}
 const logout = async (req:Request, res:Response) => {

   try{

      const id = req.user?._id
      const update = await User.findByIdAndUpdate(
         {_id : id},{
            $set:{
               acesstoken : ""
            }
         },
            {
               new:true
            }
         
      ).select("-password") 


      const options = {
         httpOnly: true,
         secure: true
     }
  

     return res
     .status(200)
     .clearCookie("accessToken", options)
     .json({
           status: 200,
           message: "User logged out successfully",
             data: update
        
     })


      
   }
  catch(error)
  {
     if(error instanceof Error)
     {
        console.log("error",error.message)
        throw error
     }
  }
  }


  const getuserbyid = async(req:Request,res:Response) =>
  {
try{

   

}catch(error)
{

}
  }
export {login , logout ,addnewuser,getuser , deleteuser, updateuser ,getuserbyid}