import { useEffect, useCallback, useRef } from 'react';
import { FiX } from 'react-icons/fi';

export default function ProjectModal({ isOpen, project, onClose, returnFocusTo }) {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const prevFocusRef = useRef(null);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            onClose();
        }
        if (e.key === 'Tab') {
            const container = contentRef.current;
            if (!container) return;
            const focusable = container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
            const focusableArr = Array.prototype.slice.call(focusable);
            if (focusableArr.length === 0) {
                e.preventDefault();
                return;
            }
            const idx = focusableArr.indexOf(document.activeElement);
            if (e.shiftKey) {
                if (idx <= 0) {
                    focusableArr[focusableArr.length - 1].focus();
                    e.preventDefault();
                }
            } else {
                if (idx === focusableArr.length - 1) {
                    focusableArr[0].focus();
                    e.preventDefault();
                }
            }
        }
    }, [onClose]);

    useEffect(() => {
        if (!isOpen || !project) return;

        prevFocusRef.current = returnFocusTo || document.activeElement;

        document.addEventListener('keydown', handleKeyDown);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            const container = contentRef.current;
            const firstFocusable = container && container.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            } else if (overlayRef.current) {
                overlayRef.current.focus();
            }
        });

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow || 'unset';
            document.body.style.overflow = originalOverflow || 'unset';
            try {
                prevFocusRef.current && prevFocusRef.current.focus && prevFocusRef.current.focus();
            } catch (err) {
            }
        };
    }, [handleKeyDown, returnFocusTo, isOpen, project]);

    if (!isOpen || !project) return null;


    return (
        <div id="project-modal" className="modal open" ref={overlayRef} onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
        }} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-content" ref={contentRef}>
                <button id="close-modal" aria-label="Close Modal" onClick={onClose}>
                    <FiX size={24} />
                </button>
                <h2 id="modal-title">{project.title}</h2>



                <div className="video-container">
                    {project.videoUrl && (project.videoUrl.includes('youtube') || project.videoUrl.includes('vimeo')) ? (
                        <iframe
                            className="video-frame"
                            src={project.videoUrl}
                            title="Project Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <video 
                            id="project-video" 
                            controls 
                            autoPlay={isOpen} 
                            loop 
                            muted 
                            playsInline
                            src={project.videoUrl}
                            poster={project.imageThumb}
                            title="Project Demo Video"
                        />
                    )}
                </div>

                <h3 className="modal-subheading">Problem & Context</h3>
                <p id="modal-desc">{project.desc}</p>

                {project.keyDecisions && project.keyDecisions.length > 0 && (
                    <>
                        <h3 className="modal-subheading">Key Decisions</h3>
                        <ul className="key-decisions">
                            {project.keyDecisions.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </>
                )}

                {project.keyResults && (
                    <>
                        <h3 className="modal-subheading">Results</h3>
                        <p id="modal-key-results">{project.keyResults}</p>
                    </>
                )}

                <h3 className="modal-subheading">Tags:</h3>
                <div id="modal-tags" className="tags">
                    {project.tags?.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}