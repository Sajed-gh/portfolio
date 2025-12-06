// components/ScrollToTopButton.jsx (Updated)
import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    // NEW: State to track scroll progress percentage
    const [scrollProgress, setScrollProgress] = useState(0); 

    useEffect(() => {
        const toggleVisibility = () => {
            // Calculate scroll progress (0 to 100)
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = window.scrollY;
            // Ensure progress is not NaN and is between 0 and 100
            const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
            
            setScrollProgress(progress);
            
            // Toggle visibility based on scroll position
            if (scrolled > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        // Initialize the progress on mount
        toggleVisibility(); 
        
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const buttonClass = isVisible ? 'scroll-top-btn visible' : 'scroll-top-btn';
    
    // --- Progress Calculation for SVG ---
    const radius = 22; // Half of (Button Width - Stroke Width/2) approx
    const circumference = 2 * Math.PI * radius;
    // The offset dictates how much of the line is NOT drawn
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <button 
            id="scroll-to-top" 
            className={buttonClass} 
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            {/* NEW: SVG for Circular Progress Bar */}
            <svg className="scroll-progress-svg" width="50" height="50" viewBox="0 0 50 50">
                {/* Progress Track (The full circle) */}
                <circle 
                    className="progress-track"
                    cx="25" 
                    cy="25" 
                    r={radius} 
                />
                {/* Progress Indicator (The filling line) */}
                <circle 
                    className="progress-indicator"
                    cx="25" 
                    cy="25" 
                    r={radius} 
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: strokeDashoffset,
                    }}
                />
            </svg>
            {/* Arrow icon is wrapped to ensure it sits above the SVG */}
            <div className="scroll-arrow-icon">
                <FiArrowUp size={24} />
            </div>
        </button>
    );
}