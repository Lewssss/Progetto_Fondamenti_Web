import React from 'react'
import { useContext } from 'react';
import "./Register.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { accountLogin } from "../endpoints/rest/auth";
import { userContext } from '../Context/UserContext';

function Login() {
    const { setUser } = useContext(userContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await accountLogin(email, password);
            setUser(loginResponse.user);
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err) {}
    }

  return (
    <div className="register-container">
        <h1 className='Title'>Login</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login
