import React, { useState } from 'react'
import authService from '@/AppWriteServices/auth'
import { Link, useNavigate } from 'react-router-dom'
import { addUser } from '@/ReduxStore/authslice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Logo } from './Logo';
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Card } from '../components/ui/card'
import axios from 'axios';



/**
 * hook form have register that will register the value of the input field using usestate internally
 * on the other hand we will use forwadref for the input field so that we can pass ref from parent to the child componenet 
 * with this ref we able to registe the value 
 */
function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [toogle, setoogle] = useState(false)
    const toogling = ()=>{
        setoogle(!toogle)
    }

    const create = async (data: any) => {


        const signup = async()=>{
            toogling()


            setError("")
            try {
    
                await axios.post('http://localhost:4000/api/v1/user/signup', data).
                then((response) => {
                    console.log(response.data.user.acesstoken)
                    
                    const userData = response.data.user.acesstoken
                    
                    
                      dispatch(addUser(userData))
                      navigate("/")
                    
                    toogling()
      
                  }).catch((error) => {
      
                    console.log(error)
                    setError(String(error.message))
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


                        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                        <p className="mt-2 text-center text-base text-black/60">
                            Already have an account?&nbsp;
                            <Link
                                to="/login"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}



                        <form className='content-center' onSubmit={handleSubmit(create)}>
                            <div className='space-y-5'>
                                <Input

                                    placeholder="Enter your full name"
                                    {...register("username", {
                                        required: true,
                                    })}
                                />
                                <Input

                                    placeholder="Enter your email"
                                    type="email"
                                    {...register("email", {
                                        required: true,
                                        validate: {
                                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                "Email address must be a valid address",
                                        }
                                    })}
                                />
                                <Input

                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                <Button className='rounded-full mt-10 bg-[#5755FE] text-white' type="submit" >
                                    <div className="flex flex-row">

                                        <div className={` ${toogle ? 'visible' : 'hidden'} text-center mx-2`}>
                                            <div role="status">
                                                <svg aria-hidden="true" className="inline w-5 h-5  text-gray-200 animate-spin dark:text-orange-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        <span>Create Account</span>
                                    </div>
                                </Button>
                            </div>
                        </form>




                    </div>
                </div>




            </Card>

        </div>
    )






}

export default Signup