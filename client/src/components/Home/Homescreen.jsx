import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const Homescreen = () => {
  const spanRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(spanRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 2, ease: 'circ.inOut' }
    );
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className='w-screen h-screen bg-gray-900 flex flex-col items-center justify-center'>
      <h1 className="text-white text-3xl font-secondary-font sm:text-3xl md:text-5xl 2xl:text-6xl">
        File <span ref={spanRef} className='text-red-500 inline-block'>Drive</span>
      </h1>
      <div className="option mt-10 flex flex-col space-y-4">
        <button
          className='w-48 rounded-lg bg-white px-4 py-2 font-primary-font text-base font-bold text-gray-900 transition-colors duration-200 ease-in-out hover:bg-orange-600 hover:text-white sm:text-xl md:text-xl '
          onClick={handleLoginClick}
        >
          Log In
        </button>
        <button
          className='w-48 rounded-lg bg-orange-600 px-4 py-2 font-primary-font text-base font-bold text-white transition-colors duration-200 ease-in-out hover:bg-orange-500 sm:text-1xl md:text-xl'
          onClick={handleSignupClick}
        >
          Sign Up
        </button>
      </div>
      <h2 className='font-primary-font text-gray-500 mt-5 text-xs sm:text-xs md:text-sm'>Made By Abhrajit Debnath</h2>
    </div>
  );
}

export default Homescreen;
