import React, { useEffect, useState } from 'react'
import Dashboard from '../Components/Dashboard';
import img1 from  "../assets/image/pexels-moose-photos-170195-1037995.jpg";
import { Link } from 'react-router-dom';
const ManageSubject = () => {
  const [subjectData,setSubjectData] =useState("")

  const getAllSubjects =async()=>{

    const response = await fetch("/api/getSubjects",{
      method:"GET",
      credentials:"include",

    })
    console.log(response);

    const data = await response.json();
    console.log(data);
    setSubjectData(data)
    
    
  }
 
useEffect(()=>{
  getAllSubjects();
},[])

const handleDelete = async (id) => {
  try {
    const response = await fetch(`/api/deleteSubject/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      alert("Subject combination deleted successfully!");
      getAllSubjects();
    } else {
      alert("Failed to delete the subjects");
    }
  } catch (error) {
    console.log(error);
    alert("An error occurred while deleting the subject combination.");
  }
};
  return (
    <>
         <div className="row md:flex md:justify-around align-center">

 
       <Dashboard/>
    
        <div className="col w-full" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover'}}>
            <h1 className="text-3xl font-bold my-5  ml-12 text-[#024550]">MANAGE SUBJECTS</h1>
            <table className="border border-2 m-auto bg-[rgba(255,255,255,0.8)] mt-20 shadow-md shadow-black-600 ">
              <thead>
              <tr>
                    <th className="text-center p-5 border">Sl No</th>
                    <th className="text-center p-5 border">Subject Name</th>
                    <th className="text-center p-5 border">Subject Code</th>
                    <th className="text-center p-5 border">Creation Date</th>
                    <th className="text-center p-5 border">Action</th>
                
                </tr>
              </thead>
            
              <tbody>
                { subjectData.length>0?(subjectData.map((item,index)=>(

                         <tr key={index}>
                         <td className="text-center p-5 border">{index+1}</td>
                         <td className="text-center p-5 border">{item.SubjectName}</td>
                         <td className="text-center p-5 border">{item.SubjectCode}</td>
                         <td className="text-center p-5 border">{item.Date}</td>
                         <td className="text-center p-5 border flex justify-between">
                             <Link to={`/UpdateSubject/${item._id}`} className='bg-orange-600 text-white p-1 mr-3' >Update</Link>
                             <button onClick={()=>handleDelete(item._id)} className='bg-rose-700 text-white p-1 mr-3'>Delete</button>
                           </td>
                     </tr>
                ))):(
                  <tr>
                    <td colSpan="5" className="text-center p-5 border">No subjects available</td>
                  </tr>
                )
                 
                }
              </tbody>
             
    

            </table>
        </div>
        </div>
    </>
  )
}

export default ManageSubject
