const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
    });
  });
}

// Subtle parallax for orb
const orbShell = document.querySelector(".orb-shell");

window.addEventListener("mousemove", (e) => {
  if (!orbShell) return;

  const x = (window.innerWidth / 2 - e.clientX) / 45;
  const y = (window.innerHeight / 2 - e.clientY) / 45;

  orbShell.style.transform = `translate(${ -x }px, ${ -y }px)`;
});

// Fade-in reveal on scroll
const revealElements = document.querySelectorAll(
  ".domain-card, .research-card, .philosophy-box, .vision-left, .vision-map-card, .final-cta"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(26px)";
  el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
  observer.observe(el);
});
