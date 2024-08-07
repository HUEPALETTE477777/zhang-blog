import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchBlogsQuery } from '../../redux/features/blogs/blogsAPI';
import SearchBlog from "./searchBlog";
import { format_date } from '../../utils/dateFormat';

const Blogs = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { data: blogs = [], error, isLoading } = useFetchBlogsQuery({ search });

    const handleSearchChange = (evt) => {
        setSearch(evt.target.value);
        setCurrentPage(1);
    };

    const blogsPerPage = 3;
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

    return (
        <div className='container mt-16 mx-auto'>
            {isLoading && <div>Loading..</div>}
            {error && <div>Error occurred! {error.toString()}</div>}

            {!isLoading && !error && (
                <>
                    <SearchBlog search={search} onSearchChange={handleSearchChange} />

                    <div className='mt-8 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8'>
                        {currentBlogs.map(blog => (
                            <Link to={`/blogs/${blog._id}`} key={blog._id} className="shadow-md p-4 hover:scale-105 ease-in-out">
                                <div className="relative">
                                    <img src={blog.image} className="w-full h-48" />
                                    <span className="absolute top-2 right-2 bg-theme text-white px-2 py-1">{blog.category}</span>
                                </div>
                                <div className="flex flex-col justify-center text-center">
                                    <h2 className="text-2xl p-2">{blog.title}</h2>
                                    <p className="text-xl p-1">Description: {blog.description.substring(0, 40)}</p>
                                    <p className="text-xl p-2">By: {blog.author.username}</p>
                                    <p>Created on: {format_date(blog.createdAt)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center mt-10 gap-4">
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-5 py-2 bg-slate-600 text-white">Prev</button>
                        <span className="px-4 py-2 text-lg">Page {currentPage} of {totalPages}</span>
                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-5 py-2 bg-theme text-white">Next</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Blogs;
