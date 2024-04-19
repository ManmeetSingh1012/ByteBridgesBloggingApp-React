import React, { useState } from 'react'
import authService from '@/AppWriteServices/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Login } from '../ReduxStore/authslice'
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Logo } from './Logo';
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Card } from '../components/ui/card'


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

    const create = async (data: any) => {


        setError("")
        try {

            const userData = await authService.createAccount(data)
            console.log(userData)
            if (userData != null) {
                const userData = await authService.getCurrentUser()
                if (userData != null)
                {
                    dispatch(Login(userData));
                    
                } 
                
                console.log(userData)
                navigate("/")
            }
        } catch (error) {
            setError(String(error))
            console.log(String(error))
        }
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
                                    {...register("name", {
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
                                    Create Account
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