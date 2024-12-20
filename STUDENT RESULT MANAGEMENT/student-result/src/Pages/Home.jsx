import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import img from "../assets/image/hhh.jpg"
import img2 from "../assets/image/green.jpg"
import img3 from "../assets/image/note.jpg"
import img4 from "../assets/image/art.jpg"
import pencil from "../assets/image/architect-blueprint-sketched-with-pencil-paper-close-up-focus-generated-by-ai.jpg"
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <Navbar/>

    <div className="relative">
        <div>
            <img src={pencil} className=" w-full"  alt=""/>
        </div>

        <div className="absolute md:top-52 top-0  md:left-24">
            <h1 className="md:text-5xl text-2xl text-white font-bold my-2">Student Result Management System</h1>
            <button className="bg-black text-white w-36 h-12 rounded-xl mt-5"><Link to="/login">Get Started</Link></button>
        </div>
   
    </div>


    <div className="flex flex-col items-center gap-5 mt-20">
        <button className="bg-gray-300 text-green-600 p-1">Our classNamees</button>
        <h1 className="text-5xl font-bold text-[#024550]">Our Popular classNamees</h1>
        <p>We offer a diverse range of interactive and engaging classNamees designed to inspire curiosity and ignite a passion for learning.</p>

        <div className="row md:flex justify-around m-5">
            <div className="col flex flex-col items-center m-5">
                <div className="w-96 my-5 ">
                    <img src={img2} className="w-full h-52 object-cover" alt=""/>

                </div>
                <h1 className="text-3xl font-bold my-5 text-[#024550]">Creative Writing</h1>

                <p>Our classNamees are designed to accommodate writers of all levels, from beginners to seasoned professionals.</p>
                
            </div>
            <div className="col flex flex-col items-center m-5 ">
                <div  className="w-96 my-5">
                    <img src={img3} className="w-full h-52 object-cover" alt=""/>
                </div>
                <h1 className="text-3xl font-bold my-5 text-[#024550]">3D Graphics</h1>
                <p className="text-justify">Dive into the captivating world of 3D graphics and unlock your creative potential with our comprehensive courses.</p>
            </div>
            
            <div className="col flex flex-col items-center m-5 ">
                <div className="w-96 my-5">
                    <img src={img4} className="w-full h-52 object-cover" alt=""/>
                </div>
               <h1 className="text-3xl font-bold my-5 text-[#024550]">Art and Design</h1>
               <p  className="text-justify">Unleash your artistic talents and explore the boundless possibilities of visual expression with our Art and Design courses.</p>

            </div>
        </div>
    </div>


    {/* <!-- //about --> */}
     <div className="row flex justify-around m-5">
        <div className="col w-[100%] m-3">
            <div className=" flex flex-col items-center gap-5">
                <h1 className="text-5xl font-bold text-[#024550]" id="about">About School</h1>
                <p className="text-xl">With our innovative virtual platform, students can access high-quality education from anywhere in the world. Our experienced educators utilize cutting-edge technology to deliver engaging lessons, personalized support, and interactive experiences that inspire curiosity and foster academic success.</p>
   
                <div className="flex w-[600px] justify-around text-xl">
                    <ul className="list-disc">
                        <li className="my-3">Flexibility</li>
                        <li className="my-3">Variety of courses</li>
                        <li className="my-3">Use of technologies</li>
                    </ul>
                    <ul className="gap-5 list-disc">
                        <li className="my-3">Accessibility</li>
                        <li className="my-3">Individualized training</li>
                        <li>Development of skills</li>
                    </ul>
                </div>

                <div>
                    <button className="bg-[#024550] text-white p-3">More About Us</button>
                </div>
            </div>
        </div>
    <div className="col w-[100%]  m-5">
     
            <img src={img} alt="" className="w-full"/>  
    </div>
     </div>
      <Footer/>
    </div>
  )
}

export default Home
