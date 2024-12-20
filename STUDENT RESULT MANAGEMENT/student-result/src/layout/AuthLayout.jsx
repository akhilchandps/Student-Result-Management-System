import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { fetchUser } from '../utils/Auth';

const AuthLayout = () => {
    const [user, setUser] = useState(null); // State to store user data

    useEffect(() => {
        const fetchData = async () => {
            const userData = await fetchUser();
            setUser(userData);

        };
        fetchData();
    }, []);

    if (user == 'admin') {
        return (
            <Outlet />
        )
    }else{
        <p className='text-3xl'>404 Error</p>
    }

}

export default AuthLayout