import { set, useForm } from "react-hook-form";
import {Button} from '../components/ui/button';
import {Input} from '../components/ui/input';
import service  from '@/AppWriteServices/config';
import authService from '@/AppWriteServices/auth'
import { useNavigate } from "react-router-dom";
import {  useSelector } from 'react-redux';
import { RootState } from "@/ReduxStore/store";
import RTE from "./RTE";
import { useCallback , useEffect, useRef} from "react";
import { ID, Models } from "appwrite";
import { ReactNode } from "react";
import Select from "./select";
import { useState } from "react";

import axios from "axios";
// this is the interface to add post using rte editor

interface Posts {
    _id:string,
   title:string,
   content:string,
    topics:string,
    image:string,
}



// we have passed here null it wont work ok .
export default function PostForm({ post } : {post :Posts | null}) {
   const { register, handleSubmit, watch, setValue, control, getValues ,formState: { errors } } = useForm({
       defaultValues: {
           title: post?.title || "",
           topics: post?.topics || "",
           content: post?.content || "",
           
           image :  ""
       },
   });


   
   const [error,seterror] = useState("")
   const formdata = new FormData()

    const [loading,setloading] = useState(false)

   const navigate = useNavigate();
   const acesstoken = useSelector( (State:RootState)=> State.persistedReducer.acesstoken)
   console.log(acesstoken)

   const submission = async (data:any) => {
    console.log(data);
    
       if (post != null) {
        data.image = data.image[0]
        formdata.append("title",data.title)
        formdata.append("topics",data.topics)
        formdata.append("content",data.content)
        formdata.append("coverimage",data.image)


        console.log(formdata)

        setloading(true)
        
      
               try{
                  await axios.put(`http://localhost:4000/api/v1/blog/editblog/${post._id}`,formdata,{headers:{Authorization:`Bearer ${acesstoken}`}}).
                  then((response)=>{
                     console.log(response.data.data)
                        navigate("/profile")
                     
                     
      
                  }).catch((error)=>{
      
                     console.log(error)
                     seterror(error.message)
      
                  }).finally(()=>{
                     setloading(false)
                  })
      
               }catch(error){
                  console.log(error)
                  seterror("something went wrong")
                  setloading(false)
                  
               
               }
      
            
      
            

           console.log("data2",data)
       } else {

        data.image = data.image[0]
        formdata.append("title",data.title)
        formdata.append("topics",data.topics)
        formdata.append("content",data.content)
        formdata.append("coverimage",data.image)


        console.log(formdata)

        setloading(true)
        
      
               /*try{
                  await axios.post("http://localhost:4000/api/v1/blog/addblog",formdata,{headers:{Authorization:`Bearer ${acesstoken}`}}).
                  then((response)=>{
                     console.log(response.data.data)
                        navigate("/profile")
                     
                     
      
                  }).catch((error)=>{
      
                     console.log(error)
                     seterror(error.message)
      
                  }).finally(()=>{
                     setloading(false)
                  })
      
               }catch(error){
                  console.log(error)
                  seterror("something went wrong")
                  setloading(false)
                  
               
               }*/
      
            
      
            
         

        
           
       }
   };

   



  

   return (

    <div className="p-5 flex flex-col flex-wrap ">

        <span className="text-red-600 text-base">*All fields are requried </span>
        <span className="text-red-600 text-base">{`${error}`}</span>
<form onSubmit={handleSubmit(submission)} className="flex flex-wrap">
           <div className="w-2/3 px-2">
               <Input
                  
                   placeholder="Title"
                   className="mb-4"
                   {...register("title", { required: true })}
               />
               <Input
                 
                   placeholder="Topics"
                   className="mb-4"
                   {...register("topics", { required: true })}
                   
               />

<RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />


<div className="w-1/3 px-2">


{
    post == null ? (
<Input
                 
                 type="file"
                 className="mb-4 mt-4"
                 accept="image/png, image/jpg, image/jpeg, image/gif vedio/mp.4"
                 {...register( "image", { required: true })}
             />
             
             
               
           
    ): null
}
   

</div>




<Button type="submit"  variant={post ? "default" : undefined} className="w-2/3 mx-auto inline-block px-6 py-2 
duration-200 bg-[#5755FE] text-white  rounded-full font-medium font-sans text-base">
                   {post ? "Update" : "Submit"}
               </Button>
              
           </div>
           
       </form>
    </div>
       
   );
}


/* 

 
<div className="w-1/3 px-2">
               <Input
                 
                   type="file"
                   className="mb-4"
                   accept="image/png, image/jpg, image/jpeg, image/gif"
                   {...register( "featuredimage", { required: !post })}
               />
               {post && (
                   <div className="w-full mb-4">
                       <img
                           src={service.getfilePreview(post.featuredImage)}
                           alt={post.title}
                           className="rounded-lg"
                       />
                   </div>
               )}
               <Select
                   options={["active", "inactive"]}
                   label="Status"
                   className="mb-4"
                   {...register("status", { required: true })}
               />
               <Button type="submit"  variant={post ? "default" : undefined} className="w-full inline-block px-6 py-2 duration-200 bg-[#5755FE] text-white  rounded-full font-medium font-sans text-base">
                   {post ? "Update" : "Submit"}
               </Button>
           </div>*/
