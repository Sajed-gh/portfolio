export const projectsData = {
    1: {
        title: "Digital Mirror: Real-Time Avatar Mimic",
        desc: "This project is a real-time avatar mimic system that mirrors facial expressions and hand gestures on a virtual avatar. Users can see their smiles, winks, and hand movements reflected instantly, creating an interactive, playful experience.",
        keyResults: "Showcases interactive computer vision in action, with potential applications in AR/VR, virtual meetings, and gesture-controlled interfaces.",
        tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "Augmented Reality", "Real-Time Tracking"],
        videoUrl: "assets/videos/avatar_mimic_demo.mp4",
        thumbText: "Avatar Mimic Demo",
        role: "Lead Engineer",
        timeframe: "4 months",
        primaryMetric: "Real-time demo (interactive)",
        keyDecisions: [
            "Used MediaPipe for real-time landmark detection to minimize computational cost",
            "Offloaded animation blending to the client for lower server load"
        ]
    },
    2: {
        title: "LexiScan: Automated Document Processor",
        desc: "An internal enterprise tool built to streamline invoice and purchase order processing. It uses custom AI models (via Python/TensorFlow) to identify key fields (vendor, date, amount) in scanned documents, reducing manual data entry. **Key Result:** Reduced the accounting team's document processing time by approximately 8 hours per week.",
        tags: ["AI", "Python", "TensorFlow", "FastAPI", "PostgreSQL"],
        videoUrl: "assets/videos/test.mp4",
        thumbText: "AI Document Processor",
        role: "Lead Engineer",
        timeframe: "6 months",
        primaryMetric: "Saved ~8 hrs/week",
        keyDecisions: [
            "Chose custom TensorFlow models for domain-specific accuracy improvements",
            "Implemented pragmatic human-in-the-loop review to reduce false positives"
        ]
    },
};

export default projectsData;
