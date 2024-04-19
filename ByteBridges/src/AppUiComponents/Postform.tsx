import { useForm } from "react-hook-form";
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
// this is the interface to add post using rte editor

interface Posts {
   title:string,
   content:string,
   $id:string,
   status:string,
   featuredimage :string
}



// we have passed here null it wont work ok .
export default function PostForm({ post } : {post :Posts | null}) {
   const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
       defaultValues: {
           title: post?.title || "",
           slug: post?.$id || "",
           content: post?.content || "",
           status: post?.status || "active",
           featuredimage : post?.featuredimage || ""
       },
   });

   const navigate = useNavigate();
 const userData :any = useSelector((state:RootState) => state.userData);

   const submission = async (data:any) => {
    console.log(data);
    
       if (post != null) {
           /*const file = data.featuredimage[0] ? await service.uploadfile(data.featuredimage[0]) : null;

           if (file) {
            service.deletefile(post.featuredimage);
           }*/

           const dbPost = await service.updatepost(post.$id, {
               ...data,
               userId : userData.$id
           });

           if (dbPost) {
               navigate(`/post/${dbPost.$id}`);
           }
       } else {
           const file = await service.uploadfile(data.featuredimage[0]);

           if (file) {
               const fileId = file.$id;
               data.featuredimage = fileId;

               console.log("id:",userData.$id)
               console.log("id:",userData)

               if(userData.$id != null)
               {

                console.log("id:",userData.$id)
                const dbPost = await service.createpost({ ...data,  userId : userData.$id  });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
               }else{
                console.log("user id not found")
               }
               
           }
       }
   };

   const slugTransform = useCallback((value:any) => {
       if (value && typeof value === "string")
           return value
               .trim()
               .toLowerCase()
               .replace(/[^a-zA-Z\d\s]+/g, "-")
               .replace(/\s/g, "-");

       return "";
   }, []);



   useEffect(() => {
   }, []);



   useEffect(() => {
       const subscription = watch((value, { name }) => {
           if (name === "title") {
               setValue("slug", slugTransform(value.title), { shouldValidate: true });
           }
       });

       

       // for memory managment : see docs form more info
       return () => subscription.unsubscribe();
   }, [watch, slugTransform, setValue]);

   return (

    <div className="p-5 ">
<form onSubmit={handleSubmit(submission)} className="flex flex-wrap">
           <div className="w-2/3 px-2">
               <Input
                  
                   placeholder="Title"
                   className="mb-4"
                   {...register("title", { required: true })}
               />
               <Input
                 
                   placeholder="Slug"
                   className="mb-4"
                   {...register("slug", { required: true })}
                   onInput={(e) => {
                       setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                   }}
               />

<RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

<div className="w-1/3 px-2">
<Input
                 
                 type="file"
                 className="mb-4"
                 accept="image/png, image/jpg, image/jpeg, image/gif"
                 {...register( "featuredimage", { required: !post })}
             />
             {post!=null && (
                 <div className="w-full mb-4">
                     <img
                         src={String(service.getfilePreview(post.featuredimage))}
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
               
           </div>





<Button type="submit"  variant={post ? "default" : undefined} className="w-full inline-block px-6 py-2 duration-200 bg-[#5755FE] text-white  rounded-full font-medium font-sans text-base">
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
