import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutHandler } from '../Redux/actionHandlers';
function Navbar() {
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(logoutHandler());
        window.alert('You Have Been Logged Out of the E-store');
    }
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    return (
        <nav className='navbar min-w-full align-middle space-x-5 pt-2'>
            <h1 className='text-2xl'>E-Store</h1>
            <NavLink to='/home' className='font-sans hover:font-serif text-xl'>Home</NavLink>
            {
                isLoggedIn ? 
                <>
                    <button onClick={handleLogOut} className='font-sans hover:font-serif text-xl'>Logout</button>
                    <NavLink to = '/profile' className='font-sans hover:font-serif text-xl'>Profile</NavLink>
                    <NavLink to = '/cart' className='font-sans hover:font-serif text-xl'>Cart</NavLink>
                </> : 
                <>
                    <NavLink to='/login' className='font-sans hover:font-serif text-xl'>Login</NavLink>
                    <NavLink to='/signup' className='font-sans hover:font-serif text-xl'>Signup</NavLink>
                </>
            }

        </nav>
    )
}

export default Navbar