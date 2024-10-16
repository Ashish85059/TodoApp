import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate=useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("username");
    toast.success("Logged out successfully")
    setIsLoggedIn(false);
    navigate("/login");
  };
  useEffect(()=>{
    if(localStorage.getItem("username")!=null){
      setIsLoggedIn(true);
    }
  })

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="text-white text-lg font-semibold">
          <Link to="/">TodoApp</Link>
        </div>

        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
