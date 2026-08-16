import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className='div-nav'>
        <Link to="profile">
          <button>Profile</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar