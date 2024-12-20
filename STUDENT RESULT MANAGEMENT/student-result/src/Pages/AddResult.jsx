import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import img1 from "../assets/image/result-3236285_1280.jpg";

const AddResult = () => {
  const [allStudent, setAllStudent] = useState([]);
  const [rollid, setRollId] = useState("");
  const [newClass,setNewClass] = useState("");
  const [newName,setNewName] = useState("");
  const [newSubjects,setNewSubjects] = useState([]);
  const [marks, setMarks] = useState({}); 
  

  const getAllStudents = async () => {
    try {
      const res = await fetch("/api/getStudents", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setAllStudent(data);
      } else {
        console.error("Failed to fetch students:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };


  const getOneStudent = async (id) => {
    if (!id) return; 
    try {
      const res = await fetch(`/api/getStudent/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Selected Student:", data);
        setNewClass(data.Class)
        setNewName(data.FullName)
      } else {
        console.error("Failed to fetch student:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching student by Roll ID:", error);
    }
  };


  const getSubjects =async(id)=>{

   const response = await fetch(`/api/getSubjectClass/${id}`,{
      method:"GET",
      credentials:"include"
   })
   console.log(response);
   const data = await response.json()
   console.log(data);
   setNewSubjects(data)

   
   
  }

  useEffect(() => {
    getAllStudents();
  }, []);


  useEffect(() => {
    getOneStudent(rollid);
  }, [rollid]);


  useEffect(() => {
   getSubjects(newClass)
 }, [newClass]);

   // Handle marks input
   const handleMarksChange = (subject, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [subject]: value,
    }));
  };


  // Submit the result
  const handleResult = async (e) => {
    e.preventDefault();
    const resultPayload = {
      RollId: rollid,
      Class: newClass,
      FullName: newName,
      Marks: Object.entries(marks).map(([subject, score]) => ({
        subject,
        score: parseInt(score),
      })),
    };

    try {
      const res = await fetch(`/api/addResult`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultPayload),
      });
        
      console.log(res);
      const data = await res.json();
      console.log(data);
      
      
       
      if (res.ok) {
        alert("Result declared successfully!");
        setMarks({}); // Reset marks
      } else if(res.status == 409){
        console.error("Failed to declare result:", res.statusText);
        alert(data.message);
      }else if(res.status == 400){
        alert(data.message)
      }
    } catch (error) {
      console.error("Error declaring result:", error);
      alert("Error declaring result.");
    }
  };






  return (
    <>
      <div className="row md:flex md:justify-around align-center">
        <Dashboard />
        <div
          className="col flex justify-center w-full"
          style={{ backgroundImage: `url(${img1})`, backgroundSize: "cover" }}
        >
          <form onSubmit={handleResult}
            className="w-[670px] bg-[rgba(255,255,255,0.8)] p-5 h-[570px] mt-14"
          >
            <h1 className="text-3xl font-bold text-[#024550]">Declare Result</h1>

            {/* Roll ID Dropdown */}
            <div className="flex justify-between my-5">
              <label htmlFor="rollid">Roll ID</label>
              <select
                id="rollid"
                className="w-[500px] h-8"
                onChange={(e) => setRollId(e.target.value)} // Set Roll ID on change
              >
                <option value="">Select</option>
                {allStudent.length > 0 &&
                  allStudent.map((item, index) => (
                    <option value={item.RollId} key={index}>
                      {item.RollId}
                    </option>
                  ))}
              </select>
            </div>

            {/* Additional Fields */}
            <div className="flex justify-between my-5">
              <label htmlFor="classname">Class Name</label>
              <select id="classname" className="w-[500px] h-8">
                <option value="">Select</option>{
                  rollid &&  <option value=""> {newClass}</option>
                }
              
              </select>
            </div>

            <div className="flex justify-between my-5">
              <label htmlFor="studentname">Student Name</label>
              <select id="studentname" className="w-[500px] h-8">
              <option value="">Select Student</option>
               { rollid &&
                  <option value="">{newName}</option>}
              </select>
            </div>

            <div className="flex justify-between my-5">
              <label htmlFor="">Subjects</label>
              <div>
               {   
                rollid && newSubjects.map((item,index)=>(
                  <div className="my-5" key={index}>
                  <p>{item.subject}</p>
                  <input
                    type="number"
                    placeholder="Enter marks out of 100"
                    className="w-[500px] h-8"
                    onChange={(e) =>
                      handleMarksChange(item.subject, e.target.value)
                    }
                  />
                </div>
                ))
                
               }
              </div>
            </div>

            <div className="my-5 flex justify-end">
              <button type="submit" className="bg-blue-500 text-white px-3 py-2">
                Declare Result
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddResult;
