import { useEffect, useRef } from 'react';
import { contactInfo, projectsData, blogPosts } from '../data/portfolioData';
import { FiDownload } from 'react-icons/fi'; 
import { SiLinkedin, SiGithub, SiX } from 'react-icons/si'; 
import Image from 'next/image';
import Carousel from './Carousel';

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

const HeroSection = ({ setSectionRef, cvLink }) => (
    <section className="hero" id="hero" ref={setSectionRef}>
        <CVDownloadButton cvLink={cvLink} />
        <Image 
            src="/assets/images/IMG-20240517-WA0016.jpg" 
            alt="Professional Portrait of Sajed" 
            className="hero-avatar" 
            width={180} 
            height={180} 
            priority={true} 
        />
        <div>
            <h1 className="hero-title">Mohamed Sajed Gharsalli</h1>
            <p className="hero-subtitle">AI Engineer · LLM and RAG Systems Architect · Computer Vision Specialist</p>
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

const ServiceSection = ({ setSectionRef }) => (
    <section className="services" id="services" ref={setSectionRef}>
        <h2>Services</h2>
        <div className="block-list">
            <span>AI Agent Development</span>
            <span>RAG & LLM Engineering</span>
            <span>Computer Vision & OCR</span>
            <span>API Integration</span>
        </div>
    </section>
);

const ValuePropSection = ({ setSectionRef }) => (
    <section className="value-prop" ref={setSectionRef}>
        <h2>Why Partner With Me?</h2>
        <div className="block-list">
            <span>Engineering Mindset</span>
            <span>Impact-Driven Solutions</span>
            <span>Cross-Functional Collaboration</span>
            <span>Continuous AI Innovation</span>
        </div>
    </section>
);

const ProcessSection = ({ setSectionRef }) => (
    <section className="process" ref={setSectionRef}>
        <h2>My Approach</h2>
        <div className="block-list">
            <span>1. Problem Definition & System Design</span>
            <span>2. Prototyping & Iteration (MVP)</span>
            <span>3. Deployment & Integration</span>
            <span>4. Monitoring & Continuous Refinement</span>
            
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
            onClick={() => onProjectClick(project.id)}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onProjectClick(project.id);
                }
            }}
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