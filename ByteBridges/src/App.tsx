import { useEffect, useState } from 'react';

import {useDispatch} from 'react-redux';
import  authService from './AppWriteServices/auth';

import Footer from './AppUiComponents/footer';
import { Login, Logout } from './ReduxStore/authslice';
import Header from './AppUiComponents/header/header';
import { Outlet } from 'react-router-dom';





function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData:any) => {
      if (userData) {
        dispatch(Login({userData}))
      } else {
        dispatch(Logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen w-full content-between '>


<Outlet/>


      
    </div>
  ) : null
}

export default App

// block is used to diplay things one under the other
