import React, { useState } from 'react';
import './homepage.css';
import TerminalComponent from './Terminal';
import Navbar from './header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    const [isTerminalVisible, setTerminalVisible] = useState(true);
    const [isTurningOff, setTurningOff] = useState(false);
    const [isTurningOn, setTurningOn] = useState(false);
    const [isAnimating, setAnimating] = useState(false);

    const toggleTerminal = () => {
        if (isTerminalVisible) { // If terminal is on, play animation to turn it off
            setTurningOff(true);
            setAnimating(true);
            setTimeout(() => {
                setTerminalVisible(false);
                setTurningOff(false);
                setAnimating(false);
            }, 800); // Duration of animation
        } else {
            setTerminalVisible(true);
            setTurningOn(true);
            setAnimating(true);
            setTimeout(() => {
                setTurningOn(false);
                setAnimating(false);
            }, 800);
        }
    };

    return (
        <div className={`crt-monitor ${isTerminalVisible ? 'on' : 'off'}`}>
            <div className='crt-frame'></div>
            <div className='terminal-wrapper'>
            <div className={`terminal-content ${isTurningOff ? 'turn-off' : ''} ${isTurningOn ? 'turn-on' : ''}`}>
                <TerminalComponent isVisible={isTerminalVisible} />
            </div>
        </div>
        <button className={`toggle-button ${isTerminalVisible ? 'on' : 'off'}`} onClick={toggleTerminal}>
            <FontAwesomeIcon icon={faPowerOff} className={`power-icon ${isTerminalVisible ? 'on' : 'off'}`} />
        </button>
    </div>
    );
};

export default HomePage;