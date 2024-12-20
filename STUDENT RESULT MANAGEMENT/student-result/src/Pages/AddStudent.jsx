
import React, { useEffect, useState } from 'react';
import Dashboard from '../Components/Dashboard';
import { useNavigate } from 'react-router-dom';
import img from "../assets/image/bbb.jpg"
const AddStudent = () => {
    const [FullName, setFullName] = useState("");
    const [RollId, setRollId] = useState("");
    const [Gender, setGender] = useState("");
    const [Class, setClass] = useState("");

    const [DOB, setDOB] = useState("");
    const [datas, setDatas] = useState([]);

 const navigate =useNavigate();

    const getAllClasses = async () => {
        try {
            const response = await fetch("/api/getClasses", {
                method: "GET",
                credentials: "include",
            });
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
            setDatas(data);
        } catch (error) {
            console.error("Error fetching class data:", error);
        }
    };

    useEffect(() => {
        getAllClasses();
    }, []);


const handleStudent = async(e)=>{
       e.preventDefault();
    console.log(FullName,RollId,Gender,Class,DOB);

     const student ={
        FullName,
        RollId,
        Gender,
        Class,
        DOB
     }

     try {
        
        const response = await fetch("/api/addStudent",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(student)
        })
         console.log(response);
       const data = await response.json()
       console.log(data);
       
         if(response.ok){
            alert(data.message)
            navigate("/ManageStudent")
         }  else  if(response.status == 409){
            alert(data.message)
         }else  if(response.status == 404){
            alert(data.message)
         }


     } catch (error) {
        console.log(error);
        
     }

     
}
     


    return (
        <>
            <div className="row md:flex md:justify-around align-center">
                <Dashboard />

                <div className="col flex justify-center  w-full bg-cover"style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover'}}>
                    <form  onSubmit={handleStudent}  className="md:w-[700px] w-[370px] bg-[rgba(0,120,205,0.5)] p-5 m-10 h-[430px] md:h-[500px]">
                        <h1 className="text-3xl text-white font-bold my-6">Fill the Student Info</h1>

                      
                        <div className="flex justify-between my-5">
                            <label htmlFor="fullName" className="text-white">
                                Full Name
                            </label>
                            <div>
                                <input
                                    id="fullName"
                                    onChange={(e) => setFullName(e.target.value)}
                                    type="text"
                                    placeholder="Enter Full Name"
                                    required
                                    className="md:w-[500px] w-[250px] h-8 rounded-md pl-3"
                                />
                            </div>
                        </div>

                        {/* Roll ID */}
                        <div className="flex justify-between my-5">
                            <label htmlFor="rollId" className="text-white">
                                Roll ID
                            </label>
                            <div>
                                <input
                                    id="rollId"
                                    onChange={(e) => setRollId(e.target.value)}
                                    type="number"
                                    placeholder="Enter Roll ID"
                                    required
                                    className="md:w-[500px] w-[250px] h-8 rounded-md pl-3"
                                />
                            </div>
                        </div>

                   
                        <div className="flex justify-between my-5 text-white">
                            <label htmlFor="gender">Gender</label>
                            <div className="md:w-[500px] w-[200px]">
                                <input
                                    id="male"
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <label htmlFor="male" className="ml-2">
                                    Male
                                </label>
                                <input
                                    id="female"
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                    className="ml-4"
                                />
                                <label htmlFor="female" className="ml-2">
                                    Female
                                </label>
                            </div>
                        </div>

                    
                        <div className="flex justify-between my-5">
                            <label htmlFor="className" className="text-white">
                                Class Name
                            </label>
                            <select
                                id="className"
                                className="md:w-[500px] w-[250px] h-8"
                                onChange={(e) => setClass( e.target.value)}
                                required
                            >
                                <option value="">Select Class</option>
                                {datas.map((item, index) => (
                                    <option key={index} value={item.className}>
                                        {item.className}
                                    </option>
                                ))}
                            </select>
                        </div>

                   
                        <div className="flex justify-between my-5">
                            <label htmlFor="dob" className="text-white">
                                DOB
                            </label>
                            <input
                                id="dob"
                                type="date"
                                className="md:w-[500px] w-[250px]"
                                onChange={(e) => setDOB(e.target.value)}
                                required
                            />
                        </div>

                        
                        <div className="text-center">
                            <button className="w-14 h-8 bg-green-600 text-white" type="submit">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddStudent;


// import React, { useEffect, useState } from 'react';
// import Dashboard from '../Components/Dashboard';
// import { useNavigate } from 'react-router-dom';

// const AddStudent = () => {
//     const [FullName, setFullName] = useState("");
//     const [RollId, setRollId] = useState("");
//     const [Gender, setGender] = useState("");
//     const [Class, setClass] = useState("");
//     const [DOB, setDOB] = useState("");
//     const [datas, setDatas] = useState([]);
//     const [subjects, setSubjects] = useState([]);
//     const [selectedSubjects, setSelectedSubjects] = useState([]); // Store selected subjects

//     const navigate = useNavigate();

//     // Fetch Classes
//     const getAllClasses = async () => {
//         try {
//             const response = await fetch("http://127.0.0.1:5000/getClasses", {
//                 method: "GET",
//                 credentials: "include",
//             });
//             if (!response.ok) throw new Error(`Error: ${response.statusText}`);
//             const data = await response.json();
//             setDatas(data);
//         } catch (error) {
//             console.error("Error fetching class data:", error);
//         }
//     };

//     // Fetch Subjects
//     const getSubjects = async () => {
//         try {
//             const response = await fetch("http://127.0.0.1:5000/getSubjects", {
//                 method: "GET",
//                 credentials: "include",
//             });
//             if (!response.ok) throw new Error(`Error: ${response.statusText}`);
//             const data = await response.json();
//             setSubjects(data); // Set fetched subjects to state
//         } catch (error) {
//             console.error("Error fetching subjects:", error);
//         }
//     };

//     useEffect(() => {
//         getAllClasses();
//         getSubjects(); // Fetch subjects when the component mounts
//     }, []);

//     // Handle form submission
//     const handleStudent = async (e) => {
//         e.preventDefault();
//         console.log(FullName, RollId, Gender, Class, DOB, selectedSubjects);

//         const student = {
//             FullName,
//             RollId,
//             Gender,
//             Class,
//             DOB,
//             subjectIds: selectedSubjects, // Include selected subjects in the request
//         };

//         try {
//             const response = await fetch("http://127.0.0.1:5000/addStudent", {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(student),
//             });

//             const data = await response.json();
//             console.log(data);

//             if (response.ok) {
//                 alert(data.message);
//                 navigate("/ManageStudent");
//             } else if (response.status === 409) {
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <>
//             <div className="row md:flex md:justify-around align-center">
//                 <Dashboard />

//                 <div className="col flex justify-center bg-[url('./image/5040007.jpg')] w-full bg-cover">
//                     <form onSubmit={handleStudent} className="md:w-[700px] w-[370px] bg-[rgba(0,120,205,0.5)] p-5 m-10 h-[430px] md:h-[500px]">
//                         <h1 className="text-3xl text-white font-bold my-6">Fill the Student Info</h1>

//                         {/* Full Name */}
//                         <div className="flex justify-between my-5">
//                             <label htmlFor="fullName" className="text-white">Full Name</label>
//                             <div>
//                                 <input
//                                     id="fullName"
//                                     onChange={(e) => setFullName(e.target.value)}
//                                     type="text"
//                                     placeholder="Enter Full Name"
//                                     required
//                                     className="md:w-[500px] w-[250px] h-8 rounded-md pl-3"
//                                 />
//                             </div>
//                         </div>

//                         {/* Roll ID */}
//                         <div className="flex justify-between my-5">
//                             <label htmlFor="rollId" className="text-white">Roll ID</label>
//                             <div>
//                                 <input
//                                     id="rollId"
//                                     onChange={(e) => setRollId(e.target.value)}
//                                     type="number"
//                                     placeholder="Enter Roll ID"
//                                     required
//                                     className="md:w-[500px] w-[250px] h-8 rounded-md pl-3"
//                                 />
//                             </div>
//                         </div>

//                         {/* Gender */}
//                         <div className="flex justify-between my-5 text-white">
//                             <label htmlFor="gender">Gender</label>
//                             <div className="md:w-[500px] w-[200px]">
//                                 <input
//                                     id="male"
//                                     type="radio"
//                                     name="gender"
//                                     value="Male"
//                                     onChange={(e) => setGender(e.target.value)}
//                                     required
//                                 />
//                                 <label htmlFor="male" className="ml-2">Male</label>
//                                 <input
//                                     id="female"
//                                     type="radio"
//                                     name="gender"
//                                     value="Female"
//                                     onChange={(e) => setGender(e.target.value)}
//                                     required
//                                     className="ml-4"
//                                 />
//                                 <label htmlFor="female" className="ml-2">Female</label>
//                             </div>
//                         </div>

//                         {/* Class Dropdown */}
//                         <div className="flex justify-between my-5">
//                             <label htmlFor="className" className="text-white">Class Name</label>
//                             <select
//                                 id="className"
//                                 className="md:w-[500px] w-[250px] h-8"
//                                 onChange={(e) => setClass(e.target.value)}
//                                 required
//                             >
//                                 <option value="">Select Class</option>
//                                 {datas.map((item, index) => (
//                                     <option key={index} value={item.className}>
//                                         {item.className}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Subjects Multiselect */}
//                         <div className="flex justify-between my-5">
//                             <label htmlFor="subjects" className="text-white">Select Subjects</label>
//                             <select
//                                 id="subjects"
//                                 multiple
//                                 className="md:w-[500px] w-[250px] h-32"
//                                 onChange={(e) => {
//                                     const selected = Array.from(e.target.selectedOptions, option => option.value);
//                                     setSelectedSubjects(selected);
//                                 }}
//                                 required
//                             >
//                                 {subjects.map((subject, index) => (
//                                     <option key={index} value={subject._id}>
//                                         {subject.SubjectName}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Date of Birth */}
//                         <div className="flex justify-between my-5">
//                             <label htmlFor="dob" className="text-white">DOB</label>
//                             <input
//                                 id="dob"
//                                 type="date"
//                                 className="md:w-[500px] w-[250px]"
//                                 onChange={(e) => setDOB(e.target.value)}
//                                 required
//                             />
//                         </div>

//                         {/* Submit Button */}
//                         <div className="text-center">
//                             <button className="w-14 h-8 bg-green-600 text-white" type="submit">Add</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AddStudent;