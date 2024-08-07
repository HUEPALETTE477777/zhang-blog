import React from 'react';
import CommentorIcon from "../../../public/commentor.jpg";
import { format_date } from "../../utils/dateFormat";
import SingleBlogCommentField from './singleBlogCommentField';
import { useSelector } from 'react-redux';
import { useDeleteCommentMutation } from '../../redux/features/comments/commentsAPI';

const SingleBlogCommentCard = ({ comments }) => {
    const user = useSelector((state) => state.auth.user);
    const [deleteComment] = useDeleteCommentMutation();

    console.log(comments)

    const delete_comment_handler = async (id) => {
        if (user && user.role === 'admin') {
            try {
                await deleteComment(id).unwrap();
                window.location.reload();
            } catch (error) {
                console.error("Failed to delete comment:", error);
            }
        }
    };

    return (
        <div className="bg-white p-8 mt-6">
            <div>
                {comments?.length > 0 ? (
                    <div>
                        <h3 className="text-xl font-medium">All Comments</h3>
                        <div>
                            {comments.map((comment, idx) => (
                                <div key={idx} className="mt-10">
                                    <div className="flex gap-4 items-center">
                                        <img src={CommentorIcon} className="h-12" alt="Commentor" />
                                        <div>
                                            <p className='text-lg font-medium'>
                                                {comment?.user.username}
                                            </p>
                                            <p>Role: <span className="text-theme capitalize">{comment?.user.role}</span></p>
                                        </div>
                                        <p>{format_date(comment.createdAt)}</p>
                                        {
                                            user && user.role === 'admin' && (
                                                <button className="bg-theme px-3 py-2 text-white" onClick={() => delete_comment_handler(comment?._id)}>
                                                    Delete
                                                </button>
                                            )
                                        }
                                    </div>
                                    <div className="border p-2 mt-2">
                                        <p className="md:w-4/5">{comment?.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-xl font-medium">No comments found! Be the first to initiate conversation!</div>
                )}
            </div>
            <SingleBlogCommentField />
        </div>
    );
};

export default SingleBlogCommentCard;
