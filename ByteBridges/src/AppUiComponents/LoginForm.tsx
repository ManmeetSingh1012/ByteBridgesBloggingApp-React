import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Login as authlogin } from '../ReduxStore/authslice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import authservice from '@/AppWriteServices/auth';
import { set, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Card } from '../components/ui/card'
import { Logo } from './Logo';

// this the react hook form : way to handle the form submission , form more info refer hook form docs
// here handle submit is like value that expects a function (that u will define ) how to handle the data

function Loginform() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")


    const login = async (data: any) => {
        setError("")


        try {
            const session = await authservice.Login(data)
            console.log(session)
            if (session != null) {
                const userData = await authservice.getCurrentUser();
                if (userData != null) {
                    dispatch(authlogin(userData));
                    console.log(userData)
                    navigate("/")
                }
            }
        } catch (error) {

            setError(String(error))
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
                                <Button
                                    type="submit"
                                    className="w-full inline-block px-6 py-2 duration-200 bg-[#5755FE] text-white  rounded-full font-medium font-sans text-base"
                                >Sign in</Button>
                            </div>
                        </form>




                    </div>
                </div>




            </Card>

        </div>

    )
}


export default Loginform;