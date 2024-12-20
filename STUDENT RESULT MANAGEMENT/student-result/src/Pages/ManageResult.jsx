import React from 'react'
import Dashboard from '../Components/Dashboard'
import img1 from "../assets/image/pexels-moose-photos-170195-1037995.jpg"
const ManageResult = () => {
  return (
    <>
 <div className="row md:flex md:justify-around align-center">

<Dashboard/> 
<div class="col w-full  bg-cover" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover'}}>
            <h1 class="text-3xl font-bold my-5  ml-12 text-[#024550]">MANAGE STUDENTS</h1>
            <table class="border border-2 m-auto bg-[rgba(255,255,255,0.8)] mt-20 shadow-md shadow-black-600 ">
                <tr>
                    <th class="text-center p-5 border">Sl No</th>
                    <th class="text-center p-5 border">Student Name</th>
                    <th class="text-center p-5 border">Roll Id</th>
                    <th class="text-center p-5 border">Class</th>
                    <th class="text-center p-5 border">Reg Date</th>
                    <th class="text-center p-5 border">Status</th>
                    <th class="text-center p-5 border">Action</th>
                
                </tr>
    
                <tr>
                    <td class="text-center p-5 border">1</td>
                    <td class="text-center p-5 border">Athira</td>
                    <td class="text-center p-5 border">1001</td>
                    <td class="text-center p-5 border">First C</td>
                      <td class="text-center p-5 border">2024-08-10</td>
                    <td class="text-center p-5 border text-green-600">Active</td>
                    <td class="text-center p-5 border flex justify-between">
                        <a href="./Addstudent.html"><i class="fa-solid fa-pen-to-square text-yellow-500"></i></a>
                      </td>
                </tr>
    
            
                <tr>
                    <td class="text-center p-5 border">2</td>
                    <td class="text-center p-5 border">Akhil</td>
                    <td class="text-center p-5 border">1002</td>
                    <td class="text-center p-5 border">Fourth C</td>
                    <td class="text-center p-5 border">2024-08-10</td>
                    <td class="text-center p-5 border text-green-600">Active</td>
                    <td class="text-center p-5 border flex justify-between">
                        <a href="./Addstudent.html"><i class="fa-solid fa-pen-to-square text-yellow-500"></i></a>
                      </td>
                </tr>
    
              
                <tr>
                    <td class="text-center p-5 border">3</td>
                    <td class="text-center p-5 border">Ranjith</td>
                    <td class="text-center p-5 border">1003</td>
                    <td class="text-center p-5 border">First B</td>
                    <td class="text-center p-5 border">2024-08-10</td>
                    <td class="text-center p-5 border text-green-600">Active</td>
                    <td class="text-center p-5 border flex justify-between">
                        <a href="./Addstudent.html"><i class="fa-solid fa-pen-to-square text-yellow-500"></i></a>
                      </td>
                </tr>
    
            
                <tr>
                    <td class="text-center p-5 border">3</td>
                    <td class="text-center p-5 border">Bipin</td>
                    <td class="text-center p-5 border">1004</td>
                    <td class="text-center p-5 border">Third C</td>
                    <td class="text-center p-5 border">2024-08-10</td>
                    <td class="text-center p-5 border text-green-600">Active</td>

                    <td class="text-center p-5 border flex justify-between">
                        <a href="./Addstudent.html"><i class="fa-solid fa-pen-to-square text-yellow-500"></i></a>
                      </td>
                </tr>
                <tr>
                    <td class="text-center p-5 border">4</td>
                    <td class="text-center p-5 border">Vishnu</td>
                    <td class="text-center p-5 border">1005</td>
                    <td class="text-center p-5 border">First D</td>
                    <td class="text-center p-5 border">2024-02-16</td>
                    <td class="text-center p-5 border text-green-600">Active</td>
                    <td class="text-center p-5 border flex justify-between">
                        <a href="./Addstudent.html"><i class="fa-solid fa-pen-to-square text-yellow-500"></i></a>
                      </td>
                </tr>
            </table>
        </div>
</div>
    </>
  )
}

export default ManageResult
