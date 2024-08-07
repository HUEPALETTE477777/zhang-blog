import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../../redux/features/auth/authAPI'

const register = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [registerUser, {isLoading}] = useRegisterUserMutation()

    const navigate = useNavigate()
    const register_handler = async (evt) => {
        evt.preventDefault();
        const data = {
            username, 
            email,
            password
        }
        try {
            await registerUser(data).unwrap()
            alert("Registered User!")
            navigate("/")
        } catch (error) {
            setMessage("Registration failed")
            console.log("Error occurred while registering user: ", error)
        }
    }

    return (
        <div className="max-w-sm bg-white mx-auto p-8 mt-14">
            <h2 className="text-2xl font-medium">Register an Account</h2>
            <form action="space-y-5 max-w-sm mx-auto pt-8 " onSubmit={register_handler}>
                <input type="text" value={username} className="mt-4 py-3 px-5 w-full bg-primaryBG focus:outline-none border" onChange={((evt) => setUsername(evt.target.value))} placeholder="Username here" required />
                <input type="email" value={email} className="mt-4 py-3 px-5 w-full bg-primaryBG focus:outline-none border" onChange={((evt) => setEmail(evt.target.value))} placeholder="Email here" required />
                <input type="password" value={password} className="mt-4 py-3 px-5 w-full bg-primaryBG focus:outline-none border" onChange={((evt) => setPassword(evt.target.value))} placeholder="Password here" required />
                {
                    message && <p className="text-red-400">{message}</p>
                }
                <button className="w-full mt-5 text-white py-2 bg-green-600 hover:bg-green-400 font-medium">Login</button>
            </form>
            <p className="my-3 text-center text-gray-500">—————— or ——————</p>
            <p className="my-4 text-center">Already have an Account? <Link to="/login" className="text-green-600 hover:text-green-400 hover:underline">Register</Link></p>
        </div>
    )
}

export default register