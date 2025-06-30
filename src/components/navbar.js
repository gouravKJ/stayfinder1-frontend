import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsMobileMenuOpen(false); // Close mobile menu after logout
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSmoothScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop - 70 // Account for navbar height
      });
    }
    closeMobileMenu(); // Close mobile menu after clicking
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileMenu();
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link 
          to='/' 
          onClick={handleHomeClick}  
          className='link'
        >
          stay<span className="f">F</span>inder
        </Link>
        
        {/* Mobile Menu Toggle Button */}
        <div 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={handleHomeClick}>Home</Link>
        
        {token ? (
          <>
            <a 
              href="#host" 
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll('host');
              }}
            >
              Want to host
            </a>
            <a 
              href="#aboutus" 
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll('aboutus');
              }}
            >
              About Us
            </a>
            <Link to="/bookings" onClick={closeMobileMenu}>My Bookings</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMobileMenu}>Login</Link>
            <Link to="/register" onClick={closeMobileMenu}>Register</Link>
            <Link to='/admin-login' onClick={closeMobileMenu}>Admin Panel</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
