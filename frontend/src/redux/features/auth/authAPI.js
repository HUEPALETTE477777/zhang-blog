import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/auth',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (new_user) => ({
                url: '/register',
                method: 'POST',
                body: new_user
            })
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            })
        }),
        getUser: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/users/${userId}`,
                method: 'PUT',
                body: { role },
            }),
            invalidatesTags: ['User']
        }),
        updateUsername: builder.mutation({
            query: ({ userId, username}) => ({
                url: `/users/${userId}/username`,
                method: "PUT",
                body: {username},
            }),
            invalidatesTags: ['User']
        }),
        searchUsers: builder.query({
            query: (query) => ({
                url: '/search',
                method: 'GET',
                params: { query  }
            }),
            providesTags: ['User']
        }),
    })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserQuery,
    useDeleteUserMutation,
    useUpdateUserRoleMutation,
    useUpdateUsernameMutation,
    useSearchUsersQuery
} = authApi;

export default authApi;
