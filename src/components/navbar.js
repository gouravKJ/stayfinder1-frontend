
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="link">
          stay<span className="f">F</span>inder
        </Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        {token ? (
          <>
            <a href="#host" onClick={() => {
              setMenuOpen(false);
              window.scrollTo({ behavior: "smooth", top: document.getElementById('host').offsetTop });
            }}>Want to host</a>
            <a href="#aboutus" onClick={() => {
              setMenuOpen(false);
              window.scrollTo({ behavior: "smooth", top: document.getElementById('aboutus').offsetTop });
            }}>About Us</a>
            <Link to="/bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link>
            <button onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            <Link to="/admin-login" onClick={() => setMenuOpen(false)}>Admin-Panel</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
