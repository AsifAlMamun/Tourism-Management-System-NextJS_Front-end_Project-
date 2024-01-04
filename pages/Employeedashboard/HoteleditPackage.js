// import dynamic from 'next/dynamic';
// import NavBar from '../Layout/navbar';
// import Footer from '../Layout/footer';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Title = dynamic(() => import('../Layout/title'), { ssr: false });

// export default function HoteleditPackage() {
//   const [packageData, setPackageData] = useState({
//     HotelName: '',
//     Rating: '',
//     PriceRange: '',
//     Address: '',
//     Description: '',
//     employeeId: ''
//   });
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     if (id) {
//       fetchPackageData(id);
//     }
//   }, [id]);

//   const fetchPackageData = async (packageId) => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/employee/Hotellist/${packageId}`
//       );
//       setPackageData(response.data);
//     } catch (error) {
//       console.error('Error fetching package data:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setPackageData({ ...packageData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await updateData();
//       setError('Package updated successfully');
//     } catch (error) {
//       console.error(error);
//       setError('An error occurred while updating the package.');
//     }
//   };

//   async function updateData() {
//     try {
//       const formData = new FormData();
//       formData.append('HotelName', packageData.HotelName);
//       formData.append('Rating', packageData.Rating);
//       formData.append('PriceRange', packageData.PriceRange);
//       formData.append('Address', packageData.Address);
//       formData.append('Description', packageData.Description);
     

      
//       let data2 = {
//         "HotelName": packageData.HotelName,
//         "Rating": packageData.Rating,
//         "PriceRange": packageData.PriceRange,
//         "Address": packageData.discount,
//         "Description": packageData.Description
//       };

//       console.log(formData);

//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/updatehotel/${packageData.id}`,
//         data2,
//         {
//           withCredentials: true,
//         }
//       );

//       const data = response.data;
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

  // return (
  //   <>
  //     <Title page="Edit Hotel Package" />
  //     <NavBar />

  //     <div className="relative flex flex-col justify-center h-screen overflow-hidden">
  //       <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
  //         <h1 className="text-3xl font-semibold text-center text-purple-700">Edit Package</h1>
  //         <br></br>
  //         <form className="space-y-4" onSubmit={handleSubmit}>
  //           <input
  //             type="text"
  //             name="HotelName"
  //             value={packageData.HotelName}
  //             onChange={handleChange}
  //             placeholder="Hotel Name"
  //             className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  //           />
  //           <input
  //             type="text"
  //             name="Rating"
  //             value={packageData.Rating}
  //             onChange={handleChange}
  //             placeholder="Rating"
  //             className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  //           />
  //           <input
  //             type="text"
  //             name="PriceRange"
  //             value={packageData.PriceRange}
  //             onChange={handleChange}
  //             placeholder="Price Range"
  //             className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  //           />
  //           <input
  //             type="text"
  //             name="Address"
  //             value={packageData.Address}
  //             onChange={handleChange}
  //             placeholder="Address"
  //             className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  //           />
  //           <input
  //             type="text"
  //             name="Description"
  //             value={packageData.Description}
  //             onChange={handleChange}
  //             placeholder="Description"
  //             className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  //           />
        

  //           {error && <p>{error}</p>}
  //           <button
  //             type="submit"
  //             className="w-full flex justify-center py-3 px-5 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //           >
  //             Update Package
  //           </button>
  //         </form>
  //       </div>
  //     </div>

//       <Footer />
//     </>
//   );
// }


import dynamic from 'next/dynamic';
import NavBar from '../Layout/navbar';
import Footer from '../Layout/footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Title = dynamic(() => import('../Layout/title'), { ssr: false });

export default function EditPackage() {
  const [packageData, setPackageData] = useState({
    HotelName: '',
    Rating: '',
    PriceRange: '',
    Address: '',
    Description: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchPackageData(id);
    }
  }, [id]);

  const fetchPackageData = async (packageId) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/employee/Hotellist/${packageId}`);
      setPackageData(response.data);
    } catch (error) {
      console.error('Error fetching package data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData({ ...packageData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateData();
      setError("Package updated successfully");
    } catch (error) {
      console.error(error);
      setError("An error occurred while updating the package.");
    }
  };

  // const updateData = async () => {
  //   try {
  //     const response = await axios.put(
  //       `${process.env.NEXT_PUBLIC_API_ENDPOINT}/employee/updatehotel/${id}`,
  //       packageData,
  //       {
  //         withCredentials: true
  //       }
  //     );

  //     console.log(response.data);
  //     // Handle success if needed
  //   } catch (error) {
  //     console.error('Error updating package:', error);
  //     throw error;
  //   }
  // };
  const updateData = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/employee/updatehotel/${id}`,
        packageData,
        {
          withCredentials: true
        }
      );
  
      console.log(response.data);
      // Handle success if needed
    } catch (error) {
      console.error('Error updating package:', error.response || error);
      throw error;
    }
  };

  return (
    <>
      <Title page="Edit Hotel Package" />
      <NavBar />

      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700">Edit Package</h1>
          <br />
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
              Update Package
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
