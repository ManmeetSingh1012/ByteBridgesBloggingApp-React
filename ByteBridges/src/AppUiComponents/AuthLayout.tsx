import { RootState } from '@/ReduxStore/store';
import React ,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({children,authentication = true} :{
   children:React.ReactNode,
   authentication:boolean
}) {

   const navigate = useNavigate();
   const [loader,setLoader] = useState(true);
   // root state is the type of the state of the redux store
   const authStatus = useSelector((state:RootState) => state.persistedReducer.status);

   useEffect
   (() => {

      // this code is diffucult to understand : advance stuff , ref : github chai aur react
      if(authentication && authStatus !== authentication){
         navigate('/login');
      }
      else if(!authentication && authStatus !== authentication){
         navigate('/');
      }
         setLoader(false);
      
   },[authStatus,authentication,navigate]);

   return  loader ? <h1>Loading..</h1> : <>{children}</>;
}