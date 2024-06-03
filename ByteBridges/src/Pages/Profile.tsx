import { useState, useEffect } from "react";
import { PostCard } from "@/AppUiComponents";
import { useSelector } from "react-redux";
import { RootState } from '@/ReduxStore/store';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {

   const acesstoken = useSelector((State: RootState) => State.persistedReducer.acesstoken)
   console.log(acesstoken)

   const navigate = useNavigate()

   const [loading, setloading] = useState(false)

   const [update, setupdate] = useState(false)

   const [user, setuser] = useState({

      name: "John Doe",
      email: "john@gmail.com",
      joined: "2021-09-01",
   })

   const [posts, setposts] = useState([])

   useEffect(() => {
      setloading(true)
      const userdata = async () => {
         

         try {
            await axios.get("http://localhost:4000/api/v1/user/getuser", { headers: { Authorization: `Bearer ${acesstoken}` } }).
               then((response) => {
                  console.log(response.data.data)

                  setuser({
                     name: response.data.data.name,
                     email: response.data.data.email,
                     joined: response.data.data.updatedAt
                  })

               }).catch((error) => {

                  console.log(error)

               }).finally(() => {
                  setloading(false)
               })

         } catch (error) {
            console.log(error)

         }

      }

      userdata()

   }, [])

   useEffect(() => {
      setloading(true)
      const userblog = async () => {

         

         try {
            await axios.get("http://localhost:4000/api/v1/blog/getallbloguser", { headers: { Authorization: `Bearer ${acesstoken}` } }).
               then((response) => {
                  console.log(response.data.data)

                  setposts(response.data.data)


               }).catch((error) => {

                  console.log(error)

               }).finally(() => {
                  setloading(false)
               })

         } catch (error) {
            console.log(error)

         }

      }

      userblog()
   }, [update])


   const ondelete = async (slug: string) => {
      try {

         setloading(true)

         try {
            await axios.delete(`http://localhost:4000/api/v1/blog/deleteblog/${slug}`, { headers: { Authorization: `Bearer ${acesstoken}` } }).
               then((response) => {
                  console.log(response.data.data)

                  setposts(response.data.data)
                  setupdate(!update)

               }).catch((error) => {

                  console.log(error)

               }).finally(() => {
                  setloading(false)
               })

         } catch (error) {
            console.log(error)

         }

      } catch (error) {
         console.log(error)
      }
   }

   const onedit = async (slug: string) => {

      navigate(`/edit-post/${slug}`)

   }



   if (!loading) {
      return (



         <div className="w-full h-full bg-gray-50 flex flex-col ">
            <div className="flex flex-col w-fit mx-auto mt-10 rounded-xl border border-gray-200 bg-white p-8 items-center">

               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
               </svg>


               <h1 className="font-bold text-2xl mt-2">{user.name}</h1>
               <h1 className="font-normal text-base ">{user.email}</h1>

               <h1 className="font-normal text-sm mt-2 text-gray-500">{`User Joined on :${user.joined.slice(0, 10)}`}</h1>

            </div>


            <div className="flex flex-col mt-5 items-center justify-center align-middle">

               <h1 className="font-bold text-2xl mt-2">Your Blogs</h1>


               <div className="mt-5">
                  {

                     posts.length == 0 ?

                        (<h1 className="font-normal text-lg mt-2 text-gray-500">{`Oops No Blog found Add Your first Blog`}</h1>) :
                        (
                           <div className='flex flex-col align-middle justify-center items-center'>
                              {posts.map((post: any) => (

                                 <div key={post._id} className='p-2 w-2/3 '>
                                    <PostCard {...post} />

                                    <div >
                                       <button onClick={() => onedit(post._id)} aria-label="Edit" className="p-2">
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="24"
                                             height="24"
                                             viewBox="0 0 24 24"
                                             fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             className="feather feather-edit"
                                          >
                                             <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                             <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L11 16l-4 1 1-4 10.5-10.5z"></path>
                                          </svg>
                                       </button>

                                       <button onClick={() => ondelete(post._id)} aria-label="Delete" className="p-2">
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="24"
                                             height="24"
                                             viewBox="0 0 24 24"
                                             fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             className="feather feather-trash-2"
                                          >
                                             <polyline points="3 6 5 6 21 6"></polyline>
                                             <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m5-3h4a2 2 0 0 1 2 2v1H8V5a2 2 0 0 1 2-2z"></path>
                                             <line x1="10" y1="11" x2="10" y2="17"></line>
                                             <line x1="14" y1="11" x2="14" y2="17"></line>
                                          </svg>
                                       </button>
                                    </div>

                                 </div>
                              ))}
                           </div>
                        )

                  }




               </div>

               <button onClick={() => { navigate("/add-post") }} className="bg-orange-500 mt-5 text-white  border border-orange-500 rounded-xl h-fit w-fit p-3 hover:bg-orange-600 transition-colors duration-300">{"Add Blogs"} </button>


            </div>
         </div>
      )
   } else {
      return (
         <h1>Loading..</h1>
      )
   }



}

export default Profile;