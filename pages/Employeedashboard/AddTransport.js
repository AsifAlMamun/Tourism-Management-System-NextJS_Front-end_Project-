// 
import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../Layout/navbar';
import Footer from '../Layout/footer';
import dynamic from 'next/dynamic';

const Title = dynamic(() => import('../Layout/title'), { ssr: false });

export default function AddTransport() {
  const [packageData, setPackageData] = useState({
    name: '',
    description: '',
    capacity: '',
    availability: true,
    cost: '',
    departurePoint: '',
    arrivalPoint: '',
    schedule: '',
    facilities: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setPackageData({ ...packageData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addTreansportPackage(); // Corrected function name
      setError('Package added successfully');
      setPackageData({
        name: '',
        description: '',
        capacity: '',
        availability: true,
        cost: '',
        departurePoint: '',
        arrivalPoint: '',
        schedule: '',
        facilities: ''
      });
    } catch (error) {
      console.error(error);
      setError('An error occurred while adding the package.');
    }
  };

  async function addTreansportPackage() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/employee/createtransport`,
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
      <Title page="Add Transport Package" />
      <NavBar />

      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700">Add Package</h1>
          <br></br>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={packageData.name}
              onChange={handleChange}
              placeholder="Package Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="description"
              value={packageData.description}
              onChange={handleChange}
              placeholder="Description"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="number"
              name="capacity"
              value={packageData.capacity}
              onChange={handleChange}
              placeholder="Capacity"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
              <input
              type="bool"
              name="availability"
              value={packageData.availability}
              onChange={handleChange}
              placeholder="availability"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
              <input
              type="text"
              name="departurePoint"
              value={packageData.departurePoint}
              onChange={handleChange}
              placeholder="departurePoint"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
              <input
              type="text"
              name="arrivalPoint"
              value={packageData.arrivalPoint}
              onChange={handleChange}
              placeholder="arrivalPoint"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
              <input
              type="text"
              name="schedule"
              value={packageData.schedule}
              onChange={handleChange}
              placeholder="schedule"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
             <input
              type="text"
              name="facilities"
              value={packageData.facilities}
              onChange={handleChange}
              placeholder="facilities"
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
