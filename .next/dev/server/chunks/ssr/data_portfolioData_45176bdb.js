module.exports = [
"[project]/data/portfolioData.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blogPosts",
    ()=>blogPosts,
    "contactInfo",
    ()=>contactInfo,
    "projectsData",
    ()=>projectsData
]);
const contactInfo = {
    // Contact Information
    email: 'sajed@sajed-gh.com',
    calendly: 'https://calendly.com/mohamedsajed-gharsalli/30min',
    linkedin: 'https://www.linkedin.com/in/mohamed-sajed-gharsalli/',
    x: 'https://x.com/sajed',
    github: 'https://github.com/Sajed-gh',
    // File Paths
    cvUrl: 'assets/documents/autoCV.pdf'
};
const projectsData = {
    1: {
        title: "The Insight Platform: E-commerce Analytics",
        desc: "This platform was developed for a client to consolidate sales and traffic data from multiple sources (Shopify, Google Analytics) into a single, real-time dashboard. The goal was to provide small business owners with actionable insights without needing dedicated analysts. **Key Result:** Client reported a 25% increase in conversion rate within the first quarter due to data-driven product adjustments.",
        tags: [
            "React",
            "Redux",
            "Node.js",
            "MongoDB",
            "Chart.js"
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
        thumbText: "Analytics Dashboard UI"
    },
    2: {
        title: "LexiScan: Automated Document Processor",
        desc: "An internal enterprise tool built to streamline invoice and purchase order processing. It uses custom AI models (via Python/TensorFlow) to identify key fields (vendor, date, amount) in scanned documents, reducing manual data entry. **Key Result:** Reduced the accounting team's document processing time by approximately 8 hours per week.",
        tags: [
            "AI",
            "Python",
            "TensorFlow",
            "FastAPI",
            "PostgreSQL"
        ],
        videoUrl: "https://www.youtube.com/embed/BwXGz9r3e2M?autoplay=1",
        thumbText: "AI Document Processor"
    }
};
const blogPosts = [
    {
        id: 1,
        title: "Scaling Next.js with Serverless Functions",
        date: "May 20, 2024",
        summary: "A deep dive into optimizing API routes for high traffic.",
        thumbText: "Serverless Architecture"
    },
    {
        id: 2,
        title: "The Power of Custom React Hooks",
        date: "April 15, 2024",
        summary: "How to simplify complex component logic with hooks.",
        thumbText: "React Hook Illustration"
    }
];
}),
];

//# sourceMappingURL=data_portfolioData_45176bdb.js.map