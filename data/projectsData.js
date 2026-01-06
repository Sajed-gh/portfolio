export const projectsData = {
    1: {
        title: "Hestia: Heuristic Executive System for Desktop Automation",
        desc: "A voice AI agent designed for task-oriented intelligence and desktop assistance. Hestia interprets natural language commands to automate complex workflows across local applications and web services (YouTube, Gmail, Weather APIs). It features a real-time voice interface and a visual status indicator that provides feedback during task execution.",
        tags: ["Python", "Automation", "LLM", "Desktop Control", "Agentic AI", "Real-time Voice Interface", "Langgraph", "External API Integration"],
        videoUrl: "/assets/videos/hestia.mp4",
        imageThumb: "/assets/images/project_hestia_v2.png",
        keyResults: "Successfully integrated local OS automation with web-based API services, enabling a 'hands-free' workflow for creative and administrative tasks."
    },
    2: {
        title: "Holistic Real-Time Motion Tracking",
        desc: "This project is a real-time avatar mimic system that mirrors facial expressions and hand gestures on a virtual avatar. Users can see their smiles, winks, and hand movements reflected instantly, creating an interactive, playful experience.",
        keyResults: "Showcases interactive computer vision in action, with potential applications in AR/VR, virtual meetings, and gesture-controlled interfaces.",
        tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "Augmented Reality", "Real-Time Tracking"],
        videoUrl: "/assets/videos/avatar_mimic_demo.mp4",
        imageThumb: "/assets/images/avatar_mimic_thumb_v2.png"
    },
    3: {
        title: "FocusFill: AI-Powered Object Replacement",
        desc: "FocusFill is an intelligent image editing tool that combines the Segment Anything Model (SAM) with Stable Diffusion Inpainting. It allows users to select any object in an image with a single click and replace it with a text-generated alternative, seamlessly blending the new object with the existing background.",
        keyResults: "Demonstrates a 'smart Photoshop' workflow that eliminates manual masking, making high-end image manipulation accessible through simple point-and-click and text prompts.",
        tags: ["Python", "Stable Diffusion", "Segment Anything Model", "Computer Vision", "Generative AI", "Inpainting"],
        videoUrl: "/assets/videos/focusFill.mp4",
        imageThumb: "/assets/images/focusfill1.png"
    },
    4: {
        title: "Invoice Understanding: Automated Data Extraction",
        desc: "The Invoice Understanding Agent is a proof-of-concept tool designed to automate the extraction of structured information from scanned receipts and invoices. Using advanced Optical Character Recognition (OCR) and document processing, it converts unstructured images into clean, digital data—eliminating the need for manual data entry and streamlining expense management.",
        keyResults: "Successfully demonstrates the ability to extract store details, transaction timestamps, itemized lists with prices, and total calculations in under 16 seconds, providing both a human-readable UI and a developer-friendly JSON output.",
        tags: ["Python", "OCR", "Computer Vision", "Document AI", "JSON", "Automation", "Data Extraction"],
        videoUrl: "/assets/videos/billing_manager.mp4",
        imageThumb: "/assets/images/project_invoice_agent.png"
    },
    5: {
        title: "SentinelSight: Automated License Plate Recognition (ALPR)",
        desc: "This project demonstrates a high-speed traffic monitoring system that automatically detects vehicles and extracts license plate information in real-time. By utilizing advanced optical character recognition (OCR) and object detection, the system identifies registration numbers even in dense highway traffic and varying lighting conditions.",
        keyResults: "Achieved robust multi-vehicle tracking and accurate character extraction for high-speed traffic, highlighting its utility for automated tolling, security monitoring, and traffic flow analysis.",
        tags: ["Python", "OpenCV", "Deep Learning", "OCR", "YOLO", "Traffic Management", "Computer Vision"],
        videoUrl: "/assets/videos/license_plate_reading.mp4",
        imageThumb: "/assets/images/project_sentinelsight_v2.png"
    }
};

export default projectsData;
