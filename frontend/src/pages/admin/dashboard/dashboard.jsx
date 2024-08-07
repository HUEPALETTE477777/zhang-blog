import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { PiUsers } from "react-icons/pi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaMicroblog, FaComments } from "react-icons/fa";
import { useFetchBlogsQuery } from "../../../redux/features/blogs/blogsAPI"
import { useGetCommentsQuery } from "../../../redux/features/comments/commentsAPI"
import { useGetUserQuery } from "../../../redux/features/auth/authAPI"

const dashboard = () => {
  const [query, setQuery] = useState({ search: '', category: '' })
  const { user } = useSelector((state) => state.auth)
  const { data: blogs = [], isLoading, error } = useFetchBlogsQuery(query);
  const { data: comments = []} = useGetCommentsQuery()
  const { data: users = []} = useGetUserQuery()


  return (
    <>
      {isLoading && <div>Loading..</div>}
      {error && <div>Error occurred! {error.toString()}</div>}
      <div className="space-y-6">
        <div className="py-2 bg-primaryBG">
          <h1 className="text-xl">Hello, '{user?.username}'. Email: {user?.email}</h1>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-primaryBG py-4 px-3 w-full space-x-1 flex flex-col items-center">
            <PiUsers className="size-8 text-theme" />
            <p> Users: {users.users?.filter(user => user.role === "user").length}</p>
          </div>
          <div className="bg-primaryBG py-4 px-3 w-full space-x-1 flex flex-col items-center">
            <MdOutlineAdminPanelSettings className="size-8 text-theme" />
            <p> Admins: {users.users?.filter(user => user.role === "admin").length}</p>
          </div>
          <div className="bg-primaryBG py-4 px-3 w-full space-x-1 flex flex-col items-center">
            <FaMicroblog className="size-8 text-theme" />
            <p> Posts: {blogs.length}</p>
          </div>
          <div className="bg-primaryBG py-4 px-3 w-full space-x-1 flex flex-col items-center">
            <FaComments className="size-8 text-theme" />
            <p> Total Comments: {comments?.total_comments}</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default dashboard