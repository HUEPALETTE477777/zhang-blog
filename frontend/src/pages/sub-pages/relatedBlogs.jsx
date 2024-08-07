import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchRelatedBlogsQuery } from '../../redux/features/blogs/blogsAPI';

const RelatedBlogs = () => {
    const { id } = useParams();
    const { data: blogs = [], isLoading, error } = useFetchRelatedBlogsQuery(id);

    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl font-medium mb-4 text-center">Related Blogs</h2>
            <hr className="mb-4" />
            {blogs.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                    {blogs.map((blog, idx) => (
                        <Link to={`/blogs/${blog._id}`} key={idx} className="flex flex-col shadow-md overflow-hidden transition hover:scale-105 ease-in-out">
                            <div className="relative">
                                <img src={blog.image} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-theme">{blog.title.substring(0, 40)}</h3>
                                <p className="mt-2 text-sm text-gray-600">{blog.description.substring(0, 10)}...</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-gray-600 text-center mt-8">No related blog posts found.</div>
            )}
        </div>
    );
};

export default RelatedBlogs;
