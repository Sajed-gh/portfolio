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
        
        // INTERSECTION OBSERVER
        // Center-line detection (-50% top and bottom margin). 
        // A section activates when it crosses the middle of the screen.
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        }, { 
            rootMargin: '-50% 0px -50% 0px', 
            threshold: 0 
        });

        sections.forEach(section => observer.observe(section));

        // SCROLL LISTENER (Bottom Fallback)
        // Forces the last section (Contact) to be active when reaching the bottom of the page.
        // This fixes the issue where short footer sections don't trigger the Observer zone.
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const bodyHeight = document.documentElement.scrollHeight;

            // If we are within 20px of the bottom
            if (scrollPosition >= bodyHeight - 20) {
                const lastSectionId = sectionIds[sectionIds.length - 1];
                setActiveId(lastSectionId);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
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


// Define all navigation links (IDs must match section IDs in Sections.jsx)
const NAV_LINKS = ['#hero', '#services', '#projects', '#contact']; 

export default function FloatingNav() {
    const [theme, toggleTheme] = useTheme();
    
    // Use the new hook to track the active section
    const activeSection = useActiveSection(NAV_LINKS); 

    const handleLinkClick = (e, targetId) => {
        e.preventDefault();
        // Guard existence before scrolling
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const ThemeIcon = theme === 'dark' ? FiSun : FiMoon; 

    const [isAnimating, setIsAnimating] = useState(false);

    const handleThemeToggle = () => {
        setIsAnimating(true);
        toggleTheme();
        setTimeout(() => setIsAnimating(false), 500); // Duration matches CSS animation
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
                        className={activeSection === id ? 'active' : ''} 
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