import React from "react";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Homescreen from "./components/Home/Homescreen";
import AuthProvider from "./Context/Authprovider";
import PrivateRoute from "./components/Auth/Privateroute";
import Homepage from "./components/User/Homepage";
import Upload from "./components/User/Upload";

function App() {
  const registerData = "Sign Up Page";
  const loginData = "Log In Page";

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/home" element={<PrivateRoute><Homepage /></PrivateRoute>} />
            <Route path="/signup" element={<Register registerData={registerData} />} />
            <Route path="/login" element={<Login loginData={loginData} />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </Router>
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
