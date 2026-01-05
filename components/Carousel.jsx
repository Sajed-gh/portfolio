import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';


export default function Carousel({
    items,
    renderItem,
    config = {}
}) {
    const {
        visibleCount = 1,
        animationSpeed = 500,
        showDots = true,
        showButtons = true,
        className = ''
    } = config;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const touchStartRef = useRef(null);
    const touchEndRef = useRef(null);
    const [displayCount, setDisplayCount] = useState(
        typeof visibleCount === 'number' ? visibleCount : 3
    );
    const carouselRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            let count;
            if (typeof visibleCount === 'object') {
                const width = window.innerWidth;
                if (width < 640) {
                    count = visibleCount.mobile || 1;
                } else if (width < 1024) {
                    count = visibleCount.tablet || 2;
                } else {
                    count = visibleCount.desktop || 3;
                }
            } else {
                count = visibleCount;
            }
            setDisplayCount(Math.min(count, items.length));
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [visibleCount]);

    const itemCount = items.length;
    const totalSlides = itemCount;

    const goToNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const goToPrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
    };

    // Listen for actual CSS transition end on the track to reliably update state
    useEffect(() => {
        const trackEl = trackRef.current;
        if (!trackEl) return;
        const onTransitionEnd = (e) => {
            if (e.propertyName === 'transform') {
                setIsTransitioning(false);
            }
        };
        trackEl.addEventListener('transitionend', onTransitionEnd);
        return () => trackEl.removeEventListener('transitionend', onTransitionEnd);
    }, [animationSpeed]);

    // Touch handling
    const handleTouchStart = (e) => {
        touchStartRef.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        touchEndRef.current = e.changedTouches[0].clientX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const touchStart = touchStartRef.current;
        const touchEnd = touchEndRef.current;
        if (touchStart == null || touchEnd == null) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrev();
        }

        touchStartRef.current = null;
        touchEndRef.current = null;
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowRight') {
                goToNext();
            } else if (e.key === 'ArrowLeft') {
                goToPrev();
            }
        };

        const carouselElement = carouselRef.current;
        if (carouselElement) {
            carouselElement.addEventListener('keydown', handleKeyPress);
            return () => carouselElement.removeEventListener('keydown', handleKeyPress);
        }
    }, [goToNext, goToPrev]);

    const offset = -currentIndex * (100 / displayCount);

    return (
        <div
            className={`carousel-wrapper ${className}`}
            ref={carouselRef}
            role="region"
            aria-label="Carousel"
            tabIndex="0"
        >
            {/* Header with Controls */}
            <div className="carousel-header">
                <div className="carousel-controls">
                    {showButtons && (
                        <>
                            <button
                                className="carousel-button prev"
                                onClick={goToPrev}
                                aria-label="Previous slide"
                                disabled={isTransitioning}
                            >
                                <FiChevronLeft size={20} />
                            </button>
                            <button
                                className="carousel-button next"
                                onClick={goToNext}
                                aria-label="Next slide"
                                disabled={isTransitioning}
                            >
                                <FiChevronRight size={20} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div
                className="carousel-container"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="carousel-track"
                    ref={trackRef}
                    style={{
                        transform: `translateX(${offset}%)`,
                        transition: isTransitioning ? `transform ${animationSpeed}ms ease-out` : 'none'
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id ?? item.key ?? index}
                            className="carousel-slide"
                            style={{
                                flex: `0 0 ${100 / displayCount}%`
                            }}
                        >
                            <div className="carousel-slide-inner">
                                {renderItem(item, index)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showDots && (
                <div className="carousel-dots" role="tablist" aria-label="Slide navigation">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-selected={index === currentIndex}
                            role="tab"
                            disabled={isTransitioning}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
