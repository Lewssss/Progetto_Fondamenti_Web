import React from 'react'
import { useContext, useState } from 'react';
import "./Register.css"
import { useNavigate, Link } from "react-router-dom";
import { accountLogin } from "../endpoints/rest/auth";
import { userContext } from '../Context/UserContext';
import GoogleButton from '../Components/GoogleButton';

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
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div className="register-container">
        <h1 className='Title'>Accedi</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Accedi</button>
            <div className="auth-or">oppure</div>
            <GoogleButton />
        </form>
        <p className="auth-switch">Non hai un account? <Link to="/register">Registrati</Link></p>
    </div>
  )
}

export default Login
