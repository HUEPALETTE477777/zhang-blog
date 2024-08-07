import React, { useState } from 'react';
import { useUpdateUserRoleMutation, useUpdateUsernameMutation } from '../../../redux/features/auth/authAPI';

const UpdateUserModal = ({ user, onClose }) => {
    const [role, setRole] = useState(user?.role);
    const [username, setUsername] = useState(user?.username);
    const [updateRole] = useUpdateUserRoleMutation();
    const [updateUsername] = useUpdateUsernameMutation();

    const updateRoleHandler = async () => {
        try {
            await updateRole({ userId: user?._id, role }).unwrap();
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    const updateUsernameHandler = async () => {
        try {
            await updateUsername({ userId: user?._id, username }).unwrap();
        } catch (error) {
            console.error("Error updating username:", error);
        }
    };

    const handleSave = async () => {
        try {
            await Promise.all([
                updateRoleHandler(),
                updateUsernameHandler()
            ]);
            onClose();
        } catch (error) {
            console.error("Error saving updates:", error);
        }
    };

    return (
        <div className="inset-0 fixed flex items-center justify-center bg-gray-900 bg-opacity-55">
            <div className="bg-white p-5 shadow-md w-1/2">
                <h2 className="text-center text-2xl">Edit user</h2>
                <div>
                    <label className="mt-4">Email: </label>
                    <input
                        type="text"
                        value={user?.email}
                        readOnly
                        className="bg-primaryBG px-5 py-1 mb-4 focus:outline-none border w-full"
                    />
                </div>
                <div className="mt-4">
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-primaryBG px-5 py-1 mb-4 focus:outline-none border w-full"
                    />
                </div>
                <div className="flex gap-5">
                    <label>Role: </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="bg-primaryBG border"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex gap-4 justify-end">
                    <button
                        className="px-5 py-3 bg-red-600 text-white mt-4"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className="px-5 py-3 bg-theme text-white mt-4" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;
