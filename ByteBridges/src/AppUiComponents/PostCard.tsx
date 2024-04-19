import service from '@/AppWriteServices/config';
import { Link } from 'react-router-dom';


// card element that will show the posts 
export default function PostCard({
   $id , title , featuredimage ,content , status , userid 
}:{
   $id:string,
   title:string,
   featuredimage:string,
   content:string,
   status:string,
   userid:string

})
{

   return (
      <Link to = {`/post/${$id}`} >
         <div className='w-full bg-gray-100  rounded-xl p-4' >
            <div className='w-full justify-center mb-4'>
               <img src = {String(service.getfilePreview(featuredimage))} className='rounded-xl'/>
            </div>
               <h2 className='text-xl font-bold'>{title}</h2>
               


         </div>
      </Link>

   )
}