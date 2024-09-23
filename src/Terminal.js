import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const TerminalComponent = ({ isVisible }) => {
    const termRef = useRef(null); // React DOM element 
    const terminalRef = useRef(null); // Actual terminal instance
    const resizeObserverRef = useRef(null); // Resize observer reference

    useEffect(() => {
        if (isVisible) {
            terminalRef.current = new Terminal({
                cursorBlink: true,
                fontFamily: '"VT323", monospace',
                fontSize: 24,
                lineHeight: 1.2,
                theme: {
                    background: '#000000',
                    foreground: '#33ff33',
                }
            });

            const openTerminal = () => {
                if (termRef.current) {
                    terminalRef.current.open(termRef.current);
                    terminalRef.current.write('JONATHAN ZHAO\r\n');
                    terminalRef.current.write('SOFTWARE ENGINEER, WEB DEVELOPER\r\n$ ');

                    terminalRef.current.onData((data) => {
                        if (data.charCodeAt(0) === 13) { // enter
                            terminalRef.current.write('\r\n$ ');
                        } else {
                            terminalRef.current.write(data);
                        }
                    });
                }
            };

            // Using ResizeObserver to open the terminal once dimensions are available
            resizeObserverRef.current = new ResizeObserver(() => {
                const { clientWidth, clientHeight } = termRef.current || {};
                if (clientWidth && clientHeight) {
                    openTerminal();
                    resizeObserverRef.current.disconnect(); // Stop observing after opening
                }
            });

            resizeObserverRef.current.observe(termRef.current); // Start observing

            return () => {
                if (resizeObserverRef.current) {
                    resizeObserverRef.current.disconnect();
                }
                if (terminalRef.current) {
                    terminalRef.current.dispose();
                }
            };
        } else {
            if (terminalRef.current) {
                terminalRef.current.dispose();
                terminalRef.current = null; // Clear reference
            }
        }
    }, [isVisible]);

    return (
        <div className="terminal-container" ref={termRef} style={{ display: isVisible ? 'block' : 'none', width: '100%', height: '100%' }} />
    );
};

export default TerminalComponent;