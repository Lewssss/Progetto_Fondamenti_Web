import React from 'react'
import { useContext } from 'react';
import "./Register.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/UserServices";
import { userContext } from '../Context/UserContext';

function Login() {
    const { setUser } = useContext(userContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Chiamata axios che verifica le credenziali utente e ritorna i dati e token
            const data = await login(email, password);
            setUser(data.user)
            setResponseMessage("Login successful");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err) {
            setResponseMessage("Error occurred during sign up");
        }
    }

  return (
    <div className="register-container">
        <h1 className='Title'>Login</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
    </div>
  )
}

export default Login