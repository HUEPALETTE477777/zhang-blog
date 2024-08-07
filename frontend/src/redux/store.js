import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from './features/blogs/blogsAPI';
import { authApi } from './features/auth/authAPI';
import authReducer from './features/auth/authSlice';
import { commentsApi } from './features/comments/commentsAPI'

export const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(blogApi.middleware, authApi.middleware, commentsApi.middleware),
});

