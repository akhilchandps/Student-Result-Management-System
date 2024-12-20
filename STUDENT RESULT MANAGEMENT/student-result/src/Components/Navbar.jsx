import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav class="flex justify-between px-3 py-4 shadow-xl w-full bg-[#024550] text-white">
        <div>
            <h1>SRMS</h1>
        </div>
        <div>
            <Link to="/" class="mx-4 transition ease duration-500 text-xl hover:bg-white hover:text-sky-600 p-2">Home</Link>
            <Link href="#about" class="mx-4 transition ease duration-500 text-xl hover:bg-white hover:text-sky-600 p-2">About</Link>

            <Link to={'/login'} class="mx-4 transition ease duration-500 text-xl hover:bg-white hover:text-sky-600 p-2">SignIn</Link>
        </div>
    </nav>
    </div>
  )
}

export default Navbar
