// GLOBAL CONTACT CONSTANTS (Maintenance Improvement)
const contactInfo = {
    email: 'your.email@example.com',
    calendly: 'https://calendly.com/your-meeting-link',
    linkedin: 'https://linkedin.com/in/sajed',
    x: 'https://x.com/sajed',
    github: 'https://github.com/sajed'
};

// INITIALIZATION: Runs when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme
    initializeTheme();
    
    // 2. Inject Contact Info
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
    document.getElementById('cta-email').href = `mailto:${contactInfo.email}?subject=Portfolio Inquiry`;
    document.getElementById('cta-schedule').href = contactInfo.calendly;
    document.getElementById('link-linkedin').href = contactInfo.linkedin;
    document.getElementById('link-x').href = contactInfo.x;
    document.getElementById('link-github').href = contactInfo.github;
};


/* PROJECT DATA FETCHING AND MODAL INITIALIZATION */
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTags = document.getElementById("modal-tags");
const closeModal = document.getElementById("close-modal");
const projectVideo = document.getElementById("project-video");

const stopVideoAndCloseModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
    projectVideo.src = ''; // Stops the video
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

                projectVideo.src = data.videoUrl;

                modal.style.display = "flex";
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModal.addEventListener("click", stopVideoAndCloseModal);
    modal.addEventListener("click", e => { if (e.target === modal) stopVideoAndCloseModal(); });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.style.display === "flex") {
            stopVideoAndCloseModal();
        }
    });
};

const fetchProjectDataAndInitialize = () => {
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
            // Optionally, show a fallback message to the user
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
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});