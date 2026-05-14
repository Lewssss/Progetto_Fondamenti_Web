import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <Link to="profile">
          <button>Profile</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar