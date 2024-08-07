import React from 'react';
import AdminImage from '../../../public/commentor.jpg';
import { NavLink } from 'react-router-dom';
import { useLogoutUserMutation } from "../../redux/features/auth/authAPI";
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from "../../redux/features/auth/authSlice";

const AdminTabs = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    console.log(user)

    const logoutHandler = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logOut());
            alert('Logged out successfully');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col justify-between space-y-5 bg-white p-8 md:h-[calc(100vh-98px)]">
            <div>
                <div className="mb-5">
                    <img src={AdminImage} className="size-20"/>
                    <p className="text-xl mt-2">{user?.username}</p>
                </div>
                <hr />
                <ul className="space-y-4 pt-5 pb-4">
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-theme font-bold" : "text-black"} end>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/create-post" className={({ isActive }) => isActive ? "text-theme font-bold" : "text-black"}>
                            Create a new post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-post" className={({ isActive }) => isActive ? "text-theme font-bold" : "text-black"}>
                            Manage Posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-users" className={({ isActive }) => isActive ? "text-theme font-bold" : "text-black"}>
                            Users
                        </NavLink>
                    </li>
                </ul>
                <hr />
            </div>
            <div className="mb-4">
                <button className="text-white bg-theme px-3 py-2" onClick={logoutHandler}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminTabs;
