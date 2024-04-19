import { Container } from "@/AppUiComponents";
import PostForm from "@/AppUiComponents/Postform";


// we have passed it null
export default function AddPost()
{
   return(
      <Container>
         <PostForm post={null}/>
      </Container>
   )
}