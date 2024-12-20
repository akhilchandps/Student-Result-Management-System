import React, { useState } from 'react'
import Dashboard from '../Components/Dashboard';
import img1 from "../assets/image/background-2354151_1280.jpg";
import { useNavigate } from 'react-router-dom';

const CreateSubject = () => {
  // SubjectName, SubjectCode, Date 
const navigate =useNavigate()

  const [SubjectName,setSubjectName] =useState("")
  const [SubjectCode,setSubjectCode] =useState("")
  const [Date,setDate] =useState("")

 //add subject
   const handleSubject = async(e)=>{
   e.preventDefault();
    console.log();
    const newSubject ={
      SubjectName,
      SubjectCode,
      Date
    }

     try {
      const response = await fetch("/api/createSubject",{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(newSubject)
      })
  
      console.log(response);
      const data = await response.json()
      if(response.ok){
        alert(data.message)
        navigate("/ManageSubject")
      }else if(response.status == 400){
        alert(data.message)
      }
     } catch (error) {
      console.log(error);
      
     }
    
    
   }


  

  return (
    <>
          <div className="row md:flex md:justify-around align-center">

       <Dashboard/>

          
        <div className="col w-full md:h-[760px]   h-[600px] flex justify-center text-white  " style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover'}} >
         
            <form onSubmit={handleSubject} className="rounded-md md:w-8/12 w-[380px] bg-[rgba(0,0,0,0.8)] mt-24  p-10 md:h-[360px] h-[400px] backdrop-blur-sm">
            <h1 className="text-2xl font-bold">Create Subjects</h1>
            <div className="flex justify-between my-5" > 
                <label for="">Subject Name</label>
                <div>
                  <input onChange={(e)=>setSubjectName(e.target.value)} type="text" placeholder="Subject Name " required className="h-8 md:w-96 w-52 pl-3 text-black"/>
                </div>
            </div>
           
            <div className="flex justify-between my-8">
                <label for="">Subject Code</label>
                <div>
                  <input onChange={(e)=>setSubjectCode(e.target.value)} type="text" placeholder="Subject Code" required  className="text-black h-8 md:w-96 w-52 pl-3 "/>
                </div>
  
            </div>
            <div className="flex justify-between my-8">
                <label for="">Date</label>
                <div>
                  <input onChange={(e)=>setDate(e.target.value)} type="date"  placeholder="Subject Code" required  className="text-black h-8 md:w-96 w-52 pl-3 "/>
                </div>
  
            </div>
            
              <div className="flex justify-between">
                 <div></div>
                <button type="submit" className="bg-green-600 text-white p-2">submit<i className="fa-solid fa-check ml-3"></i></button>
              </div>
            </form>
        </div>
        </div>
    </>
  )
}

export default CreateSubject
