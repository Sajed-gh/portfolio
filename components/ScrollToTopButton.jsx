// components/ScrollToTopButton.jsx
import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Replaces window.addEventListener('scroll', ...) in main.js
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        // Replaces scrollTopBtn.addEventListener('click', ...) in main.js
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // The 'visible' class from style.css controls the opacity/visibility
    const buttonClass = isVisible ? 'scroll-top-btn visible' : 'scroll-top-btn';

    return (
        <button 
            id="scroll-to-top" 
            className={buttonClass} 
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <FiArrowUp size={24} />
        </button>
    );
}