import React, { useState } from 'react';
import Dashboard from '../Components/Dashboard';
import img1 from "../assets/image/pexels-nietjuh-2008145.jpg";
import { useNavigate } from 'react-router-dom';

const CreateClass = () => {
 
  // "className":"Tenth",
  // "classNumeric":"10",
  // "Section":"A",
  // "Date":"23-04-24"
const navigate =useNavigate('');
const [className,setClassName]=useState('')
const [classNumeric,setClassNumeric]=useState('')
const [Date,setDate]=useState('')



const handleClass=async(e)=>{
 
  e.preventDefault();
  console.log(className,classNumeric,Date);
  const newClass={
    className,
    classNumeric,
    Date
  }
  const response = await fetch("/api/createClass",{
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
   },
   body:JSON.stringify(newClass)
  })
   console.log(response.status);
   const data = await  response.json()
   if(response.status ==201){
    alert(data.message)
    navigate('/ManageClass')

   }else if(response.status == 403){
    alert(data.message)

   }else if(response.status == 401){
    alert(data.message)
   }
   

}
 




  return (
    <>
      <div className="row md:flex md:justify-around align-center">
        <Dashboard />

        <div
          className="col w-full flex justify-center text-white"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
          }}
        >
          <form
            onSubmit={handleClass}
            className="rounded-md md:w-2/4 w-[350px] bg-[rgba(0,0,0,0.8)] mt-20 p-10 h-[530px] backdrop-blur-sm"
          >
            <h1 className="text-2xl font-bold">Create Student Class</h1>
            <label>Class Name</label>
            <div className="my-3">
              <input
                onChange={(e) => setClassName(e.target.value)}
                type="text"
                placeholder="class"
                required
                className="h-8 w-full pl-3 text-black"
              />
              <p className="text-gray-500">Example: Third, Fourth</p>
            </div>
            <label>Class Name in Numeric</label>
            <div className="my-3">
              <input
                onChange={(e) => setClassNumeric(e.target.value)}
                type="text"
                placeholder="class"
                required
                className="h-8 w-full pl-3 text-black"
              />
              <p className="text-gray-500">E.g., 2, 3, 4, 5</p>
            </div>
          
            <label>Date</label>
            <div className="my-3">
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                required
                className="h-8 w-full pl-3 text-black"
              />
            </div>
            <div>
              <button type="submit" className="bg-green-600 text-white p-2">
                Submit <i className="fa-solid fa-check"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateClass;
