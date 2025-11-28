// IntersectionObserver for staggered section reveal
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.15});
sections.forEach(section=>observer.observe(section));

// Smooth scroll for nav links
document.querySelectorAll('.floating-nav a').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Modal Elements
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTags = document.getElementById("modal-tags");
const closeModal = document.getElementById("close-modal");

// Project Data
const projectData = {
  1: {
    title: "Project One",
    desc: "Expanded project information goes here. This is a more detailed description of Project One.",
    tags: ["React", "API"]
  },
  2: {
    title: "Project Two",
    desc: "More detailed information about Project Two. Great for case studies or demos.",
    tags: ["AI", "Python"]
  }
};

// Open modal on click
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-project");
    const data = projectData[id];

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modalTags.innerHTML = "";
    data.tags.forEach(t => {
      const span = document.createElement("span");
      span.classList.add("tag");
      span.textContent = t;
      modalTags.appendChild(span);
    });

    modal.style.display = "flex";
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal on background click
modal.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});
