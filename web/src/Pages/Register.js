import React from 'react'
import "./Register.css"
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { accountRegister } from '../endpoints/rest/auth';
import GoogleButton from '../Components/GoogleButton';

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await accountRegister(username, email, password);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {}
    };

  return (
    <div className="register-container">
        <h1 className='Title'>Registrati</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Registrati</button>
            <div className="auth-or">oppure</div>
            <GoogleButton />
        </form>
        <p className="auth-switch">Hai già un account? <Link to="/login">Accedi</Link></p>
    </div>
  )
}

export default Register
