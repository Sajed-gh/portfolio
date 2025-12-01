// components/ProjectModal.jsx
import { useEffect, useCallback } from 'react';

export default function ProjectModal({ isOpen, project, onClose }) {
    // Escape key closes the modal (replaces main.js keydown listener)
    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // Prevents background scroll
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    // Use inline style to control visibility (overriding the CSS 'display: none')
    const modalStyle = {
        display: isOpen ? 'flex' : 'none',
        // Preserve other styles like position, inset, etc. from globals.css
    };

    if (!project) return null;

    return (
        <div id="project-modal" className="modal" style={modalStyle} onClick={(e) => {
            // Close modal on background click (replaces main.js modal listener)
            if (e.target.id === 'project-modal') onClose();
        }}>
            <div className="modal-content">
                <button id="close-modal" aria-label="Close Modal" onClick={onClose}>×</button>
                <h2 id="modal-title">{project.title}</h2>

                <div className="video-container">
                    {/* The videoUrl includes ?autoplay=1, so we just set the src */}
                    <iframe 
                        id="project-video" 
                        title="Project Demo Video" 
                        src={isOpen ? project.videoUrl : ''} // Only load/autoplay if open
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                    ></iframe>
                </div>

                <h3 style={{fontSize: '1rem', fontWeight: 500, marginTop: '15px'}}>Overview:</h3>
                <p id="modal-desc">{project.desc}</p>
                <h3 style={{fontSize: '1rem', fontWeight: 500, marginTop: '15px'}}>Tags:</h3>
                <div id="modal-tags" className="tags">
                    {project.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}