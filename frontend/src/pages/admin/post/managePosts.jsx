import React, { useState } from 'react'
import { useFetchBlogsQuery, useDeleteBlogMutation } from '../../../redux/features/blogs/blogsAPI'
import { format_date } from "../../../utils/dateFormat"
import { GoPencil } from "react-icons/go";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const managePosts = () => {
  const [query, setQuery] = useState({ search: '', category: '' })
  const { data: blogs = [], error, isLoading, refetch } = useFetchBlogsQuery(query)
  const [deleteBlog] = useDeleteBlogMutation()

  const delete_handler = async (id) => {
    try {
      const res = await deleteBlog(id).unwrap()
      Swal.fire({
        title: "Good job!",
        text: "Successfully deleted the post",
        icon: "success",
        timer: 1000,
      });
      refetch()
      windows.location.reload()
    } catch (error) {
      console.log("Failed to delete post: ", error)
    }
  }
  return (
    <>
      {isLoading && <div>Loading..</div>}
      {error && <div>Could not fetch post..</div>}


      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Creation Date
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>

          <tbody>
            {
              blogs && blogs.map((blog, idx) => (
                <tr className="bg-white border" key={idx}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {idx + 1}
                  </th>
                  <td className="px-6 py-4">
                    <img src={blog.image} className="size-12" />
                  </td>
                  <td className="px-6 py-4">
                    {blog.title}
                  </td>
                  <td className="px-6 py-4">
                    {blog.category}
                  </td>
                  <td className="px-6 py-4">
                    {format_date(blog.createdAt)}
                  </td>
                  <td className="px-6 py-4 cursor-pointer hover:text-theme">
                    <Link to={`/dashboard/edit-post/${blog._id}`} className="flex items-center gap-2 justify-start"><GoPencil /> Edit</Link>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-4 py-2 bg-theme text-white hover:bg-white hover:text-theme transition ease-in-out" onClick={() => delete_handler(blog._id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>
      </div>


    </>
  )
}

export default managePosts