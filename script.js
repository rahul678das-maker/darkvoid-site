document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reveals.length) {
    if (prefersReducedMotion) {
      reveals.forEach((item) => item.classList.add("visible"));
    } else {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      });

      reveals.forEach((item) => observer.observe(item));
    }
  }

  // Smooth anchor scroll with sticky header offset
  const localAnchors = document.querySelectorAll('a[href^="#"]');

  localAnchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const signalBar = document.querySelector(".signal-bar");
      const nav = document.querySelector(".nav");

      const signalHeight = signalBar ? signalBar.offsetHeight : 0;
      const navHeight = nav ? nav.offsetHeight : 0;
      const offset = signalHeight + navHeight + 18;

      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });
  });

  // Active nav state for in-page sections
  const sectionIds = ["about", "home-platform", "research-signal", "featured-structure", "contact"];
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

  if (navLinks.length && !prefersReducedMotion) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          link.classList.toggle("active", href === `#${id}`);
        });
      });
    }, {
      threshold: 0.45
    });

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }
});
