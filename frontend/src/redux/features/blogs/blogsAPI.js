import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/',
        credentials: "include"
    }),
    tagTypes: ['Blogs'],
    endpoints: (builder) => (
        {
            fetchBlogs: builder.query({
                query: ({ search = '', category = '' }) => `/blogs?search=${search}&category=${category}`,
                providedTags: ['Blogs']
            }),
            fetchBlogById: builder.query({
                query: (id) => `/blogs/${id}`
            }),
            fetchRelatedBlogs: builder.query({
                query: (id) => `/blogs/related-posts/${id}`,
                providedTags: ['Blogs']
            }),
            postBlog: builder.mutation({
                query: (newBlog) => ({
                    url: `/blogs/create-post`,
                    method: "POST",
                    body: newBlog,
                    credentials: "include"
                }),
                invalidatesTags: ['Blogs'],
            }),
            updateBlog: builder.mutation({
                query: ({ id, ...content }) => ({
                    url: `/blogs/update-post/${id}`,
                    method: "PATCH",
                    body: content,
                    credentials: "include"
                }),
                invalidatesTags: (res, error, { id }) => [{ type: 'Blogs', id }],
            }),
            deleteBlog: builder.mutation({
                query: (id) => ({
                    url: `/blogs/${id}`,
                    method: "DELETE",
                    credentials: "include",
                }),
                invalidatesTags: (res, error, id) => [{ type: 'Blogs', id }],
            }),
            
        }
    )
})

export const {
    useFetchBlogsQuery,
    useFetchBlogByIdQuery,
    useFetchRelatedBlogsQuery,
    usePostBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation
} = blogApi