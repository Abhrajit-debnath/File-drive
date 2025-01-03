import React, { useState } from "react";
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("File uploaded successfully");
      navigate('/home');
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("File upload failed");
    }
  };

  return (
    <div className="Upload-bg w-screen h-screen flex items-center justify-center">
      <div className="w-[30%] backdrop-blur-xl flex flex-col justify-center items-center p-10 rounded-lg border-gray-600 border">
        <h1 className="mb-5 font-primary-font text-3xl font-extrabold text-white">
          Upload Files Here!
        </h1>
        <DriveFolderUploadRoundedIcon
          style={{ fontSize: "100px", color: "#4d4df7", marginBottom: "20px" }}
        />
        <form className="w-[90%] flex flex-col items-center justify-center" encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:hover:border-gray-500 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-16 h-14 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} name="file" />
          </label>
          <button type="submit" className="bg-blue-600 py-2 px-4 font-secondary-font text-white font-normal hover:bg-blue-700 mr-3 rounded-md mt-10 transition">
            Upload File
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
