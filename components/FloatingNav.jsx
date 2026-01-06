import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; 

const useTheme = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio_theme');
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
        localStorage.setItem('portfolio_theme', newTheme);
    };

    return [theme, toggleTheme];
};

const NAV_LINKS = ['#hero', '#services', '#projects', '#contact']; 

export default function FloatingNav() {
    const [theme, toggleTheme] = useTheme();
    
    const handleLinkClick = (e, targetId) => {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const ThemeIcon = theme === 'dark' ? FiSun : FiMoon; 

    const [isAnimating, setIsAnimating] = useState(false);

    const handleThemeToggle = () => {
        setIsAnimating(true);
        toggleTheme();
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <nav className="floating-nav">
            {NAV_LINKS.map((link) => {
                const id = link.substring(1);
                return (
                    <a 
                        key={id}
                        href={link} 
                        onClick={(e) => handleLinkClick(e, id)}
                        className="" 
                    >
                        {id.charAt(0).toUpperCase() + id.slice(1)}
                    </a>
                )
            })}
            
            <button 
                id="theme-toggle" 
                className={`theme-toggle ${isAnimating ? 'rotate-active' : ''}`} 
                aria-label="Toggle Dark Mode"
                onClick={handleThemeToggle}
            >
                <span className="icon">
                    <ThemeIcon size={20} /> 
                </span>
            </button>
        </nav>
    );
}