import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ show, onClose }:{
  show: boolean,
  onClose: () => void

}) => {
  if (!show) return null;

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      
      <div className="bg-white  rounded shadow-md ">
      <h2 className="text-right p-2 cursor-pointer" onClick={onClose}>X</h2>
        
        <div className='p-4 text-center'>
        <h2 className="mb-4 text-lg font-bold">Log in to continue</h2>
        
        <p className="mb-4">We're a place where coders share, stay up-to-date and grow their careers.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2" onClick={() => navigate("/login")}>
          Log in
        </button>
        <button className="text-blue-500 ml-2" onClick={() => navigate("/signup")}>
          Create account
        </button>
        </div>
      
        
      </div>
    </div>
  );
};

export default LoginModal;