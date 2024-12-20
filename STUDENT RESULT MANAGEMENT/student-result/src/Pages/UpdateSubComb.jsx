import React, { useEffect, useState } from 'react';
import Dashboard from '../Components/Dashboard';
import img1 from "../assets/image/background-2354151_1280.jpg";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateSubComb = () => {
  const [allSubject,SetAllSubjects]=useState([])
  const [subject,setSubject] = useState("")
  const [classes,setClass] = useState("")

  const [allClasses, setClasses] = useState([]);
  const navigate=useNavigate();
  const getAllclassName = async () => {
    const response = await fetch("/api/getClasses", {
      method: "GET",
      credentials:"include"
    });
    console.log(response);
    
    const data = await response.json();
    console.log(data);
    setClasses(data)
  };




  const getAllSubjects =async()=>{

    const response = await fetch("/api/getSubjects",{
      method:"GET",
      credentials:"include",

    })
    console.log(response);

    const data = await response.json();
    console.log(data);
    SetAllSubjects(data)
  
    
    
  }

   const {id} = useParams();
   console.log(id);
   
   const getOneSubcombo = async () => {
    try {
      const res = await fetch(`/api/getOneSubComb/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setSubject(data.subject);
        setClass(data.class);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

     useEffect(()=>{
      getAllclassName();
      getOneSubcombo();
      getAllSubjects();
     },[id])


   const handleUpdate = async(e)=>{

  e.preventDefault();
  const newUpdate ={
    className:classes, 
    subjectName:subject
  }
try {
  const res = await fetch(`/api/UpdateAddSubjectCombination/${id}`,{
    method:"PATCH",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(newUpdate)
  })
  console.log(res);
  const data = await res.json();
  console.log(data);
  if(res.ok){
    alert(data.message)
    navigate("/ManageSubCombo")
  }else{
    console.error("Failed to fetch data");
  }
} catch (error) {
  console.error("Error fetching data:", error);
}
    

      
        
        

   }  

  return (
    <>
          <div className="row md:flex md:justify-around align-center">
      <Dashboard />
      <div className="col w-full flex justify-center text-white" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover' }}>
        <form  onSubmit={handleUpdate}  className="rounded-md md:w-8/12 w-[380px] bg-[rgba(0,0,0,0.8)] mt-24 p-10 md:h-[300px] h-[400px] backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white">Update Subject Combination</h1>
          <div className="flex justify-between my-5">
            <label htmlFor="className">Class</label>
            <div>
              <select
                id="className"
                className="h-8 md:w-96 w-52 pl-3 text-black"
                onChange={(e)=>setClass(e.target.value)}
                value={classes}
              >
                <option value="">Select Class</option>
                {
                  allClasses && (allClasses.map((item,index)=>(
                    <option key={index} value={item.className}>{item.className}</option>

                  )))
                }
              
              </select>
            </div>
          </div>

          <div className="flex justify-between my-8">
            <label htmlFor="subjectName">Subject Name</label>
            <div>
              <select
                id="subjectName"
                className="h-8 md:w-96 w-52 pl-3 text-black" value={subject} 
                onChange={(e) => setSubject(e.target.value)} >
                <option value="">Select Subject</option>
                {allSubject.map((sub, index) => (
                    <option key={index} value={sub.SubjectName}>
                      {sub.SubjectName}
                    </option>
                  ))}
                
              
              </select>
            </div>
          </div>

          <div className="flex justify-between">
            <div></div>
            <button type="submit" className="bg-green-600 text-white p-2">
              Update <i className="fa-solid fa-check ml-3"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default UpdateSubComb
