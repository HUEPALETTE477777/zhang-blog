import { createSlice } from "@reduxjs/toolkit";

const tokenPresence = () => {
    const cookies = document.cookie.split(';');
    const token = cookies.find(cookie => cookie.trim().startsWith('token='));
    return !!token;
}

const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if (serializedState === null) {
            return { user: null };
        }
        return { user: JSON.parse(serializedState) };
    } catch (error) {
        console.error('Error loading user from local storage', error);
        return { user: null };
    }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
