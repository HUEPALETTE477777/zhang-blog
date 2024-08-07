import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../redux/features/auth/authAPI";
import { logOut } from "../redux/features/auth/authSlice";

import logo from "../../public/logo.png";

const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const { user } = useSelector((state) => state.auth);
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState(''); 

    const logoutHandler = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logOut());
            alert('Logged out successfully');
        } catch (error) {
            console.log(error);
        }
    };



    const renderAuthLinks = () => {
        if (user && user.role === 'user') {
            return (
                <>
                    <li className="flex items-center gap-4">
                        <img src={logo} alt="User Logo" className="h-8 w-8 rounded-full ring-1 ring-theme" />
                        <button onClick={logoutHandler} className="px-2 py-1 rounded bg-theme text-white">Logout</button>
                    </li>
                </>
            )
        } else if (user && user.role === 'admin') {
            return (
                <>
                    <li className="flex items-center gap-4">
                        <img src={logo} alt="Admin Logo" className="h-8 w-8 rounded-full ring-1 ring-theme" />
                        <NavLink to="/dashboard" className="block text-gray-700 hover:text-gray-900 px-4 py-3" onClick={toggleMenu}>Dashboard</NavLink>
                    </li>
                </>
            );
        } else {
            return (
                <>
                    <li>
                        <NavLink to="/login" className="block text-gray-700 hover:text-gray-900 px-4 py-3" onClick={toggleMenu}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className="block text-gray-700 hover:text-gray-900 px-4 py-3" onClick={toggleMenu}>Sign Up</NavLink>
                    </li>
                </>
            );
        }
    };

    return (
        <header className="bg-white py-3 border-b shadow-md top-0 left-0 right-0">
            <nav className="container mx-auto flex justify-between px-2">
                <a href="/" className='flex items-center gap-4'>
                    <img src={logo} alt="Logo" className="h-12 w-16 rounded-full" />
                    <p className='text-xl text-gray-700'>Zhang Blog</p>
                </a>
                <ul className="sm:flex hidden items-center gap-8">
                    {navItems.map((item, idx) => (
                        <li key={idx}>
                            <NavLink
                                to={item.path}
                                className="text-gray-700 hover:text-gray-900"
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <ul className="sm:flex hidden items-center gap-6">
                    <li><CiGlobe className="cursor-pointer" /></li>
                    {renderAuthLinks()}
                </ul>
                <div className="flex items-center sm:hidden">
                    <button
                        onClick={toggleMenu}
                        className='flex items-center text-sm text-gray-700 hover:text-gray-900 px-2 py-2 bg-[#e2dddd] rounded'
                    >
                        {menuOpen ? <IoMdClose className="size-7" /> : <CiMenuBurger className="size-7" />}
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <ul className="sm:hidden bg-white fixed top-20 left-0 w-full border-b shadow-sm z-50">
                    {navItems.map((item, idx) => (
                        <li key={idx}>
                            <NavLink
                                to={item.path}
                                className="block text-gray-700 hover:text-gray-900 px-4 py-3"
                                onClick={toggleMenu}
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                    {renderAuthLinks()}
                </ul>
            )}
        </header>
    );
};

export default Navbar;
