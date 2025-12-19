// components/ScrollToTopButton.jsx (Updated)
import { useState, useEffect, useRef } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    // NEW: State to track scroll progress percentage
    const [scrollProgress, setScrollProgress] = useState(0); 

    const tickingRef = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (tickingRef.current) return;
            tickingRef.current = true;
            requestAnimationFrame(() => {
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = window.scrollY;
                const progressRaw = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
                const progress = Math.min(100, Math.max(0, progressRaw));

                setScrollProgress(progress);
                setIsVisible(scrolled > 400);
                tickingRef.current = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initialize the progress on mount
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
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