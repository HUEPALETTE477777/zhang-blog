import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../redux/features/auth/authAPI';
import { setUser } from '../../redux/features/auth/authSlice'; 
import { useDispatch } from 'react-redux'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const login_handler = async (evt) => {
        evt.preventDefault();
        const data = {
            email,
            password
        };
        try {
            const res = await loginUser(data);
            const { user } = res.data; 
            dispatch(setUser({ user }));
            localStorage.setItem('user', JSON.stringify(user)); 
            alert("Login Successful");
            navigate('/');
            window.location.reload();
        } catch (error) {
            setMessage(error?.data?.message || "Please provide valid credentials");
        }
    };

    return (
        <div className="max-w-sm bg-white mx-auto p-8 mt-14">
            <h2 className="text-2xl font-medium">Log Into Your Account</h2>
            <form onSubmit={login_handler} className="space-y-5 max-w-sm mx-auto pt-8">
                <input
                    type="email"
                    value={email}
                    className="mt-4 py-3 px-5 w-full bg-primaryBG focus:outline-none border"
                    placeholder="Email here"
                    required
                    onChange={(evt) => setEmail(evt.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    className="mt-4 py-3 px-5 w-full bg-primaryBG focus:outline-none border"
                    placeholder="Password here"
                    required
                    onChange={(evt) => setPassword(evt.target.value)}
                />
                {message && <p className="text-red-400">{message}</p>}
                <button
                    disabled={loginLoading}
                    className="w-full mt-5 text-white py-2 bg-green-600 hover:bg-green-400 font-medium"
                >
                    {loginLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className="my-3 text-center text-gray-500">—————— or ——————</p>
            <p className="my-4 text-center">
                Don't have an Account?
                <Link to="/register" className="text-green-600 hover:text-green-400 hover:underline"> Register Here</Link>
            </p>
        </div>
    );
};

export default Login;
