import React, { use, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: '', password: ''
    })
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://travel-bus-booking-5.onrender.com/api/login/', form)
            setMessage('Login Success')
            navigate("/")


            if (onLogin) {
                onLogin(response.data.token, response.data.user_id)
            }

        } catch (error) {
            setMessage("login Failed")
        }
    }


    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" name='username' value={form.username} onChange={handleChange} /><br />

                    <label>Password</label>
                    <input type="password" name='password' value={form.password} onChange={handleChange} /><br />
                    <button type='submit'>Login</button>
                    {message && <p>{message}</p>}
                    {/* <span>New Member :</span> <Link style={{color:"blue" , marginLeft:"9px"}}to="/register">Register</Link> */}

                    <p>
                        New to Bus Travel Bookings?{"     "}  
                        <Link to="/register" style={{color:"blue"}}>Create an account</Link>
                    </p>

                </div>
            </form>

        </div>
    )
}

export default LoginForm
