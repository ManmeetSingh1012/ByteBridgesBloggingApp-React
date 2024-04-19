// login page 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import  eximage from "@/assets/blog.svg"

/*<div className="col-start-1 ">
        <Logo/>
         </div>

         <div className="col-start-2 ">
         <LoginForm/>
         </div> */
export function LoginPage()
{
   return(
      <>
      
      <div className="w-full h-dvh  bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center items-center">




        <Card className="border-2 rounded-2xl shadow-lg  bg-white  grid grid-cols-2 w-10/12  ">

        <div className="col-start-1 ">
        <Logo/>
         </div>

         <div className="col-start-2 ">
         <LoginForm/>
         </div>
        </Card>
         
      </div>
      
      </>
   )
}
function LoginForm() {

  // 
  return (
    <Card className=" font-sans outline-none mx-auto max-w-sm  bg-white text-indigo-950">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="yourname@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full bg-indigo-950 text-white " variant= "default">
            Login
          </Button>


            <div className="flex flex-row justify-center  items-center">
            <div className="h-0.5 w-24 bg-black flex justify-center items-center"></div>
            <span className="text-lg m-2 text-black">or</span>
            <div className="h-0.5 w-24 bg-black flex justify-center items-center"></div>
            </div>
          

          <Button variant="outline" className="w-full">
            
            Login with Github
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  )
}



function Logo()
{
  return(
    <div className="max-w-md mx-auto m-5 text-indigo-950">

    <h1 className="text-2xl text-center font-semibold font-sans">Byte Bridges</h1>
    <p className="text-xl text-center font-medium font-sans">Exploring Tomorrow's Technology, Today with Byte Bridges Tech blog</p>

<img src= {eximage}></img>

    </div>

    
  )
}

// 532A91kkk