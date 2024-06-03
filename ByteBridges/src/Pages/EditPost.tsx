import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../AppUiComponents'
import service from '@/AppWriteServices/config';
import { useNavigate,  useParams } from 'react-router-dom';
import axios from 'axios';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)

    console.log("slug",slug)
    useEffect(() => {

        const fetchdata = async ()=>{
            if (slug) {
                try {
    
                    await axios.get(`http://localhost:4000/api/v1/blog/getblog/${slug}`).
                        then((response: any) => {
                            console.log(response.data.data)
                            setLoading(false)
                            setPosts(response.data.data)
    
    
    
                        }).catch((error) => {
    
                            console.log(error)
                            setLoading(false)
    
    
                        })
    
    
                } catch (
    
                error
                ) {
    
                    console.log(error)
                    setLoading(false)
                }
            } else {
                navigate('/')
            }
        }

        fetchdata()
        
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost