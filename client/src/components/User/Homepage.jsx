import React, { useEffect, useState, useRef } from "react";
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import BackupIcon from '@mui/icons-material/Backup';
import { saveAs } from 'file-saver';


const Homepage = () => {
  const [images, setImages] = useState([]);
  const sidebarRef = useRef(null);
  const spanRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/images');
        setImages(response.data);


      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, [images, setImages]);

  const toggleSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle("left-0");
      sidebarRef.current.classList.toggle("-left-full");
      gsap.fromTo(
        spanRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 2, ease: "circ.inOut" }
      );
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/users/logout", {}, { withCredentials: true });
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
    localStorage.clear();
  };

  const handleDelete = async (imageId) => {
    try {
      const response = await axios.delete(`/api/images/${imageId}`);
      if (response.status === 200) {
        setImages(images.filter((image) => image._id !== imageId));
      } else {
        console.error("Failed to delete image:", response);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleDownload = async (imageId, filename) => {
    try {
      const response = await axios.get(`/api/images/${imageId}`, {
        responseType: 'blob',
      });


      saveAs(response.data, filename);

    } catch (error) {
      console.error("Error downloading file:", error.response?.data || error.message);
    }
  };



  const handleLogin = () => navigate("/login");
  const handleUpload = () => navigate("/upload");
  const handleRegister = () => navigate("/register");
  const handleHome = () => navigate("/home");

  return (
    <div className="Home w-screen h-screen bg-gray-100 relative">
      <LunchDiningIcon
        style={{ fontSize: "30px" }}
        className="ml-6 mt-5 cursor-pointer text-white absolute"
        onClick={toggleSidebar}
      />
      <div ref={sidebarRef} className="sidebar w-[20%] backdrop-blur-2xl rounded-md py-9 px-8 absolute z-10 h-full transition-all duration-500 ease-in-out -left-full">
        <h1 className="text-white text-4xl font-secondary-font mb-8">
          File <span ref={spanRef} className="text-red-500 inline-block">Drive</span>
        </h1>
        <div className="close absolute right-4 top-10" onClick={toggleSidebar}>
          <CloseIcon className="cursor-pointer text-white text-2xl" />
        </div>
        <div className="Menu flex flex-col gap-y-8">
          <div className="MenuItem flex gap-4 items-center cursor-pointer">
            <HomeIcon className="text-orange-400" />
            <span className="MenuItem text-white font-primary-font font-medium" onClick={handleHome}>Home</span>
          </div>
          <div className="MenuItem flex gap-4 items-center cursor-pointer">
            <BackupIcon className="text-blue-600" />
            <span className="MenuItem text-white font-primary-font font-medium" onClick={handleUpload}>Upload</span>
          </div>
          <div className="MenuItem flex gap-4 items-center cursor-pointer">
            <LoginIcon className="text-green-400" />
            <span className="MenuItem text-white font-primary-font font-medium" onClick={handleLogin}>Login Other Account</span>
          </div>
          <div className="MenuItem flex gap-4 items-center cursor-pointer">
            <HowToRegIcon className="text-emerald-400" />
            <span className="MenuItem text-white font-primary-font font-medium" onClick={handleRegister}>Register Other Account</span>
          </div>
          <div className="MenuItem flex gap-4 items-center cursor-pointer">
            <LogoutIcon className="text-red-600" />
            <span className="MenuItem text-white font-primary-font font-medium" onClick={handleLogout}>Logout</span>
          </div>
        </div>
      </div>
      <div className="Middle">
        <div className="w-full h-full flex gap-12 p-5 flex-wrap pt-20">
          {images.map((image, index) => (
            <div key={index} className="w-[23%] backdrop-blur-lg rounded-lg h-full p-8 border border-1 border-gray-600">
              <img
                src={image.path}
                alt={image.originalName}
                className="w-full h-full object-fill rounded-lg"
              />
              <div className="options flex justify-between mt-4">
                <div className="1 cursor-pointer font-primary-font">
                  <a
                    className="text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDownload(image._id, image.originalName);
                    }}
                    download={image.originalName}
                  >
                    <DownloadIcon style={{ fontSize: "30px", color: "#4d4df7" }} /> Download
                  </a>
                </div>

                <div className="2 cursor-pointer font-primary-font">
                  <a href="#" className="text-white" onClick={() => handleDelete(image._id)}>
                    <DeleteIcon style={{ fontSize: "25px", color: "red" }} /> Delete
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
