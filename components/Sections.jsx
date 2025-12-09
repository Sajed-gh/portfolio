// components/Sections.jsx

import { useEffect, useRef, useState } from 'react'; 
import { contactInfo, projectsData, blogPosts } from '../data/portfolioData';
// Import necessary icons
import { 
    FiDownload, FiCpu, FiMessageSquare, FiEye, FiCode, // Services
    FiZap, FiTarget, FiUsers, FiRefreshCw, // Value Props
    FiSearch, FiTrello, FiUploadCloud, FiActivity // Process Steps
} from 'react-icons/fi'; 
import { SiLinkedin, SiGithub, SiX } from 'react-icons/si'; 
import Image from 'next/image';
import Carousel from './Carousel';

// --- Icon Map for dynamic rendering ---
const IconMap = {
    FiCpu, FiMessageSquare, FiEye, FiCode,
    FiZap, FiTarget, FiUsers, FiRefreshCw,
    FiSearch, FiTrello, FiUploadCloud, FiActivity,
};

// --- DATA STRUCTURES (Simulated) ---

const serviceData = [
    { title: "AI Agent Development", icon: "FiCpu", desc: "Building goal-oriented, autonomous systems for task execution and decision-making." },
    { title: "RAG & LLM Engineering", icon: "FiMessageSquare", desc: "Creating robust, context-aware LLM applications powered by retrieval-augmented generation." },
    { title: "Computer Vision & OCR", icon: "FiEye", desc: "Implementing solutions for image recognition, object detection, and document data extraction." },
    { title: "API Integration", icon: "FiCode", desc: "Connecting modern AI systems with existing software architecture and third-party services." },
];

const valuePropData = [
    { title: "Engineering Mindset", icon: "FiZap", desc: "Focus on performance, scalability, and maintainability from day one." },
    { title: "Impact-Driven Solutions", icon: "FiTarget", desc: "Prioritizing features that deliver measurable business value and ROI." },
    { title: "Cross-Functional Collaboration", icon: "FiUsers", desc: "Seamless integration with your existing product and engineering teams." },
    { title: "Continuous AI Innovation", icon: "FiRefreshCw", desc: "Staying current with the latest ML research to future-proof your product." },
];

const processData = [
    { title: "1. Problem Definition & Design", icon: "FiSearch", desc: "Scoping requirements and designing the AI system architecture." },
    { title: "2. Prototyping & Iteration (MVP)", icon: "FiTrello", desc: "Rapid development and testing of a Minimum Viable Product." },
    { title: "3. Deployment & Integration", icon: "FiUploadCloud", desc: "Seamlessly pushing the solution into your live production environment." },
    { title: "4. Monitoring & Refinement", icon: "FiActivity", desc: "Tracking performance and making data-driven improvements post-launch." },
];

// ------------------------------------------------------------------


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


const CVDownloadButton = ({ cvLink }) => (
    <div className="cv-download-container">
        <a id="cv-download-link" href={cvLink} download className="download-btn" aria-label="Download My CV">
            <span className="icon">
                <FiDownload size={18} />
            </span>
            <span className="text">Get My CV</span>
        </a>
    </div>
);

const HeroSection = ({ setSectionRef, cvLink }) => {
    
    // Typing Effect Logic
    const roles = ["AI Engineer", "LLM Systems Architect", "Computer Vision Specialist"];
    
    const [currentText, setCurrentText] = useState(roles[0]);
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(roles[0].length);
    const [isDeleting, setIsDeleting] = useState(true); 
    
    useEffect(() => {
        let timer;
        const currentRole = roles[roleIndex % roles.length];
        const typingSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex < currentRole.length) {
            // Typing
            timer = setTimeout(() => {
                setCurrentText(currentRole.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            timer = setTimeout(() => {
                setCurrentText(currentRole.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            }, typingSpeed / 2);
        } else if (!isDeleting && charIndex === currentRole.length) {
            // Pause before deleting
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, 1500);
        } else if (isDeleting && charIndex === 0) {
            // Done deleting, move to next word
            setIsDeleting(false);
            setRoleIndex(prev => prev + 1);
        }

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, roleIndex, roles]);

    return (
        <section className="hero" id="hero" ref={setSectionRef}>
            <CVDownloadButton cvLink={cvLink} />
            <Image 
                src="/assets/images/hero_img.jpg" 
                alt="Professional Portrait of Sajed" 
                className="hero-avatar" 
                width={180} 
                height={180} 
                priority={true} 
            />
            <div>
                <h1 className="hero-title">Mohamed Sajed Gharsalli</h1>
                
                {/* Dynamically display the typed text and cursor */}
                <p className="hero-subtitle">
                    {currentText}
                    <span className="typing-cursor">|</span> 
                </p>
                
                <p className="hero-copy">I specialize in transforming complex data into scalable, intelligent systems that solve real-world problems. Proven ability to bridge the gap between AI research and practical, impactful product development.</p>
                
                <div className="hero-stats">
                    <div className="stat-item">
                        <div className="stat-number">1+</div>
                        <div className="stat-label">Years of Experience</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">10+</div>
                        <div className="stat-label">Projects Completed</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">90%</div>
                        <div className="stat-label">Accuracy Achieved</div>
                    </div>
                </div>
                
                <div className="cta-buttons">
                    <a href={`mailto:${contactInfo.email}`} className="btn">Email Me</a>
                    <a href={contactInfo.calendly} target="_blank" rel="noopener noreferrer" className="btn primary">Schedule Meeting</a>
                </div>
            </div>
        </section>
    );
};


// ------------------------------------------------------------------
// ServiceSection MODIFIED: Added .service-header wrapper
// ------------------------------------------------------------------
const ServiceSection = ({ setSectionRef }) => (
    <section className="services" id="services" ref={setSectionRef}>
        <h2>Services</h2>
        <div className="block-list service-card-list-override"> 
            {serviceData.map((item, index) => {
                const IconComponent = IconMap[item.icon];
                return (
                    <div key={index} className="service-card" tabIndex="0"> 
                        <div className="service-header"> {/* NEW WRAPPER */}
                            {IconComponent && (
                                <div className="service-icon-wrapper">
                                    <IconComponent size={30} />
                                </div>
                            )}
                            <p className="service-title">{item.title}</p>
                        </div> {/* END NEW WRAPPER */}
                        <p className="service-desc">{item.desc}</p>
                    </div>
                );
            })}
        </div>
    </section>
);
// ------------------------------------------------------------------


// ------------------------------------------------------------------
// ------------------------------------------------------------------
const ValuePropSection = ({ setSectionRef }) => (
    <section className="value-prop" ref={setSectionRef}>
        <h2>Why Partner With Me?</h2>
        <div className="block-list service-card-list-override">
            {valuePropData.map((item, index) => {
                const IconComponent = IconMap[item.icon];
                return (
                    <div key={index} className="service-card" tabIndex="0"> 
                        <div className="service-header"> {/* NEW WRAPPER */}
                            {IconComponent && (
                                <div className="service-icon-wrapper">
                                    <IconComponent size={30} />
                                </div>
                            )}
                            <p className="service-title">{item.title}</p>
                        </div> {/* END NEW WRAPPER */}
                        <p className="service-desc">{item.desc}</p>
                    </div>
                );
            })}
        </div>
    </section>
);
// ------------------------------------------------------------------


// ------------------------------------------------------------------
// ProcessSection MODIFIED: Added .service-header wrapper
// ------------------------------------------------------------------
const ProcessSection = ({ setSectionRef }) => (
    <section className="process" ref={setSectionRef}>
        <h2>My Approach</h2>
        <div className="block-list service-card-list-override">
            {processData.map((item, index) => {
                const IconComponent = IconMap[item.icon];
                return (
                    <div key={index} className="service-card" tabIndex="0"> 
                        <div className="service-header"> {/* NEW WRAPPER */}
                            {IconComponent && (
                                <div className="service-icon-wrapper">
                                    <IconComponent size={30} />
                                </div>
                            )}
                            <p className="service-title">{item.title}</p>
                        </div> {/* END NEW WRAPPER */}
                        <p className="service-desc">{item.desc}</p>
                    </div>
                );
            })}
        </div>
    </section>
);
// ------------------------------------------------------------------


const ProjectsSection = ({ setSectionRef, onProjectClick }) => {
    const projects = Object.entries(projectsData).map(([id, project]) => ({
        id,
        ...project
    }));

    const renderProjectCard = (project) => (
        <div 
            className="project-card" 
            data-project={project.id} 
            onClick={() => onProjectClick(project.id)}
            role="button"
            tabIndex="0"
        >
            <div className="project-thumb">{project.thumbText}</div>
            <h3>{project.title}</h3>
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
            <h2>Latest Work</h2>
            <Carousel
                items={projects}
                renderItem={renderProjectCard}
                config={{
                    visibleCount: { desktop: 1, tablet: 1, mobile: 1 },
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
        <a href="#" className="blog-card">
            <div className="blog-thumb">{post.thumbText}</div>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <span className="blog-date">{post.date}</span>
        </a>
    );

    return (
        <section className="blogs" id="blogs" ref={setSectionRef}>
            <h2>From the Blog</h2>
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
        <h2>Online Presence</h2>
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
        <h2>Let's Work Together</h2>
        <p>I'm available for freelance projects and full-time roles. Reach out!</p>
        <div className="cta-buttons">
            <a href={`mailto:${links.email}`} className="btn">Email Me</a>
            <a href={links.calendly} target="_blank" rel="noopener noreferrer" className="btn primary">Schedule Meeting</a>
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