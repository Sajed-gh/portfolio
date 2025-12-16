import { useEffect, useCallback } from 'react';

export default function ProjectModal({ isOpen, project, onClose }) {
    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    const modalStyle = {
        display: isOpen ? 'flex' : 'none',
    };

    if (!project) return null;
    
    const isLocalVideo = project.videoUrl && 
        !project.videoUrl.includes('youtube') && 
        !project.videoUrl.includes('vimeo') &&
        (project.videoUrl.endsWith('.mp4') || project.videoUrl.endsWith('.webm'));

    return (
        <div id="project-modal" className="modal" style={modalStyle} onClick={(e) => {
            if (e.target.id === 'project-modal') onClose();
        }}>
            <div className="modal-content">
                <button id="close-modal" aria-label="Close Modal" onClick={onClose}>×</button>
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
                            style={{ width: '100%', height: '100%', minHeight: '300px' }}
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
                            title="Project Demo Video"
                        />
                    )}
                </div>
                <h3 style={{fontSize: '1rem', fontWeight: 500, marginTop: '15px'}}>Overview:</h3>
                <p id="modal-desc">{project.desc}</p>
                {project.keyResults && (
                    <>
                        <h3 style={{fontSize: '1rem', fontWeight: 500, marginTop: '15px'}}>Key Results:</h3>
                        <p id="modal-key-results">{project.keyResults}</p>
                    </>
                    )}
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