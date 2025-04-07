document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = mobileMenu.querySelectorAll("a"); // ✅ Mobile menu links
  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("section");

  // ✅ Toggle Mobile Menu with Smooth Transition
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("opacity-100");
    mobileMenu.classList.toggle("translate-y-0");
  });

  // ✅ Close Mobile Menu on Link Click & Scroll to Section
  mobileLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Stop default anchor behavior

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });

        // Wait a bit before closing the menu (for smooth experience)
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
          mobileMenu.classList.remove("opacity-100", "translate-y-0");
        }, 300);
      }
    });
  });

  // ✅ Smooth Scroll for Desktop Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ✅ Intersection Observer for Scroll Animations
  const observerOptions = { threshold: 0.2 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
      } else {
        entry.target.classList.remove("opacity-100", "translate-y-0");
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.classList.add(
      "opacity-0",
      "translate-y-10",
      "transition-all",
      "duration-700"
    );
    observer.observe(section);
  });

  // ✅ Highlight Active Navbar Link on Scroll
  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-green-800");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("text-green-800");
      }
    });
  });
});