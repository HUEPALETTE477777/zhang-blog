import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetchBlogByIdQuery } from '../../redux/features/blogs/blogsAPI'
import SingleBlogCard from "../../pages/sub-pages/singleBlogCard"
import SingleBlogCommentCard from './singleBlogCommentCard';
import RelatedBlogs from './relatedBlogs'

const singleBlog = () => {
    const { id } = useParams()
    const { data: blog, isLoading, error } = useFetchBlogByIdQuery(id)
    return (
        <div className="container text-primary mx-auto mt-10">
            <div>
                {isLoading && <div>Loading..</div>}
                {error && <div>Could not fetch post..</div>}
                {
                    blog?.post && (
                        <div className="flex flex-col lg:flex-row items-start justify-between md:gap-10 gap-8">
                            <div className="lg:w-2/3 w-full">
                                <SingleBlogCard blog={blog.post} />
                                <SingleBlogCommentCard comments={blog?.comments} />
                            </div>
                            <div className="bg-white lg:w-1/3 w-full">
                                <RelatedBlogs />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default singleBlog