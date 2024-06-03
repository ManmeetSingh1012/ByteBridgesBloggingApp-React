import service from '@/AppWriteServices/config';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/ReduxStore/store';
import parse from "html-react-parser";
// card element that will show the posts 
export default function PostCard({
   _id, title, image, content, author, likes, comments, topics
}: {
   _id: string,
   title: string,
   image: string,
   content: string,
   likes: Array<string>,
   author: string,
   comments: Array<string>,
   topics: string




}) {

   const authStatus = useSelector((state: RootState) => state.persistedReducer.status);


   
      return (
         <Link to={`/post/${_id}`} >
            <div className='w-full bg-white border border-gray-500 shadow-lg rounded-xl p-4 mx-auto' >
               <div className='w-full flex flex-col align-middle content-center justify-center'>
   
                  <p className="font-semibold line-clamp-2 text-center text-wrap font-sans text-4xl">{`${title}`}</p>
                  <p className="font-normal text-gray-800 line-clamp-2 mt-2 text-center text-wrap font-sans text-lg">{parse(content)}</p>
   
                  <div className='w-full flex flex-row '>
   
                     <div className='mt-5 flex flex-wrap flex-row'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                        </svg>
                        <p className="font-normal ml-1 font-sans text-lg">{`${likes.length} Likes`}</p>
                     </div>
   
   
                     <div className='mt-5 ml-6 flex flex-wrap flex-row align-middle items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>
   
                        <p className=" font-normal ml-1 font-sans text-lg">{`${comments.length} Comments`}</p>
                     </div>
   
   
                  </div>
   
   
               </div>
   
   
   
   
            </div>
         </Link>
   
      )
   

   
}