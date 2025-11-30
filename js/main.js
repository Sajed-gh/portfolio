// Import the global configuration variables
import { contactInfo } from '../data/config.js';

// INITIALIZATION: Runs when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme
    initializeTheme();
    
    // 2. Inject Contact Info (and CV Link)
    // contactInfo is now loaded from data/config.js
    injectContactInfo();

    // 3. Fetch Project Data and Initialize Modals
    fetchProjectDataAndInitialize();
});

/* THEME TOGGLE LOGIC */
const themeToggle = document.getElementById('theme-toggle');

const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('.icon').textContent = '☀️';
    } else {
        themeToggle.querySelector('.icon').textContent = '🌙';
    }
};

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Update icon and save preference
    if (isDarkMode) {
        localStorage.setItem('theme', 'dark');
        themeToggle.querySelector('.icon').textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.querySelector('.icon').textContent = '🌙';
    }
});

/* CONTACT INFO INJECTION */
const injectContactInfo = () => {
    // FIX: Using class selector to target all 'Email Me' buttons correctly.
    document.querySelectorAll('.cta-email-link').forEach(el => {
        el.href = `mailto:${contactInfo.email}?subject=Portfolio Inquiry`;
    });
    // FIX: Using class selector to target all 'Schedule Meeting' buttons correctly.
    document.querySelectorAll('.cta-schedule-link').forEach(el => {
        el.href = contactInfo.calendly;
    });

    // Presence Links
    const linkLinkedin = document.getElementById('link-linkedin');
    const linkX = document.getElementById('link-x');
    const linkGithub = document.getElementById('link-github');
    if (linkLinkedin) linkLinkedin.href = contactInfo.linkedin;
    if (linkX) linkX.href = contactInfo.x;
    if (linkGithub) linkGithub.href = contactInfo.github;

    // Inject CV Link
    const cvLink = document.getElementById('cv-download-link');
    if (cvLink) {
        // Ensure the correct URL is applied from the contactInfo object
        cvLink.href = contactInfo.cvUrl; 
        // Ensure the download attribute is present
        cvLink.setAttribute('download', 'Mohamed_Sajed_CV.pdf');
    }
};

/* PROJECT DATA FETCHING AND MODAL INITIALIZATION */
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTags = document.getElementById("modal-tags");
const closeModal = document.getElementById("close-modal");
const projectVideo = document.getElementById("project-video");

const stopVideoAndCloseModal = () => {
    if (modal) modal.style.display = "none";
    document.body.style.overflow = 'auto';
    if (projectVideo) projectVideo.src = ''; // Stops the video
};

const setupModalListeners = (projectData) => {
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("click", () => {
            const id = card.getAttribute("data-project");
            const data = projectData[id];

            if (data) {
                modalTitle.textContent = data.title;
                // Use innerHTML to allow <strong> tags from data
                modalDesc.innerHTML = data.desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); 

                modalTags.innerHTML = "";
                data.tags.forEach(t => {
                    const span = document.createElement("span");
                    span.classList.add("tag");
                    span.textContent = t;
                    modalTags.appendChild(span);
                });

                if (projectVideo) projectVideo.src = data.videoUrl;

                if (modal) modal.style.display = "flex";
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeModal) closeModal.addEventListener("click", stopVideoAndCloseModal);
    if (modal) modal.addEventListener("click", e => { if (e.target === modal) stopVideoAndCloseModal(); });
    
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal && modal.style.display === "flex") {
            stopVideoAndCloseModal();
        }
    });
};

const fetchProjectDataAndInitialize = () => {
    // Note: Assuming 'data/projects.json' is available relative to index.html
    fetch('data/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(projectData => {
            setupModalListeners(projectData);
        })
        .catch(error => {
            console.error("Could not fetch project data. Ensure data/projects.json exists.", error);
        });
};

/* SECTION REVEAL LOGIC */
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {threshold: 0.15});
sections.forEach(section => observer.observe(section));

/* SCROLL TO TOP LOGIC */
const scrollTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) { 
    if (scrollTopBtn) scrollTopBtn.classList.add('visible');
  } else {
    if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
  }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
}