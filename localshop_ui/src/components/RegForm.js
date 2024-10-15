import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegForm = () => {
  const [data, setData] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(data).some(field => field.length === 0)) {
      toast.error("All fields are required.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } else if (data.userPassword !== data.confirmPassword) {
      toast.error("Passwords do not match.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } else {
      try {
        const response = await axios.post("http://localhost:4000/api/user/addUser", data);

        if (response.status === 200) {
          toast.success("Registration successful.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          setData({
            userName: '',
            userEmail: '',
            userPassword: '',
            confirmPassword: ''
          });
        }
      } catch (error) {
        toast.error("Registration failed. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="userName"
              value={data.userName}
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
              value={data.userEmail}
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
              value={data.userPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              Register
            </button>
            <a
              href="/LoginForm"
              className="text-pink-600 font-semibold hover:text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              Already have an account? Login here.
            </a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegForm;