// components/FloatingNav.jsx

import { useEffect, useState, useMemo } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; 


// --- NEW Hook for Scroll-Activated Navigation ---
const useActiveSection = (links) => {
    // Extract section IDs from links (e.g., '#hero' -> 'hero')
    const sectionIds = useMemo(() => links.map(link => link.substring(1)), [links]);
    
    // Initialize with the first link ID
    const [activeId, setActiveId] = useState(sectionIds[0]); 
    
    useEffect(() => {
        // Get all relevant section elements
        const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
        
        // Define options for IntersectionObserver
        // rootMargin: '-30% 0px -70% 0px' creates a vertical detection window 
        // that is 30% from the top and 70% from the bottom of the viewport.
        // This ensures a section is marked 'active' when it enters the upper part of the screen.
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // If section is currently visible within the defined rootMargin
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        }, { 
            rootMargin: '-30% 0px -70% 0px', 
            threshold: 0 
        });

        // Observe all sections
        sections.forEach(section => observer.observe(section));

        // Cleanup function
        return () => observer.disconnect();
    }, [sectionIds]);

    return activeId;
};
// --- END NEW Hook ---


// useTheme hook remains unchanged
const useTheme = () => {
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
    
    // Define all navigation links (IDs must match section IDs in Sections.jsx)
    const navLinks = ['#hero', '#services', '#projects', '#contact']; 
    
    // Use the new hook to track the active section
    const activeSection = useActiveSection(navLinks); 

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        // Uses smooth scroll
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const ThemeIcon = theme === 'dark' ? FiSun : FiMoon; 

    return (
        <nav className="floating-nav">
            {navLinks.map((link, index) => {
                const id = link.substring(1);
                return (
                    <a 
                        key={index}
                        href={link} 
                        onClick={(e) => handleScroll(e, id)}
                        className={activeSection === id ? 'active' : ''} 
                    >
                        {id.charAt(0).toUpperCase() + id.slice(1)}
                    </a>
                )
            })}
            
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