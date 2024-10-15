import React from 'react';

const ContactUs = () => {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-pink-50">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-pink-700">Contact Us</h1>
      <div className="flex flex-wrap -mx-4 mb-8">
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <h2 className="text-2xl font-semibold mb-2 text-pink-600">Address</h2>
          <p className="text-gray-700">123 Main St, Nairobi, Kenya 00100</p>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <h2 className="text-2xl font-semibold mb-2 text-pink-600">Phone</h2>
          <p className="text-gray-700">0715469527</p>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <h2 className="text-2xl font-semibold mb-2 text-pink-600">Email</h2>
          <p className="text-gray-700">maryjanemugweru@gmail.com</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-3xl font-semibold mb-4 text-center text-pink-700">Feedback Form</h2>
        <form className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-800 text-sm font-medium mb-2">
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-800 text-sm font-medium mb-2">
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="email"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-800 text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Message"
              ></textarea>
              <p className="text-red-500 text-xs italic">Please enter a valid message.</p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white font-bold py-2 px-6 rounded-lg shadow-md"
              type="button"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

