// components/FloatingNav.jsx

import { useEffect, useState } from 'react';
// Import the new icons
import { FiSun, FiMoon } from 'react-icons/fi'; 

// useTheme hook remains the same, but the component uses the icon prop
const useTheme = () => {
    // ... (rest of the hook code is unchanged)
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
            }
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', newTheme);
    };

    return [theme, toggleTheme];
};


export default function FloatingNav() {
    const [theme, toggleTheme] = useTheme();

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    };

    const ThemeIcon = theme === 'dark' ? FiSun : FiMoon; 

    return (
        <nav className="floating-nav">
            <a href="#hero" onClick={(e) => handleScroll(e, 'hero')}>Home</a>
            <a href="#services" onClick={(e) => handleScroll(e, 'services')}>Services</a>
            <a href="#projects" onClick={(e) => handleScroll(e, 'projects')}>Work</a>
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contact</a>
            
            <button 
                id="theme-toggle" 
                className="theme-toggle" 
                aria-label="Toggle Dark Mode"
                onClick={toggleTheme}
            >
                <span className="icon">
                    <ThemeIcon size={20} /> 
                </span>
            </button>
        </nav>
    );
}