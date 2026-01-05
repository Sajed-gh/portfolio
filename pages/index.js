import Head from 'next/head';
import { useState, useMemo } from 'react';
import PortfolioSections from '../components/Sections';
import FloatingNav from '../components/FloatingNav';
import ProjectModal from '../components/ProjectModal';
import ScrollToTopButton from '../components/ScrollToTopButton';

export async function getStaticProps() {
    const { projectsData } = await import('../data/projectsData');
    return { props: { projects: projectsData } };
}

export default function Home({ projects }) {
    // No initial splash loader — render immediately

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const [returnFocusTo, setReturnFocusTo] = useState(null);

    const handleProjectClick = (id, originatingElement) => {
        // capture the originating element so we can return focus when modal closes
        setReturnFocusTo(originatingElement || document.activeElement);
        setSelectedProjectId(id);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProjectId(null); 
    };
    
    const selectedProject = useMemo(() => {
        return projects[selectedProjectId];
    }, [projects, selectedProjectId]);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <title>Mohamed Sajed Gharsalli | AI Engineer & Full Stack Developer</title>
                <meta name="description" content="The portfolio of Mohamed Sajed Gharsalli. Exploring the intersection of AI, Computer Vision, and scalable Web Development to build the next generation of digital products."/>
                <meta name="keywords" content="AI Engineer, Full Stack Developer, Computer Vision, Next.js, React, Python, TensorFlow, Machine Learning, Web Development, Portfolio" />
                <meta name="author" content="Mohamed Sajed Gharsalli" />
                <link rel="canonical" href="https://sajed-gh.com" />
                
                {/* Open Graph Tags */}
                <meta property="og:title" content="Mohamed Sajed Gharsalli | AI Engineer & Full Stack Developer" />
                <meta property="og:description" content="Exploring the intersection of AI, Computer Vision, and scalable Web Development." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sajed-gh.com" />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Mohamed Sajed Gharsalli | Portfolio" />
                <meta name="twitter:description" content="AI Engineer & Full Stack Developer. View my projects and writing." />
                
            </Head>

            {/* loader removed to avoid initial splash — page renders immediately */}

            <FloatingNav />
            <PortfolioSections onProjectClick={handleProjectClick} />
            {modalOpen && selectedProject && (
                <ProjectModal 
                    isOpen={modalOpen} 
                    project={selectedProject} 
                    onClose={handleCloseModal}
                    returnFocusTo={returnFocusTo}
                />
            )}
            <ScrollToTopButton />
        </>
    );
}