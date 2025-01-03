import React from "react";
import '@/index.css';

const Splashscreen = ({loginData,registerData}) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900">
      <div className="relative flex justify-center items-center w-72 h-72">
        <div className="loader absolute w-full h-full border-t-4 border-t-orange-600 border-4 border-solid rounded-full"></div>
        <h1 className="font-primary-font text-white text-base">Redirecting to {loginData || registerData}</h1>
      </div>
    </div>
  );
};

export default Splashscreen;
