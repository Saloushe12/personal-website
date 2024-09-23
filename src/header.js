import React from 'react';
import './header.css';

const Navbar = () => {
    return (
        <header className='header'>
            <h1 className='name'>Jonathan Zhao</h1>
            <nav className="navbar">
                <ul className="nav-links">
                    <li><a href="#about">About Me</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
        </nav>
        </header>
        
    );
};

export default Navbar;