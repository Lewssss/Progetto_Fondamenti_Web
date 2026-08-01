import React from 'react'
import "./Register.css" 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { accountRegister } from '../endpoints/rest/auth';

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
        <h1 className='Title'>Sign Up</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
        <p>Hai già un account? 
            <Link to="/login">Accedi</Link>
        </p>
    </div>
  )
}

export default Register
