import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import authservice from '@/AppWriteServices/auth';
import { set, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Card } from '../components/ui/card'
import { Logo } from './Logo';
import axios from 'axios';
import { addUser } from '@/ReduxStore/authslice';

// this the react hook form : way to handle the form submission , form more info refer hook form docs
// here handle submit is like value that expects a function (that u will define ) how to handle the data

function Loginform() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")
    const [toogle, setoogle] = useState(false)
    const toogling = ()=>{
        setoogle(!toogle)
    }

    const login = async (data: any) => {
        setError("")


        const signup = async()=>{
            toogling()


            setError("")
            try {
    
                await axios.post('http://localhost:4000/api/v1/user/signin', data).
                then((response) => {
                    
                    
                    const userData = response.data.data.acesstoken
                    console.log("data",userData)
                    /*if (response.data) {

                      dispatch(Login(userData))

                      navigate("/")
                    } else {
                      setError("Error occured")
                    }*/

                    dispatch(addUser(userData))
                    
                    navigate("/")
                    toogling()
      
                  }).catch((error) => {
      
                    console.log(error)
                    setError(String(error.response.data.message))
                    toogling()
      
      
                  })
               
            } catch (error) {
                setError(String(error))
                console.log(String(error))
                toogling()
            }
        }

        signup()
    }

    return (

        <div className="w-full h-dvh  bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center items-center">




            <Card className="border-2 rounded-2xl shadow-lg  bg-white  grid grid-cols-2 w-10/12  p-5 py-10">




                <div className='flex items-centre justify-centre col-start-1'>

                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold text-center">Welcome to ByteBridges</h1>
                        <p className="text-center font-semibold mt-2 text-black/60">
                            The best place to share your knowledge with the world
                        </p>
                    </div>

                </div>





                <div className="flex items-center justify-center col-start-2">

                    <div className={`mx-auto w-full max-w-sm  flex flex-col justify-center`}>


                        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                        <p className="mt-2 text-center text-base text-black/60">
                            Don&apos;t have any account?&nbsp;
                            <Link
                                to="/signup"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                        <form onSubmit={handleSubmit(login)} className='mt-8'>
                            <div className='space-y-5'>
                                <Input

                                    placeholder="Enter your username"
                                    type="text"
                                    {...register("username", {
                                        required: true
                                        
                                    })}
                                />
                                <Input

                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                <Button
                                    type="submit"
                                    className="w-full inline-block px-6 py-2 duration-200 bg-[#5755FE] text-white  rounded-full font-medium font-sans text-base"
                                ><div className="flex flex-row">

                                <div className={` ${toogle ? 'visible' : 'hidden'} text-center mx-2`}>
                                    <div role="status">
                                        <svg aria-hidden="true" className="inline w-5 h-5  text-gray-200 animate-spin dark:text-orange-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                <span>Sign In</span>
                            </div></Button>
                            </div>
                        </form>




                    </div>
                </div>




            </Card>

        </div>

    )
}


export default Loginform;