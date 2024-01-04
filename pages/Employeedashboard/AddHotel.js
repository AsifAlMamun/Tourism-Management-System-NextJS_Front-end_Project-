import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../Layout/navbar';
import Footer from '../Layout/footer';
import dynamic from 'next/dynamic';

const Title = dynamic(() => import('../Layout/title'), { ssr: false });

export default function AddHotelPackage() {
  const [packageData, setPackageData] = useState({
    HotelName: '',
    Rating: '',
    PriceRange: '',
    Address: '',
    Description: '',
    employeeId: '' // Assuming employeeId is part of the package data
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setPackageData({ ...packageData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addHotelPackage();
      setError('Package added successfully');
      // Optionally, reset form fields after successful submission
      setPackageData({
        HotelName: '',
        Rating: '',
        PriceRange: '',
        Address: '',
        Description: '',
      
      });
    } catch (error) {
      console.error(error);
      setError('An error occurred while adding the package.');
    }
  };

  async function addHotelPackage() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/employee/createhotel`, // Replace with your API endpoint for adding hotel packages
        packageData,
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log(data); // Log the response data if needed
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <>
      <Title page="Add Hotel Package" />
      <NavBar />

      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700">Add Package</h1>
          <br></br>
          <form className="space-y-4" onSubmit={handleSubmit}>
          <input
              type="text"
              name="HotelName"
              value={packageData.HotelName}
              onChange={handleChange}
              placeholder="Hotel Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="Rating"
              value={packageData.Rating}
              onChange={handleChange}
              placeholder="Rating"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="PriceRange"
              value={packageData.PriceRange}
              onChange={handleChange}
              placeholder="Price Range"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="Address"
              value={packageData.Address}
              onChange={handleChange}
              placeholder="Address"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="Description"
              value={packageData.Description}
              onChange={handleChange}
              placeholder="Description"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
        

            {error && <p>{error}</p>}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-5 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Package
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}