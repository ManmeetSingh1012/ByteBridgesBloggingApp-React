import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from '@/AppWriteServices/config';
import { Container } from '../AppUiComponents'
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { RootState } from "@/ReduxStore/store";
import axios from 'axios';
import LoginModal from "@/components/ui/logincard";
import { set, useForm } from "react-hook-form";

// we created /post/:slug in main tsx that will be our url ans we will pass slug to link in post card 
export default function Post() {
    const [post, setPost] = useState<any>(null);
    const [comment, setComment] = useState([])
    const { slug } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState();
    const [change, setChange] = useState(false)
    //const isAuthor = post && userData ? post.userId === userData.$id : false;
    const authstatus = useSelector((state: RootState) => state.persistedReducer.status);
    const token = useSelector((state: RootState) => state.persistedReducer.acesstoken);
    console.log(token)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    useEffect(() => {

        const fetchdata = async () => {
            setLoading(true)

            if (token) {
                try {

                    await axios.get('http://localhost:4000/api/v1/user/getuser', { headers: { Authorization: `Bearer ${token}` } }).
                        then((response) => {
                            console.log(response.data)
                            setLoading(false)
                            const userData = response.data.data._id
                            setUserData(userData)



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
                setLoading(false)
                //dispatch(removedata())
                console.log('no token', token)
            }



        }

        fetchdata()
    }, [])


    useEffect(() => {

        console.log("slug", slug)
        const fetchdata = async () => {
            setLoading(true)


            try {

                await axios.get(`http://localhost:4000/api/v1/blog/getblog/${slug}`).
                    then((response: any) => {
                        console.log(response.data.data)
                        setLoading(false)
                        setPost(response.data.data)



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


        const fetchcomment = async () => {

            setLoading(true)

            try {

                await axios.get(`http://localhost:4000/api/v1/comment/getallcomment/${slug}`).
                    then((response: any) => {
                        console.log("comment", response.data.data)
                        setLoading(false)
                        setComment(response.data.data)



                    }).catch((error) => {

                        console.log(error)
                        setLoading(false)



                    })
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchdata()
        fetchcomment()

    }, [change]);

    /*const deletePost = () => {
      service.deletepost(post.$id).then((status) => {
            if (status) {
               service.deletefile(post.featuredImage);
                navigate("/");
            }
        });
    };*/

    const create = async (data: any) => {

        console.log("id", userData)


        try {
            console.log(data);
            await axios.post(`http://localhost:4000/api/v1/comment/addcomment`, {
                content: data.content,
                blogid: slug
            }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
                console.log(response.data)
                setChange(!change)

            }).catch((error) => {
                console.log(error)

                setError(error.message)
            })
        } catch (error: any) {
            console.log(error)

            setError(String(error.message))
        }


    }


    const { register, handleSubmit } = useForm({});
    const [showModal, setShowModal] = useState(false);
    const [isLiked, setIsLiked] = useState(post ? post.likes.includes(userData) : false);


    const toggleLike = async () => {
        try {
            if (!isLiked) {

                await axios.put(`http://localhost:4000/api/v1/blog/editbloglikes/${slug}`, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
                    console.log(response.data)
                    setChange(!change)
                    setIsLiked(!isLiked);

                }).catch((error) => {
                    console.log(error)

                    setError(error.message)
                })


            }
            
        } catch (error) {
            console.error('Error toggling like', error);
        }
    };



    return post ? (
        <div className="py-8 w-full  mx-auto flex flex-wrap flex-col bg-gray-100">



            <div className="flex flex-col flex-wrap w-2/3 mx-auto  bg-white rounded-xl border-gray-300 pb-5">
                <Container >

                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full "
                    />
                    <div className="w-full mb-6">
                        <h1 className="text-3xl font-bold leading-relaxed tracking-wider">{post.title}</h1>
                    </div>
                    <div className="text-xl leading-relaxed tracking-wide">
                        {parse(post.content)}
                    </div>
                </Container>

            </div>


            <div className='px-2 flex flex-row mx-auto w-2/3'>

                <div className='mt-5 flex flex-wrap flex-row'>
                    <button
                        onClick={toggleLike}
                        className="flex items-center px-4 py-2 rounded"
                    >
                        <svg
                            className={`w-6 h-6 ${isLiked ? 'text-blue-500' : 'text-black'} `}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"
                            />
                        </svg>
                        <p className={`font-normal ml-1 font-sans text-lg ${isLiked ? 'text-blue-500' : 'text-black'}`}>
                            {`${post.likes.length} Likes`}
                        </p>
                    </button>
                </div>


                <div className='mt-5 ml-6 flex flex-wrap flex-row align-middle items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>

                    <p className=" font-normal ml-1 font-sans text-lg">{`${post.comments.length} Comments`}</p>
                </div>


            </div>



            <hr className="border-gray-300 border my-4  w-2/3 mx-auto"></hr>

            <div className="flex flex-col w-2/3 mx-auto bg-white p-3 rounded-lg">


                <LoginModal show={showModal} onClose={() => setShowModal(false)} />

                <h1 className="text-2xl font-semibold mb-5">{`Top Comments: ${post.comments.length}`}</h1>

                {
                    !authstatus ? (

                        <div onClick={() => setShowModal(true)}>
                            <form onSubmit={handleSubmit(create)}>



                                <div className="flex flex-row rounded-lg mb-10">
                                    <input type="text" placeholder={"Your Comment"} id="default-input" className="bg-gray-50 border w-1/3 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                                    <button disabled className="bg-orange-500 ml-3 text-white  border border-orange-500 rounded-xl h-fit w-fit p-3 hover:bg-orange-600 transition-colors duration-300">{"Save"} </button>




                                </div>




                            </form>
                        </div>



                    ) : (

                        <div>
                            <form onSubmit={handleSubmit(create)}>



                                <div className="flex flex-row rounded-lg mb-10">
                                    <input {...register("content", {
                                        required: true,
                                    })} type="text" placeholder={"Your Comment"} id="default-input" className="bg-gray-50 border w-1/3 border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                                    <button className="bg-orange-500 ml-3 text-white  border border-orange-500 rounded-xl h-fit w-fit p-3 hover:bg-orange-600 transition-colors duration-300">{"Save"} </button>




                                </div>




                            </form>
                        </div>
                    )
                }

                {
                    comment.map((value: any, index) => (
                        <div key={index} className="flex flex-wrap flex-col p-3 border border-gray-300 mb-5 rounded-xl">


                            <div className="flex flex-row">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                                <p className="text-xl ml-2">{value.comment_owner["username"]}</p>
                            </div>

                            <div className="mt-3 ml-2 text-normal">
                                <p>{value.content}</p>
                            </div>

                        </div>
                    ))
                }

            </div>

        </div>


    ) : null;
}

/*
{isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button color="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button color="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}

                    <h1 onClick={() => setShowModal(true)}>add comment</h1>
*/