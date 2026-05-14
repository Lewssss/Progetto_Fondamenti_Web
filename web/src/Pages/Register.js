import React from 'react'
import "./Register.css" 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { register } from '../services/UserServices';

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

        const handleSubmit = async (event) => {
            event.preventDefault();
            try {
                // Chiamiamo la funzione di registrazione dal servizio
                await register(username, email, password);
                setResponseMessage("Registration successful! Redirecting to login...");
                // Dopo un breve messaggio di successo, reindirizziamo l'utente alla pagina di login
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } catch (error) {
                setResponseMessage("Error occurred during registration.");
            }
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
        {responseMessage && <p>{responseMessage}</p>}
        <p>Hai già un account? 
            <Link to="/login">Accedi</Link>
        </p>
    </div>
  )
}

export default Register