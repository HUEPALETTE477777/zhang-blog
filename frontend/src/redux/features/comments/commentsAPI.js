import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://zhang-blog.onrender.com/api/comments',
        credentials: "include"
    }),
    tagTypes: ['Comments'],
    endpoints: (builder) => ({
        postComment: builder.mutation({
            query: (comment_data) => ({
                url: "/post-comment",
                method: "POST",
                body: comment_data
            }),
            invalidatesTags: (res, error, {postId}) => [ { type: 'Comments', id: postId } ]
        }),
        getComments: builder.query({
            query: () => ({
                url: "/total-comments",
                method: 'GET',
            })
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (res, error, id) => [{ type: 'Comments', id }],
        })
    })
})

export const {
    usePostCommentMutation,
    useGetCommentsQuery,
    useDeleteCommentMutation,
} = commentsApi
export default commentsApi;