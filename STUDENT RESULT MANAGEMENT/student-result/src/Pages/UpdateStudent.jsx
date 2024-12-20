import React, { useEffect, useState } from 'react';
import Dashboard from '../Components/Dashboard';
import {useNavigate, useParams } from 'react-router-dom';

const UpdateStudent = () => {

    const navigate = useNavigate();
    const [data2, setData2] = useState([]);
    const [FullName, setFullName] = useState('');
    const [RollId, setRollId] = useState('');
    const [Gender, setGender] = useState('');
    const [Class, setClass] = useState('');
    const [DOB, setDOB] = useState('');

    const { id } = useParams();

    // Fetch student details
    const getStudentDetails = async () => {
        try {
            const response = await fetch(`/api/getStudent/${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data);

            // Set individual states from fetched data
            setFullName(data.FullName || '');
            setRollId(data.RollId || '');
            setGender(data.Gender || '');
            setClass(data.Class || '');
            setDOB(data.DOB || '');
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };

    // Fetch all classes
    const getAllClasses = async () => {
        try {
            const response = await fetch('/api/getClasses', {
                method: 'GET',
                credentials: 'include',
            });
            const sdata = await response.json();
            setData2(sdata);
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
    };

    useEffect(() => {
        getStudentDetails();
        getAllClasses();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
      console.log(FullName,RollId,Gender,Class,DOB);
      
        const updatedData = {
            FullName,
            RollId,
            Gender,
            Class,
            DOB,
        };

        try {
            const response = await fetch('/api/updateStudent', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            }); 
            console.log(response);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
            alert(data.message);
            navigate("/ManageStudent")
            } else if(response.status == 404){
                alert(data.message);
            }
        } catch (error) {
            console.error('Error updating student:', error);
        }

            

            // const result = await response.json();
            // console.log('Update response:', result);

            // if (response.ok) {
            //     alert('Student updated successfully!');
            // } else {
            //     alert(`Failed to update student: ${result.message}`);
            // }
      
    };

    return (
        <>
            <div className="row md:flex md:justify-around align-center">
                <Dashboard />
                <div className="col flex justify-center bg-[url('./image/5040007.jpg')] w-full bg-cover">
                    <form
                        className="md:w-[700px] w-[370px] bg-[rgba(0,120,205,0.5)] p-5 m-10 h-[430px] md:h-[500px]"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-3xl text-white font-bold my-6">Update Student Info</h1>

                        <div className="flex justify-between my-5">
                            <label htmlFor="fullName" className="text-white">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                value={FullName}
                                onChange={(e) => setFullName(e.target.value)}
                                type="text"
                                placeholder="Enter Full Name"
                                required
                                className="md:w-[500px] w-[250px] h-8 rounded-md pl-3"
                            />
                        </div>

                        <div className="flex justify-between my-5">
                            <label htmlFor="rollId" className="text-white">
                                Roll ID
                            </label>
                            <input
                                id="rollId"
                                value={RollId}
                                onChange={(e) => setRollId(e.target.value)}
                                type="number"
                                placeholder="Enter Roll ID"
                                required
                                className="md:w-[500px] w-[250px] h-8 rounded-md pl-3"
                            />
                        </div>

                        <div className="flex justify-between my-5 text-white">
                            <label>Gender</label>
                            <div className="md:w-[500px] w-[200px]">
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="Male"
                                    checked={Gender === 'Male'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <label htmlFor="male">Male</label>
                                <input
                                    type="radio"
                                    name="Gender"
                                    value="Female"
                                    checked={Gender === 'Female'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>

                        <div className="flex justify-between my-5">
                            <label htmlFor="className" className="text-white">
                                Class Name
                            </label>
                            <select
                                id="className"
                                value={Class}
                                onChange={(e) => setClass(e.target.value)}
                                required
                                className="md:w-[500px] w-[250px] h-8"
                            >
                                <option value="">Select Class</option>
                                {data2.map((item, index) => (
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
                                value={DOB}
                                onChange={(e) => setDOB(e.target.value)}
                                type="date"
                                required
                                className="md:w-[500px] w-[250px]"
                            />
                        </div>

                        <div className="text-center">
                            <button className="w-14 h-8 bg-green-600 text-white" type="submit">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateStudent;


// import React, { useEffect, useState } from 'react';
// import Dashboard from '../Components/Dashboard';
// import { useNavigate, useParams } from 'react-router-dom';

// const UpdateStudent = () => {
//     const navigate = useNavigate();
//     const [data2, setData2] = useState([]);
//     const [dataSubjects, setDataSubjects] = useState([]); // To store fetched subjects for the student
//     const [FullName, setFullName] = useState('');
//     const [RollId, setRollId] = useState('');
//     const [Gender, setGender] = useState('');
//     const [Class, setClass] = useState('');
//     const [DOB, setDOB] = useState('');
//     const [Subjects, setSubjects] = useState([]); // To store selected subjects

//     const { id } = useParams();

//     // Fetch student details
//     const getStudentDetails = async () => {
//         try {
//             const response = await fetch(`http://127.0.0.1:5000/getStudent/${id}`, {
//                 method: 'GET',
//                 credentials: 'include',
//             });
//             const data = await response.json();
//             console.log(data);

//             // Set individual states from fetched data
//             setFullName(data.FullName || '');
//             setRollId(data.RollId || '');
//             setGender(data.Gender || '');
//             setClass(data.Class || '');
//             setDOB(data.DOB || '');
//             setSubjects(data.subjects || []); // Assuming subjects are part of the fetched student data
//         } catch (error) {
//             console.error('Error fetching student details:', error);
//         }
//     };

//     // Fetch all classes
//     const getAllClasses = async () => {
//         try {
//             const response = await fetch('http://127.0.0.1:5000/getClasses', {
//                 method: 'GET',
//                 credentials: 'include',
//             });
//             const sdata = await response.json();
//             setData2(sdata);
//         } catch (error) {
//             console.error('Error fetching class data:', error);
//         }
//     };

//     // Fetch all available subjects
//     const getAllSubjects = async () => {
//         try {
//             const response = await fetch('http://127.0.0.1:5000/getSubjects', {
//                 method: 'GET',
//                 credentials: 'include',
//             });
//             const sdata = await response.json();
//             setDataSubjects(sdata); // Assuming this fetches a list of subjects
//         } catch (error) {
//             console.error('Error fetching subject data:', error);
//         }
//     };

//     useEffect(() => {
//         getStudentDetails();
//         getAllClasses();
//         getAllSubjects(); // Fetch all subjects
//     }, []);

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(FullName, RollId, Gender, Class, DOB, Subjects);

//         const updatedData = {
//             FullName,
//             RollId,
//             Gender,
//             Class,
//             DOB,
//             Subjects, // Send updated subjects as part of the data
//         };

//         try {
//             const response = await fetch('http://127.0.0.1:5000/updateStudent', {
//                 method: 'PATCH',
//                 credentials: 'include',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(updatedData),
//             });
//             const data = await response.json();
//             console.log(data);
//             if (response.ok) {
//                 alert(data.message);
//                 navigate("/ManageStudent");
//             } else if (response.status === 404) {
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error('Error updating student:', error);
//         }
//     };

//     return (
//         <>
//             <div className="row md:flex md:justify-around align-center">
//                 <Dashboard />
//                 <div className="col flex justify-center bg-[url('./image/5040007.jpg')] w-full bg-cover">
//                     <form
//                         className="md:w-[700px] w-[370px] bg-[rgba(0,120,205,0.5)] p-5 m-10 h-[430px] md:h-[500px]"
//                         onSubmit={handleSubmit}
//                     >
//                         <h1 className="text-3xl text-white font-bold my-6">Update Student Info</h1>

//                         <div className="flex justify-between my-5">
//                             <label htmlFor="fullName" className="text-white">
//                                 Full Name
//                             </label>
//                             <input
//                                 id="fullName"
//                                 value={FullName}
//                                 onChange={(e) => setFullName(e.target.value)}
//                                 type="text"
//                                 placeholder="Enter Full Name"
//                                 required
//                                 className="md:w-[500px] w-[250px] h-8 rounded-md pl-3"
//                             />
//                         </div>

//                         <div className="flex justify-between my-5">
//                             <label htmlFor="rollId" className="text-white">
//                                 Roll ID
//                             </label>
//                             <input
//                                 id="rollId"
//                                 value={RollId}
//                                 onChange={(e) => setRollId(e.target.value)}
//                                 type="number"
//                                 placeholder="Enter Roll ID"
//                                 required
//                                 className="md:w-[500px] w-[250px] h-8 rounded-md pl-3"
//                             />
//                         </div>

//                         <div className="flex justify-between my-5 text-white">
//                             <label>Gender</label>
//                             <div className="md:w-[500px] w-[200px]">
//                                 <input
//                                     type="radio"
//                                     name="Gender"
//                                     value="Male"
//                                     checked={Gender === 'Male'}
//                                     onChange={(e) => setGender(e.target.value)}
//                                 />
//                                 <label htmlFor="male">Male</label>
//                                 <input
//                                     type="radio"
//                                     name="Gender"
//                                     value="Female"
//                                     checked={Gender === 'Female'}
//                                     onChange={(e) => setGender(e.target.value)}
//                                 />
//                                 <label htmlFor="female">Female</label>
//                             </div>
//                         </div>

//                         <div className="flex justify-between my-5">
//                             <label htmlFor="className" className="text-white">
//                                 Class Name
//                             </label>
//                             <select
//                                 id="className"
//                                 value={Class}
//                                 onChange={(e) => setClass(e.target.value)}
//                                 required
//                                 className="md:w-[500px] w-[250px] h-8"
//                             >
//                                 <option value="">Select Class</option>
//                                 {data2.map((item, index) => (
//                                     <option key={index} value={item.className}>
//                                         {item.className}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="flex justify-between my-5">
//                             <label htmlFor="dob" className="text-white">
//                                 DOB
//                             </label>
//                             <input
//                                 id="dob"
//                                 value={DOB}
//                                 onChange={(e) => setDOB(e.target.value)}
//                                 type="date"
//                                 required
//                                 className="md:w-[500px] w-[250px]"
//                             />
//                         </div>

//                         <div className="flex justify-between my-5">
//                             <label htmlFor="subjects" className="text-white">
//                                 Subjects
//                             </label>
//                             <select
//                                 id="subjects"
//                                 multiple
//                                 value={Subjects}
//                                 onChange={(e) => setSubjects([...e.target.selectedOptions].map(option => option.value))}
//                                 className="md:w-[500px] w-[250px] h-8"
//                             >
//                                 {dataSubjects.map((subject, index) => (
//                                     <option key={index} value={subject._id}>
//                                         {subject.SubjectName}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="text-center">
//                             <button className="w-14 h-8 bg-green-600 text-white" type="submit">
//                                 Update
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default UpdateStudent;