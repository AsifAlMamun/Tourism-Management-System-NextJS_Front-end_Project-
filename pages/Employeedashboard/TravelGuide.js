
import Link from "next/link";
import dynamic from 'next/dynamic'
import NavBar from "../Layout/navbar";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
 
 
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})
 
 
export default function TravelGuide() {
  const [jsonData, setJsonData] = useState(null);
   
  useEffect(() => {
    fetchData();
  }, []);
 
  async function fetchData() {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + "/employee/allTravelGuide", {
        withCredentials: true
      });
      
      const jsonData = response.data;
      console.log(jsonData)
      setJsonData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }
  /*
  const handleEditClick = (id) => {
    // Redirect to the edit page with the specific ID
    // Example: If using Next.js router
    router.push(`/TravelGuideEdit/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      // Make a DELETE request to your API endpoint with the specific ID
      await axios.delete(`deleteGuide/${id}`);
      // After successful deletion, update the data
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };*/
  const router = useRouter();
  const handleAddClick = () => {
    router.push(`/Employeedashboard/AddTravelGuide`);
  };
  const handleEditClick = (guideId) => {
    router.push(`/Employeedashboard/TravelGuideEdit?id=${guideId}`);
  };
 
  const handleDeleteClick = async (packageId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this package?");
    if (isConfirmed) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/employee/deleteGuide/${packageId}`, { withCredentials: true });
       
        fetchData();
      } catch (error) {
        console.error('Error deleting package:', error);
      }
    }
  }

  
 
  return (
    <>
      <Title page="Dashboard" />
      <NavBar />
      <h1 className="text-2xl font-bold text-gray-800 mt-5 mb-3 text-center">
        All TravelGuide Packages
      </h1>
      <br />
      <br />
      {jsonData && jsonData.result ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
              <th>id</th>
       <th>Destination Name</th>
       <th>Address</th>
       <th>Description</th>
       <th>Guide Name</th>
       <th>Contact</th>
       <th>Package Name</th>
       <th>Price</th>
      
                
              </tr>
            </thead>
            <tbody>
              {jsonData.result.map((item, index) => (
                <tr className="hover" key={item.id}>
                 <th>{index + 1}</th>
                  <td>{item.DestinationName}</td>
                  <td>{item.Address}</td>
                  <td>{item.Description}</td>
                  <td>{item.GuideName}</td>
                  <td>{item.Contact}</td>
                  <td>{item.PackageName}</td>
                  <td>{item.Price}</td>
                  <td>
                  <button className="btn btn-sm btn-outline btn-primary" onClick={() => handleAddClick(item.id)}>
                  Add
                  </button> |
                <button className="btn btn-sm btn-outline btn-primary" onClick={() => handleEditClick(item.id)}>
                  Edit
                </button> |  <button className="btn btn-sm btn-outline btn-error" onClick={() => handleDeleteClick(item.id)}>
                  Delete
                  </button>
                </td>
                </tr>
                
              ))}
              
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </>
  )
}

 