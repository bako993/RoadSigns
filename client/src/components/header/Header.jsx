import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Header.css'


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

  return (
    <header className="header">
      <nav className="navbar">

        <div className="navbar-container">
        <a href="/" className="navbar-logo">RoadSigns</a>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>

            <a href="/" className="navbar-link">Home</a>
            <a href="/upload" className="navbar-link">Upload Sign</a>
            <a href="/about" className="navbar-link">About</a>
            <a href="/contact" className="navbar-link">Contact</a>

        </div>

        <div className="menu-icon" onClick={toggleNavbar}>
            <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        </div>

        </nav>
    </header>
  );
};

export default Header;
