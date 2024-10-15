import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [data, setData] = useState({
    userName: '',
    userEmail: '',
    userPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const login = () => {
    console.log("User has logged in");
  };

  const refreshToken = async () => {
    return "new_access_token";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.userName.length === 0 || data.userEmail.length === 0 || data.userPassword.length === 0) {
      toast.error("All fields are required.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/user/loginUser", data);

      if (response.status === 200) {
        const { accessToken, refreshToken, roleID } = response.data;

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('roleID', roleID);

        login();
        window.location.reload();
      } else if (response.status === 401) {
        const newAccessToken = await refreshToken();
        
        if (newAccessToken) {
          await handleSubmit(e);
        } else {
          toast.error("Invalid Username/Password");
        }
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="userName"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="userEmail"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="userPassword"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <Link to="/RegForm" className="text-pink-600 font-semibold hover:text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500">Don't have an account? Sign up here.</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
