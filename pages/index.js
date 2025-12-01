import Head from 'next/head';
import { useState, useMemo, useEffect } from 'react';
import PortfolioSections from '../components/Sections';
import FloatingNav from '../components/FloatingNav';
import ProjectModal from '../components/ProjectModal';
import ScrollToTopButton from '../components/ScrollToTopButton';

// Data Fetching
export async function getStaticProps() {
    const { projectsData } = await import('../data/portfolioData');
    return {
        props: {
            projects: projectsData,
        },
    };
}

export default function Home({ projects }) {
    // --- NEW: Global Loading State ---
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a brief loading delay or wait for assets
        // This makes the transition feel smoother
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1 second load time

        return () => clearTimeout(timer);
    }, []);
    // ---------------------------------

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const handleProjectClick = (id) => {
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
                <meta name="description" content="Portfolio of Sajed — Software Engineer & AI Specialist focused on scalable web solutions and product development."/>
                <title>Portfolio — Sajed | Next.js Conversion</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>

            {/* --- NEW: Global Loader Overlay --- */}
            <div className={`global-loader ${!isLoading ? 'hidden' : ''}`}>
                <div className="spinner"></div>
            </div>
            {/* ---------------------------------- */}

            <FloatingNav />
            <PortfolioSections onProjectClick={handleProjectClick} />
            <ProjectModal 
                isOpen={modalOpen} 
                project={selectedProject} 
                onClose={handleCloseModal} 
            />
            <ScrollToTopButton />
        </>
    );
}