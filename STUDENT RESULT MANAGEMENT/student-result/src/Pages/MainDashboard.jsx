import React, { useEffect, useState } from 'react';
import Dashboard from '../Components/Dashboard'
import img1 from "../assets/image/377105-PBR732-669.jpg"
import img2 from "../assets/image/creative-7581718_1920.jpg"
import img3 from "../assets/image/creative-7581718_1920.jpg"
import img4 from "../assets/image/texture-7515225_1920.jpg"
const MainDashboard = () => {

const [subject,setSubjects] = useState([])

const [classes,setClass] = useState([])

const [result,setResult] = useState([])

const [users,setUser] = useState([])


  const getAllSubjects =async()=>{

    const response = await fetch("/api/getSubjects",{
      method:"GET",
      credentials:"include",

    })
    console.log(response);

    const data = await response.json();
    console.log(data);
    setSubjects(data)
    
    
  }
  const getAllclassName = async () => {
    const response = await fetch("/api/getClasses", {
      method: "GET",
      credentials:"include"
    });
    console.log(response);
    
    const data = await response.json();
    console.log(data);
   setClass(data)
  };

  const getAllResult = async () => {
    const response = await fetch("/api/getAllresult", {
      method: "GET",
      credentials:"include"
    });
    console.log(response);
    
    const data = await response.json();
    console.log(data);
   setResult(data)
  };

  const getAllUsers = async () => {
    const response = await fetch("/api/getAllUsers", {
      method: "GET",
      credentials:"include"
    });
    console.log(response);
    
    const data = await response.json();
    console.log(data);
   setUser(data)
  };

useEffect(()=>{
  getAllSubjects();
  getAllclassName();
  getAllResult();
  getAllUsers();
},[])

  return (
    <div>
        <div className="row md:flex md:justify-around align-center">
       
          <Dashboard/>
       
       
          
        <div className="col w-full" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover'}} >
            <h1 className="md:text-4xl text-2xl text-white font-bold py-5 ml-10">DashBoard</h1>
             <div className="roww md:flex  md:justify-center  md:mx-20 ">
                <div className="coll md:w-3/6 w-[300px] h-52 text-white md:text-2xl text-xl md:mr-12 m-auto  " style={{ backgroundImage: `url(${img4})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <ul className="flex flex-col">
                    <li className="font-bold flex text-3xl  justify-end mt-12 mr-5">{users.length-1}</li>
                    <li className="font-bold flex justify-end mt-12 mr-5">Reg Users</li>
                  </ul>
                </div>

                <div className="coll md:w-3/6 w-[300px] h-52 text-white md:text-2xl text-xl   m-auto  " style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <ul>
                    <li className="font-bold flex text-3xl  justify-end mt-12 mr-5 obj">{subject.length}</li>
                    <li className="font-bold flex justify-end mt-12 mr-5 obj">Subjects Listed</li>
                  </ul>
             </div>
             </div>


             <div className="roww md:flex md:justify-center mt-5 md:mx-20 ">

                <div className="coll  md:w-3/6 w-[300px] h-52 text-white md:text-2xl text-xl  md:mr-12 m-auto bg-cover"  style={{ backgroundImage: `url(${img3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <ul>
                    <li className="font-bold flex text-3xl justify-end mt-12 mr-5">{classes.length}</li>
                    <li className="font-bold flex justify-end mt-12 mr-5">Total className Listed</li>
                  </ul>
                  </div>
                <div className="coll bg-[url(https://cdn.pixabay.com/photo/2016/02/03/16/55/background-1177450_640.jpg)] md:w-3/6 w-[300px] h-52 text-white md:text-2xl text-xl  m-auto ">
                  <ul>
                    <li className="font-bold flex text-3xl  justify-end mt-12 mr-5">{result.length}</li>
                    <li className="font-bold flex justify-end mt-12 mr-5">Results decalred</li>
                  </ul>
                </div>        
             </div>

        </div>
          </div>
      
          

        </div>

  )
}

export default MainDashboard
