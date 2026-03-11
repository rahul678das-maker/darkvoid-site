const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("show");
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("show");
    });
  });
}

const chamber = document.querySelector(".void-chamber");

window.addEventListener("mousemove", (event) => {
  if (!chamber) return;

  const x = (window.innerWidth / 2 - event.clientX) / 55;
  const y = (window.innerHeight / 2 - event.clientY) / 55;

  chamber.style.transform = `translate(${-x}px, ${-y}px)`;
});

const revealItems = document.querySelectorAll(
  ".essence-card, .domain-panel, .research-panel, .quote-box, .vision-copy, .vision-grid-card, .contact-section"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(24px)";
  item.style.transition = "opacity 0.9s ease, transform 0.9s ease";
  revealObserver.observe(item);
});
