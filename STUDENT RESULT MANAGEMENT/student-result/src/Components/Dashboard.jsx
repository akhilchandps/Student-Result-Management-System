import React, { useEffect, useState } from 'react';
import cartoon from "../assets/image/3d-cartoon-portrait-person-practicing-law-related-profession.jpg";
import { Link } from 'react-router-dom';
import "../Components/Dashboard.css";

const Dashboard = () => {

  const [user,setUser] =useState("")
  

  const fetchUser = async()=>{

    const res = await fetch("/api/viewUsername",{
      method:"GET",
      credentials:"include"
    })
    console.log(res);
    const data = await res.json()
    console.log(data);
    setUser(data)
    
    
  }
 useEffect(()=>{
     fetchUser();
 },[])


  const handleLogout = async () => {
    try {
       const res = await fetch("/api/logout", {
          method: "POST", 
          credentials: "include", 
       });
 
       if (res.ok) {
          const data = await res.json();
          alert(data.message || "Logged out successfully!");
        
           window.location.href = "/login";
       } else {
          console.error("Logout failed");
          alert("Failed to log out. Please try again.");
       }
    } catch (error) {
       console.error("Error logging out:", error);
       alert("An unexpected error occurred. Please try again later.");
    }
 };
 
  useEffect(()=>{

  
   
 
  },[])
  return (
    <>
      
      <div className="col md:w-96 w-full  bg-[#024550] md:h-[115vh] h-[600px]">
            <div className="flex md:justify-between justify-center md:mt-14 mb-5 w-[165px] md:m-5">
              <div className="w-12">
                <img src={cartoon} className="w-full rounded-full" alt=""/>
              </div>
              <Link to="/dashboard" className="text-3xl font-bold text-center text-sky-500">{user}</Link>
            </div> 
            <hr/>
            <div className="dropdown flex flex-col items-center md:flex-row">
              <button className="dropbtn md:text-xl text-sm font-bold  text-white "><i className="fa-solid fa-landmark mx-5 text-white"></i>Student className</button>
              <div className="dropdown-content">
                <div>
                  <Link to="/CreateClass ">Create className</Link>
                </div>
                <div className="top">
                  <Link to="/ManageClass">Manage classNames</Link>
                </div>
              
              </div>
            </div>
  
            <div className="dropdown   flex flex-col items-center md:flex-row">
              <button className="dropbtn  md:text-xl text-sm  font-bold  text-white "><i className="fa-solid fa-book graduate  mx-5 text-white"></i>Subjects</button>
              <div className="dropdown-content">
                <div>
                  <Link to="/CreateSubject">Create Subject</Link>
                </div>
                <div className="top">
                  <Link to="/ManageSubject">Manage Subjects</Link>
                </div>
                <div className="top">
                    <Link to="/SubjectCombo">Add Subject Combination</Link>
                  </div>
                  <div className="top">
                    <Link to="/ManageSubCombo">Manage Subject Combination</Link>
                  </div>
              
              </div>
            </div>
  
  

            <div className="dropdown flex flex-col items-center md:flex-row">
              <button className="dropbtn  md:text-xl text-sm  font-bold  text-white "><i className="fa-solid fa-users mx-5 text-white"></i>Students</button>
              <div className="dropdown-content p-2">
                <div>
                  <Link to="/AddStudent">Add Student</Link>
                </div>
                <div className="top">
                  <Link to="/ManageStudent">Manage Students</Link>
                </div>
          
              
              </div>
            </div>
  
                
                   <div className="dropdown flex flex-col items-center md:flex-row">
                    <button className="dropbtn  md:text-xl text-sm  font-bold  text-white "><i className="fa-solid fa-graduation-cap mx-5 text-white"></i>Results</button>
                    <div className="dropdown-content">
                      <div>
                        <Link to="/AddResult">Add Result</Link>
                      </div>
                      <div className="top">
                        <Link to="/ManageResult">Manage Results</Link>
                      </div>
                    
                    </div>
                  </div>
{/*   
                  <div className="dropdown md:w-52 flex flex-col items-center md:flex-row">
                    <button className="dropbtn  md:text-xl text-sm  font-bold  text-white"><i className="fa-solid fa-lock mr-3"></i><Link to="/AdminChangePwd">Admin Change Password</Link></button>
                  </div>   */}
    
                  <div className="dropdown md:w-52 flex flex-col items-center md:justify-center  md:flex-row">
                    <button onClick={handleLogout} className="dropbtn  md:text-xl text-sm  font-bold  text-white"><i className="fa-solid fa-right-from-bracket mr-3"></i><Link to="/login">LogOut</Link></button>
                  </div>  


          </div>
    </>
  )
}

export default Dashboard
