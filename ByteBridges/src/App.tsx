import { useEffect, useState } from 'react';
import { RootState } from '@/ReduxStore/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addata , removedata } from './ReduxStore/action';
import { Outlet } from 'react-router-dom';
import { addUser } from './ReduxStore/authslice';





function App() {

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
 /* const token = useSelector((state: RootState) => state.authslice.acesstoken);
  const status = useSelector((state: RootState) => state.authslice.status);
  console.log("app.tsx",status)
  console.log("app.tsx",token)*/



  useEffect(() => {

    /*const fetchdata = async () => {
      setLoading(true)

      if (token) {
        try {

          await axios.get('http://localhost:4000/api/v1/user/getuser', { headers: { Authorization: `Bearer ${token}` } }).
            then((response) => {
              console.log(response.data)
              setLoading(false)
              const userData = response.data.data.acesstoken
              dispatch(addUser(userData))


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

    //fetchdata()*/
  })

  return !loading ? (
    <div className='min-h-screen w-full content-between '>

      <Outlet />

    </div>
  ) : null
}

export default App

// block is used to diplay things one under the other
// outlet we will pass the children component to the app component seet main.tsx for more information
