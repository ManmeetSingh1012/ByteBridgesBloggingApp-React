import React, { useEffect, useState } from 'react'
import service from '@/AppWriteServices/config';
import { Container, PostCard } from '../AppUiComponents'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RootState } from '@/ReduxStore/store';
import Footer from '../AppUiComponents/footer';
import { useSelector } from 'react-redux';
import Header from '../AppUiComponents/header/header';
import axios from 'axios';


function Home() {


    const [active, setActive] = useState('Relevant');

    const buttons = ['Relevant', 'Toprated', 'Latest'];


    const authStatus = useSelector((state: RootState) => state.persistedReducer.status);
    const acesstoken: any = useSelector((state: RootState) => state.persistedReducer.acesstoken);

    console.log("data",acesstoken)
    console.log("auth",authStatus)



    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    const [posts, setpost] = useState([])

    //console.log(data)
    useEffect(() => {


        const fetchdata = async () => {
            setLoading(true)

            if(active === 'Relevant'){
                try {

                    await axios.get('http://localhost:4000/api/v1/blog/getallblog').
                        then((response: any) => {
                            console.log(response.data.data)
                            setLoading(false)
                            setpost(response.data.data)
    
    
    
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
    
            } else if(active === 'Toparated')

    
            {
                try {

                    await axios.get('http://localhost:4000/api/v1/blog/getallblog/toprated',{headers:{Authorization:`Bearer ${acesstoken}`}}).
                        then((response: any) => {
                            console.log(response.data.data)
                            setLoading(false)
                            setpost(response.data.data)
    
    
    
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
            }


            else{
                try {

                    await axios.get('http://localhost:4000/api/v1/blog/getallblog/latest',{headers:{Authorization:`Bearer ${acesstoken}`}}).
                        then((response: any) => {
                            console.log(response.data.data)
                            setLoading(false)
                            setpost(response.data.data)
    
    
    
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
            }
            



        }

        fetchdata()


    }, [active])







    if (authStatus != false) {



        if (loading === false) {

            if (posts.length == 0) {
                return (
                    <div className='w-full bg-gray-50'>


                        <Header />
                        <div className='p-5 w-full flex flex-col'>
                            <div className='flex flex-col justify-center items-center'>

                                <p className="font-semibold text-center font-sans text-4xl">Welcome to Byte Bridges </p>
                                <p className="mt-10 text-center font-normal fonit-sans text-2xl"> Oops No Post are there! Your are first member of Byte Bridge. Click below To add your first Blog</p>
                                <Button className='mt-1  w-fit text-white  duration-200 bg-[#5755FE] `Welcome to Byte Bridges ${data.name}`text-white  rounded-full font-medium font-sans text-base' onClick={() => navigate("/add-post")}>
                                    {"Add your first post >"}
                                </Button>
                            </div>



                        </div>
                        <Footer />

                    </div>


                )
            } else {


                return (
                    <div className='w-full '>
                        <Header />
                        <div className=' w-full flex flex-col  items-center mt-5'>
        
                            <p className=" font-semibold font-sans text-4xl">Welcome to Byte Bridges</p>
        
                            <p className="  mt-1 font-normal font-sans text-xl">Where developer blogs meet community power!</p>
        
        
        
        
        
                        </div>
                        <main>
                            <div className='w-full py-8'>
        
                                <Container>
                                    <div className='flex flex-wrap  flex-col '>
                                        <div className="flex flex-row flex-wrap justify-start items-start">
                                            {buttons.map((button) => (
                                                <button
                                                    key={button}
                                                    onClick={() => setActive(button)}
                                                    className={`px-4 mx-2 py-2 border rounded ${active === button ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                                        }`}
                                                >
                                                    {button}
                                                </button>
                                            ))}
                                        </div>
        
                                        <hr className="border-gray-200 border my-4 w-full mx-auto"></hr>
        
                                        <div className='flex flex-col align-middle justify-center items-center'>
                                            {posts.map((post: any) => (
                                                <div key={post._id} className='p-2 w-2/3 '>
                                                    <PostCard {...post} />
                                                </div>
                                            ))}
                                        </div>
        
                                    </div>
                                </Container>
                            </div>
                        </main>
                        <Footer />
                    </div>
                )

            }
        }







    } else {
        return (
            <div className='w-full '>
                <Header />
                <div className=' w-full flex flex-col  items-center mt-5'>

                    <p className=" font-semibold font-sans text-4xl">Welcome to Byte Bridges</p>

                    <p className="  mt-1 font-normal font-sans text-xl">Where developer blogs meet community power!</p>





                </div>
                <main>
                    <div className='w-full py-8'>

                        <Container>
                            <div className='flex flex-wrap  flex-col '>
                                <div className="flex flex-row flex-wrap justify-start items-start">
                                    {buttons.map((button) => (
                                        <button
                                            key={button}
                                            onClick={() => {
                                                if(button !== 'Relevant'){
                                                    alert("Please Login or Signup to see other posts")
                                                }
                                            }}
                                            className={`px-4 mx-2 py-2 border rounded ${active === button ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                                }`}
                                        >
                                            {button}
                                        </button>
                                    ))}
                                </div>

                                <hr className="border-gray-200 border my-4 w-full mx-auto"></hr>

                                <div className='flex flex-col align-middle justify-center items-center'>
                                    {posts.map((post: any) => (
                                        <div key={post._id} className='p-2 w-2/3 '>
                                            <PostCard {...post} />
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </Container>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }











}

export default Home