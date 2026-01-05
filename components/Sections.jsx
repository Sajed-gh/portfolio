// components/Sections.jsx

import { useEffect, useRef, useState } from 'react'; 
import { contactInfo } from '../data/contactInfo';
import { projectsData } from '../data/projectsData';
import { blogPosts } from '../data/blogPosts';
import { HERO_ROLES } from '../data/heroData';
import { serviceData } from '../data/servicesData';
import { valuePropData } from '../data/valuePropData';
import { processData } from '../data/processData';
import { 
    FiCpu, FiMessageSquare, FiEye, FiCode,
    FiZap, FiTarget, FiUsers, FiRefreshCw,
    FiSearch, FiTrello, FiUploadCloud, FiActivity
} from 'react-icons/fi'; 
import { SiLinkedin, SiGithub, SiX } from 'react-icons/si'; 
import Image from 'next/image';
import Carousel from './Carousel';

const IconMap = {
    FiCpu, FiMessageSquare, FiEye, FiCode,
    FiZap, FiTarget, FiUsers, FiRefreshCw,
    FiSearch, FiTrello, FiUploadCloud, FiActivity,
};

const useSectionReveal = () => {
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        sectionRefs.current.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const setSectionRef = (el) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current.push(el);
        }
    };

    return setSectionRef;
};

// HERO roles and section data are now imported from data/*.js

const HeroSection = ({ setSectionRef, cvLink }) => {
    
    const [currentText, setCurrentText] = useState(""); 
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0); 
    const [isDeleting, setIsDeleting] = useState(false); 
    
    useEffect(() => {
        let timer;
        const currentRole = HERO_ROLES[roleIndex % HERO_ROLES.length];
        
        const typeSpeed = 50 + Math.random() * 50; 
        const deleteSpeed = 40;
        const pauseEnd = 2000;
        const pauseStart = 500;

        if (!isDeleting && charIndex < currentRole.length) {
            timer = setTimeout(() => {
                setCurrentText(currentRole.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, typeSpeed);

        } else if (isDeleting && charIndex > 0) {
            timer = setTimeout(() => {
                setCurrentText(currentRole.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            }, deleteSpeed);

        } else if (!isDeleting && charIndex === currentRole.length) {
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, pauseEnd);

        } else if (isDeleting && charIndex === 0) {
            timer = setTimeout(() => {
                setIsDeleting(false);
                setRoleIndex(prev => prev + 1);
            }, pauseStart); 
        }

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, roleIndex]);

    return (
        <section className="hero" id="hero" ref={setSectionRef}>
            <div className="hero-avatar-wrapper">
                <Image 
                    src="/assets/images/hero_img.jpg" 
                    alt="Mohamed Sajed Gharsalli - AI Engineer" 
                    className="hero-avatar" 
                    width={180} 
                    height={180} 
                    priority={true} 
                />
            </div>
            <div>
                <h1 className="hero-name u-fade-in">Mohamed Sajed Gharsalli</h1>
                
                <p className="hero-subtitle">
                    {currentText}
                    <span className="typing-cursor">|</span> 
                </p>
                
                <p className="hero-copy">I transform complex data into intelligent, scalable systems. Bridging the gap between AI research and production, I build impactful solutions that solve real-world problems.</p>
                
                
                <div className="cta-buttons">
                    <a href={contactInfo.calendly} target="_blank" rel="noopener noreferrer" className="btn primary" aria-label="Book a Call">Book a Call</a>
                    <a href="#projects" className="btn" aria-label="View Selected Work">View Featured Work</a>
                </div>
            </div>
        </section>
    );
};

const ServiceSection = ({ setSectionRef }) => (
    <section className="services" id="services" ref={setSectionRef}>
        <h2 className="u-fade-in">What I Build</h2>
        <div className="block-list services-grid"> 
            {serviceData.map((item) => {
                const IconComponent = IconMap[item.icon];
                return (
                    <div key={item.title} className="service-card matrix-card" tabIndex="0"> 
                        <div className="service-header">
                            {IconComponent && (
                                <div className="service-icon-wrapper">
                                    <IconComponent size={24} />
                                </div>
                            )}
                            <p className="service-title">{item.title}</p>
                        </div>
                        <p className="service-desc">{item.desc}</p>
                    </div>
                );
            })}
        </div>
    </section>
);

const ValuePropSection = ({ setSectionRef }) => (
    <section className="value-prop" ref={setSectionRef}>
        <h2 className="u-fade-in">What Sets Me Apart</h2>
        <div className="block-list value-list">
            {valuePropData.map((item) => {
                const IconComponent = IconMap[item.icon];
                return (
                    <div key={item.title} className="service-card list-card" tabIndex="0"> 
                        <div className="service-header">
                            {IconComponent && (
                                <div className="service-icon-wrapper">
                                    <IconComponent size={24} />
                                </div>
                            )}
                            <p className="service-title">{item.title}</p>
                        </div>
                        <p className="service-desc">{item.desc}</p>
                    </div>
                );
            })}
        </div>
    </section>
);

const ProcessSection = ({ setSectionRef }) => (
    <section className="process" ref={setSectionRef}>
        <h2 className="u-fade-in">Four Steps to Success</h2>
        <div className="block-list process-timeline">
            {processData.map((item) => {
                const IconComponent = IconMap[item.icon];
                return (
                    <div key={item.title} className="service-card timeline-card" tabIndex="0"> 
                        <div className="service-header">
                            {IconComponent && (
                                <div className="service-icon-wrapper">
                                    <IconComponent size={30} />
                                </div>
                            )}
                            <p className="service-title">{item.title}</p>
                        </div>
                        <p className="service-desc">{item.desc}</p>
                    </div>
                );
            })}
        </div>
    </section>
);

const ProjectsSection = ({ setSectionRef, onProjectClick }) => {
    const projects = Object.entries(projectsData).map(([id, project]) => ({
        id,
        ...project
    }));

    const renderProjectCard = (project) => (
        <div 
            className="project-card" 
            data-project={project.id} 
            onClick={(e) => onProjectClick(project.id, e.currentTarget)}
            role="button"
            tabIndex="0"
            aria-label={`Open project ${project.title}`}
        >
            <div className="project-thumb">
                {project.imageThumb ? (
                    <Image 
                        src={project.imageThumb} 
                        alt={project.title} 
                        fill 
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <span>{project.title}</span>
                )}
            </div>
            <h3>{project.title}</h3>
            {project.keyResults && (
                <div className="project-results-preview">
                    {project.keyResults}
                </div>
            )}
            <div className="tags">
                {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
                {project.tags.length > 3 && <span className="tag">...</span>}
            </div>
        </div>
    );

    return (
        <section className="projects" id="projects" ref={setSectionRef}>
            <h2 className="u-fade-in">Featured Work</h2>
            <Carousel
                items={projects}
                renderItem={renderProjectCard}
                config={{
                    visibleCount: 1,
                    animationSpeed: 500,
                    showDots: true,
                    showButtons: true,
                    className: 'projects-carousel'
                }}
            />
        </section>
    );
};

const BlogSection = ({ setSectionRef }) => {
    const renderBlogCard = (post) => (
        <a href={post.link} target="_blank" rel="noopener noreferrer" className="blog-card">
            <div className="blog-thumb">
                {post.imageThumb ? (
                    <Image 
                        src={post.imageThumb} 
                        alt={post.title} 
                        fill 
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <span>{post.title}</span>
                )}
            </div>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <span className="blog-date">{post.date}</span>
        </a>
    );

    return (
        <section className="blogs" id="blogs" ref={setSectionRef}>
            <h2 className="u-fade-in">Insights</h2>
            <Carousel
                items={blogPosts}
                renderItem={renderBlogCard}
                config={{
                    visibleCount: 1,
                    animationSpeed: 500,
                    showDots: true,
                    showButtons: true,
                    className: 'blogs-carousel'
                }}
            />
        </section>
    );
};

const PresenceSection = ({ setSectionRef, links }) => (
    <section className="presence" ref={setSectionRef}>
        <h2 className="u-fade-in">Connect With Me</h2>
        <p>Connect with me on my platforms.</p>
        <div className="presence-links">
            
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                <SiLinkedin size={20} />
                LinkedIn
            </a>
            
            <a href={links.x} target="_blank" rel="noopener noreferrer">
                <SiX size={20} />
                X
            </a>
            
            
            <a href={links.github} target="_blank" rel="noopener noreferrer">
                <SiGithub size={20} />
                GitHub
            </a>
            
        </div>
    </section>
);

const LetsWorkSection = ({ setSectionRef, links }) => (
    <section className="lets-work" id="contact" ref={setSectionRef}>
        <h2 className="u-fade-in">Let's Build Something Great</h2>
        <p>I'm available for freelance projects and full-time roles. Reach out!</p>
        <div className="cta-buttons">
            <a href={`mailto:${links.email}`} className="btn" aria-label={`Email ${links.email}`}>Email Me</a>
            <a href={links.calendly} target="_blank" rel="noopener noreferrer" className="btn primary" aria-label="Schedule a meeting">Schedule Meeting</a>
        </div>
    </section>
);


// --- Main Exported Component ---

export default function PortfolioSections({ onProjectClick }) {
    const setSectionRef = useSectionReveal();
    
    return (
        <main>
            <HeroSection setSectionRef={setSectionRef} cvLink={contactInfo.cvUrl} />
            <ServiceSection setSectionRef={setSectionRef} />
            <ValuePropSection setSectionRef={setSectionRef} />
            <ProcessSection setSectionRef={setSectionRef} />
            <ProjectsSection setSectionRef={setSectionRef} onProjectClick={onProjectClick} />
            <BlogSection setSectionRef={setSectionRef} />
            <PresenceSection setSectionRef={setSectionRef} links={contactInfo} />
            <LetsWorkSection setSectionRef={setSectionRef} links={contactInfo} />
        </main>
    );
}