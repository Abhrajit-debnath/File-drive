import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import '@/index.css';
import { useNavigate } from 'react-router-dom';
import Splashscreen from './Splashscreen';
import axios from "axios";

const Register = ({ registerData }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showSplash, setShowSplash] = useState(false);

  const isFirstVisit = () => {
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
      localStorage.setItem('firstVisit', 'false');
      return true;
    }
    return false;
  };


  useEffect(() => {
    if (isFirstVisit()) {
      setShowSplash(true);
      setTimeout(() => setShowSplash(false), 2000);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post('/users/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Account registered successfully!');
        setErrors([]);
      } else {
        setErrors(response.data.errors || [{ msg: 'Registration failed. Please try again.' }]);
        toast.error(response.data.message || 'Registration Failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors(error.response?.data.errors || [{ msg: 'An unknown error occurred' }]);
      toast.error(error.response?.data.message || 'Invalid Inputs. Please try again.');
    }
    e.target.reset();
  };



  return (
    <div className="login h-screen w-screen">
      {showSplash ? (
        <Splashscreen registerData={registerData} />
      ) : (
        <div className="flex justify-center items-center h-full">
          <form
            onSubmit={handleSubmit}
            className="w-[60%] border-0.5 border-gray-600 border rounded-xl p-10 backdrop-blur-xl sm:w-96 md:w-[60%] lg:w-[45%] xl:w-[35%] 2xl:w-[26%]"
          >
            <h1 className="text-center text-2xl text-white font-primary-font uppercase mb-10 sm:text-xl md:text-2xl">Register</h1>
            {errors.length > 0 && (
              <div className="mb-4 font-primary-font">
                {errors.map((error, index) => (
                  <p key={index} className="text-red-500 text-sm">
                    {error.msg + '!'}
                  </p>
                ))}
              </div>
            )}
            <div className="grid gap-7 mb-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-lg font-primary-font font-medium text-gray-900 dark:text-white sm:text-base md:text-lg"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="py-3 font-secondary-font font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5 border border-1 border-gray-500 bg-transparent dark:placeholder-gray-400 dark:text-white focus:outline-none"
                  placeholder="John Doe"
                  required
                  name="username"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-primary-font font-medium text-gray-900 dark:text-white sm:text-base md:text-lg"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="py-3 font-secondary-font font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5 border border-1 border-gray-500 bg-transparent dark:placeholder-gray-400 dark:text-white focus:outline-none"
                  placeholder="JohnDoe@gmail.com"
                  required
                  name="email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-primary-font font-medium text-gray-900 dark:text-white sm:text-base md:text-lg"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="py-3 font-secondary-font font-medium text-gray-900 text-sm rounded-lg block w-full p-2.5 border border-1 border-gray-500 bg-transparent dark:placeholder-gray-400 dark:text-white focus:outline-none"
                    placeholder="Abcd124"
                    required
                    name="password"
                  />
                  {showPassword ? (
                    <RemoveRedEyeIcon
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>

              <div className="flex gap-5">
                <button
                  type="submit"
                  className="font-primary-font w-28 focus:outline-none text-white bg-blue-500 hover:bg-orange-800 hover:transition font-normal rounded-lg text-sm px-3 py-2.5 dark:bg-orange-700 transition sm:text-sm md:text-base"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
