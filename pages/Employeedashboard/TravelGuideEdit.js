import dynamic from 'next/dynamic';
import NavBar from '../Layout/navbar';
import Footer from '../Layout/footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Title = dynamic(() => import('../Layout/title'), { ssr: false });

export default function TravelGuideEdit() {
  const [guideData, setGuideData] = useState({
    DestinationName: '',
    Address: '',
    Description: '',
    GuideName: '',
    Contact: '',
    PackageName: '',
    Price: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchGuideData(id);
    }
  }, [id]);

  const fetchGuideData = async (guideId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/allTravelGuide/${guideId}`
      );
      setGuideData(response.data);
    } catch (error) {
      console.error('Error fetching guide data:', error);
    }
  };

  const handleChange = (e) => {
    setGuideData({ ...guideData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateGuide();
      setError('Guide updated successfully');
    } catch (error) {
      console.error(error);
      setError('An error occurred while updating the guide.');
    }
  };

  async function updateGuide() {
    try {
      const formData = new FormData();
      formData.append('DestinationName', guideData.DestinationName);
      formData.append('Address', guideData.Address);
      formData.append('Description', guideData.Description);
      formData.append('GuideName', guideData.GuideName);
      formData.append('Contact', guideData.Contact);
      formData.append('PackageName', guideData.PackageName);
      formData.append('Price', guideData.Price);

      console.log(formData);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/employee/updateTravelguide/${guideData.id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <>
      <Title page="Edit Travel Guide" />
      <NavBar />

      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700">Edit Guide</h1>
          <br></br>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="DestinationName"
              value={guideData.DestinationName}
              onChange={handleChange}
              placeholder="Destination Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="Address"
              value={guideData.Address}
              onChange={handleChange}
              placeholder="Address"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="Description"
              value={guideData.Description}
              onChange={handleChange}
              placeholder="Description"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="GuideName"
              value={guideData.GuideName}
              onChange={handleChange}
              placeholder="Guide Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="Contact"
              value={guideData.Contact}
              onChange={handleChange}
              placeholder="Contact"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="PackageName"
              value={guideData.PackageName}
              onChange={handleChange}
              placeholder="Package Name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="text"
              name="Price"
              value={guideData.Price}
              onChange={handleChange}
              placeholder="Price"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />

            {error && <p>{error}</p>}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-5 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Guide
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

