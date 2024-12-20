import React, { useEffect, useState } from 'react'
import Dashboard from '../Components/Dashboard'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateClass = () => {
  const { id } = useParams();
  console.log(id);
  
  const navigate = useNavigate();
  const [className, setClassName] = useState('');
  const [classNumeric, setClassNumeric] = useState('');
  const [Date, setDate] = useState('');

  const getClass = async () => {
    const response = await fetch(`/api/getClass/${id}`, {
      method: "GET",
      credentials: "include",
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    setClassName(data.className);
    setClassNumeric(data.classNumeric);
    setDate(data.Date);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedClass = {
      className,
      classNumeric,
      Date,
    };
    try {
      
    } catch (error) {
      
    }

    const response = await fetch(`/api/updateClass/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedClass),
    });
    console.log(response);
   const data = await response.json();
   console.log(data);
   if(response.ok){
    alert(data.message)
    navigate("/ManageClass")
   }else{
    alert(data.message)
   }
   

  };

  useEffect(() => {
    getClass();
  }, [id]);

  return (
    <div>
      <div className="row md:flex md:justify-around align-center">
        <Dashboard />

        <div className="col w-full flex justify-center text-white bg-[url(/image/pexels-nietjuh-2008145.jpg)] bg-cover">
          <form
            onSubmit={handleUpdate}
            className="rounded-md md:w-2/4 w-[350px] bg-[rgba(0,0,0,0.8)] mt-20 p-10 h-[600px] backdrop-blur-sm"
          >
            <h1 className="text-2xl font-bold">Update Student Class Info</h1>

            <label>Classname</label>
            <div className="my-3">
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="class"
                required
                className="h-8 w-full pl-3 text-black"
              />
              <p className="text-gray-500">Example: Third, Fourth</p>
            </div>

            <label>Classname in Numeric</label>
            <div className="my-3">
              <input
                type="text"
                value={classNumeric}
                onChange={(e) => setClassNumeric(e.target.value)}
                placeholder="class"
                className="h-8 w-full pl-3 text-black"
              />
              <p className="text-gray-500">Eg: 2, 3, 4, 5</p>
            </div>

     

            <label>Date</label>
            <div className="my-3">
              <input
                type="text"
                value={Date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="date"
                className="h-8 w-full pl-3 text-black"
              />
              <p className="text-gray-500">Eg: YYYY-MM-DD</p>
            </div>

            <div>
              <button type="submit" className="bg-green-600 text-white p-2">
                Update <i className="fa-solid fa-check font-bold"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateClass;
