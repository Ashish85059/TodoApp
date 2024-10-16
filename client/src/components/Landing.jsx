import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const username = localStorage.getItem('username');
    if (username) {
      navigate('/todolist'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row justify-between items-center">
        
        <div className="text-center lg:text-left lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Todo App</h1>
          <p className="text-lg text-gray-700">Manage your tasks efficiently and stay organized with our simple Todo List application.</p>
        </div>
        
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
          >
            Go to Todo List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
