import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
         <Link to='/' onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}  className='link'>stay<span className="f">F</span>inder</Link>
      </div>

      <div className="navbar-links">
        <Link to="/" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Home</Link>
        {token ? (
          <>
          <a href="#host" onClick={()=>window.scrollTo({behavior:'smooth',top:document.getElementById('host').offsetTop})}>Want to host</a>
          <a href="#aboutus" onClick={()=>window.scrollTo({behavior:'smooth',top:document.getElementById('aboutus').offsetTop})}>About Us</a>

            <Link to="/bookings">My Bookings</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to='/admin-login'>Admin-Panel</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
