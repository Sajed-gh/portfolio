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
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const [returnFocusTo, setReturnFocusTo] = useState(null);

    const handleProjectClick = (id, originatingElement) => {
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
                <title>Mohamed Sajed Gharsalli</title>
                <meta name="description" content="The portfolio of Mohamed Sajed Gharsalli. Exploring the intersection of AI, Computer Vision, and scalable Agentic AI to build the next generation of digital products."/>
                <meta name="keywords" content="AI Engineer, Full Stack Developer, Computer Vision, Python, TensorFlow, Machine Learning, Portfolio" />
                <meta name="author" content="Mohamed Sajed Gharsalli" />
                <link rel="canonical" href="https://sajed-gh.com" />
                

                <meta property="og:title" content="Mohamed Sajed Gharsalli" />
                <meta property="og:description" content="Mohamed Sajed Gharsalli" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sajed-gh.com" />
                

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Mohamed Sajed Gharsalli" />
                <meta name="twitter:description" content="View my projects and writing." />
                
            </Head>



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