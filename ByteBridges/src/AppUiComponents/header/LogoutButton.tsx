
import { useDispatch } from 'react-redux';
import authservice from '@/AppWriteServices/auth';
import { removeUser } from '@/ReduxStore/authslice';


export default function LogoutButton()
{

   const dispatch = useDispatch();

   const logouthandler = ()=>{
      dispatch(removeUser())
      
   }
   return(
      <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-[#5755FE] text-[#31363F] hover:text-white rounded-full font-medium'
    onClick={logouthandler}
    >Logout</button>
   )
}

