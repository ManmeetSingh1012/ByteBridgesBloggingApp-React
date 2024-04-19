
import React from 'react';
import { RootState } from '@/ReduxStore/store';
import Container from '../Container';
import { Logo } from '../Logo';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  // we are getting status from the store , if the user is there then the navigation will changed
  // bec nav depends on acitve status , and active status get change when the user is logged in or gets logged out
    const authStatus = useSelector((state:RootState) => state.status);

    const navigate = useNavigate();

    const navItems = [
      {
        name: 'Home',
        slug: "/",
        active: true
      }, 
      {
        name: "Login",
        slug: "/login",
        active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
    ]


    
   return (
      <header className='py-3 shadow bg-white text-[#31363F] w-full'>
      <Container>
        <nav className='flex'>
          <div className='mx-5 py-2 flex flex-row' >
            <Link to='/'>

              
              

              <Logo width='70px'   />

              </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-block px-6 py-2 duration-200 hover:bg-[#5755FE] hover:text-white rounded-full font-medium font-sans text-base'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
   );
}