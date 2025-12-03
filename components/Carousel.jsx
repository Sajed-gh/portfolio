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
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [displayCount, setDisplayCount] = useState(
        typeof visibleCount === 'number' ? visibleCount : 3
    );
    const carouselRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (typeof visibleCount === 'object') {
                const width = window.innerWidth;
                if (width < 640) {
                    setDisplayCount(visibleCount.mobile || 1);
                } else if (width < 1024) {
                    setDisplayCount(visibleCount.tablet || 2);
                } else {
                    setDisplayCount(visibleCount.desktop || 3);
                }
            } else {
                setDisplayCount(visibleCount);
            }
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, animationSpeed);

        return () => clearTimeout(timer);
    }, [currentIndex, animationSpeed]);

    // Touch handling
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        setTouchEnd(e.changedTouches[0].clientX);
        handleSwipe();
    };

    const handleSwipe = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrev();
        }

        setTouchStart(null);
        setTouchEnd(null);
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
    }, []);

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
                    style={{
                        transform: `translateX(${offset}%)`,
                        transition: isTransitioning ? `transform ${animationSpeed}ms ease-out` : 'none'
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
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
