import React, { useState } from 'react';
import { useSearchUsersQuery, useDeleteUserMutation } from '../../../redux/features/auth/authAPI';
import { GoPencil } from "react-icons/go";
import UpdateUserModal from "./updateUserModal";
import { useSelector } from "react-redux";
import SearchUser from "./searchUser";
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');
  const { data, error, isLoading } = useSearchUsersQuery(search);
  const [deleteUser] = useDeleteUserMutation();
  const user = useSelector((state) => state.auth.user);
  const [modalOpen, setModalOpen] = useState(false);

  const editHandler = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const deleteHandler = async (id) => {
    try {
      if (!user || user.role !== 'admin') {
        Swal.fire({
          title: "Access Denied!",
          text: "You do not have permission to delete users.",
          icon: "error",
          timer: 2000,
        });
        return;
      }
      const res = await deleteUser(id).unwrap();
      console.log(res);
      Swal.fire({
        title: "Good job!",
        text: "Successfully deleted the user",
        icon: "success",
        timer: 1000,
      });
    } catch (error) {
      console.log("Failed to delete user: ", error);
    }
  };

  const closeModalHandler = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      {isLoading && <div>Loading..</div>}
      {error && <div>Could not fetch users..</div>}

      <div>
        <SearchUser onSearch={setSearch} />
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">No.</th>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Edit</th>
              <th scope="col" className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user, idx) => (
              <tr className="bg-white border" key={user._id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {idx + 1}
                </th>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 cursor-pointer hover:text-theme">
                  <button className="flex items-center gap-2" onClick={() => editHandler(user)}>
                    <GoPencil /> Edit
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="px-4 py-2 bg-theme text-white hover:bg-white hover:text-theme transition ease-in-out"
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {modalOpen && <UpdateUserModal user={selectedUser} onClose={closeModalHandler}  />}
    </>
  );
};

export default ManageUsers;
