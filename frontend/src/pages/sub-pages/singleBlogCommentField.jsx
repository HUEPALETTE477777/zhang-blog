import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { usePostCommentMutation } from '../../redux/features/comments/commentsAPI'
import { useFetchBlogByIdQuery } from "../../redux/features/blogs/blogsAPI"


const singleBlogCommentField = () => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth)
    const [comment, setComment] = useState('')
    const navigate = useNavigate()
    const { refetch } = useFetchBlogByIdQuery(id, {skip: !id})

    const [postComment] = usePostCommentMutation()
    const submit_handler = async (evt) => {
        evt.preventDefault()
        if (!user) {
            alert('Make an account to comment')
            navigate('/login')
            return;
        }
        const new_comment = {
            user: user?._id,
            comment: comment,
            postId: id,
        }
        try {
            await postComment(new_comment).unwrap()
            alert("comment posted!")
            setComment('')
            refetch()
        } catch (error) {
            console.log(error)
            alert('Error occured while posting a comment')
        }
    }

    return (
        <div>
            <h3 className="text-lg font-medium mt-4 mb-4">Comment Here!</h3>
            <form onSubmit={submit_handler}>
                <textarea
                    name="text"
                    value={comment}
                    onChange={(evt) => setComment(evt.target.value)}
                    rows="6" cols="25"
                    placeholder="Share your opinion here!"
                    className="w-full bg-primaryBG focus:outline-none p-5 resize-none border"
                />
                <button className='w-full px-10 py-4 bg-theme text-white'>Submit</button>
            </form>
        </div>
    )
}

export default singleBlogCommentField