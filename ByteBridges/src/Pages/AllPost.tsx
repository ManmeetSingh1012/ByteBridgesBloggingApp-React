import { Container , PostCard } from "@/AppUiComponents";
import React ,{useState, useEffect} from "react";
import service from "@/AppWriteServices/config";
import { useSelector } from 'react-redux';
import { RootState } from '@/ReduxStore/store';

export default function AllPost()
{

   const [posts, setPosts] = useState<any[]>([]);
   const data:any = useSelector((state: RootState) => state.userData);

   useEffect(() => { }, []);

   service.getallpost() .then((res) =>{
      if(res!= null)
      {
         setPosts(res.documents);
      }
   })


   return(

      <div className='w-full py-8'>
      <Container>
          <div className='flex flex-wrap'>
              {posts.map((post) => (
                  <div key={post.$id} className='p-2 w-1/4'>
                      <PostCard {...post} />
                  </div>
              ))}
          </div>
          </Container>
  </div>

   )
}

