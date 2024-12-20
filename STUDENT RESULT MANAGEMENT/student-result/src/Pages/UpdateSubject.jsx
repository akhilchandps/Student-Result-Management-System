import React, { useEffect, useState } from 'react'
import Dashboard from '../Components/Dashboard'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateSubject = () => {
  const navigate =useNavigate()
    const {id} = useParams();
    console.log(id);
    const [SubjectName,setSubjectName] =useState("")
    const [SubjectCode,setSubjectCode] =useState("")
    const [Date,setDate] =useState("")

    const getSubject = async()=>{

      const response = await fetch(`/api/getSubjects/${id}`,{
        method:"GET",
        credentials:"include"
      })
      console.log(response);
      const data = await response.json();
      console.log(data);
    

      setSubjectName(data.SubjectName || '')
      setSubjectCode(data.SubjectCode || '')
      setDate(data.Date || '')
      
      
      
    }
     useEffect(()=>{
      getSubject();
     },[id])

 
  const handleUpdateSubject = async(e)=>{
     e.preventDefault();
     const updateSubjects={
      SubjectName,
      SubjectCode,
      Date
     }
     try {
      const response = await fetch(`/api/updateSubject/${id}`,{
        method:"PUT",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(updateSubjects)
       })
  
       console.log(response);
       const data = await response.json();
       console.log(data);
  
       if(response.ok){
        alert(data.message)
        navigate("/ManageSubject")
       }else if(response.status == 401)
       {
        alert(data.message)
       }
       
     } catch (error) {
       console.log(error);
       
     }
     
     
    
  }

  return (

     


    <>
        <div class="row md:flex md:justify-around align-center">
            
       <Dashboard/>
  


      <div class="col w-full  md:h-[626px] flex justify-center text-white  bg-[url(./image/background-2354151_1280.jpg)] bg-cover " >
         
         <form onSubmit={handleUpdateSubject} class="rounded-md md:w-8/12 w-[370px] bg-[rgba(0,0,0,0.8)] md:mt-24  mt-12 m-3  p-10   md:h-[350px] backdrop-blur-sm">
         <h1 class="text-2xl font-bold ">Update Subjects</h1>
         <div class="flex justify-between my-5" > 
             <label for="">Subject Name</label>
             <div>
               <input onChange={(e)=>setSubjectName(e.target.value)} id="subjectName" value={SubjectName} type="text" placeholder="Subject Name " required class="h-8 md:w-96 w-52 pl-3 text-black"/>
             </div>
         </div>
        
         <div class="flex justify-between my-8">
             <label for="">Subject Code</label>
             <div>
               <input onChange={(e)=>setSubjectCode(e.target.value)} value={SubjectCode} type="text" placeholder="Subject Code" required  class="h-8 md:w-96 w-52 pl-3  text-black"/>
             </div>
 
         </div>
         <div class="flex justify-between my-8">
             <label for="">Date</label>
             <div>
               <input onChange={(e)=>setDate(e.target.value)} value={Date} type="text" placeholder="Subject Code" required  class="h-8 md:w-96 w-52 pl-3  text-black"/>
             </div>
 
         </div>
         
           <div class="flex justify-between">
              <div></div>
             <button type="submit" class="bg-green-600 text-white p-2">Update<i class="fa-solid fa-check font-bold ml-3"></i></button>
           </div>
         </form>
     </div>
      </div>
    </>
  )
}

export default UpdateSubject
