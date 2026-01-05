document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector("#mobile-menu");
  const navLinksList = document.querySelector(".navLinks");
  const navLinks = document.querySelectorAll(".navLink");
  const sections = document.querySelectorAll("section");
  const nav = document.querySelector(".topNav");

  // 1. Mobile Menu Toggle
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("is-active");
    navLinksList.classList.toggle("active");
  });

  // 2. Button Smooth Scrolls
  document.getElementById("scrollBtn")?.addEventListener("click", () => {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("connectBtn")?.addEventListener("click", () => {
    document.getElementById("socials").scrollIntoView({ behavior: "smooth" });
  });

  // 3. Scroll Spy & Nav Background Logic
  window.addEventListener("scroll", () => {
    // Change Nav Background on Scroll
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    // Highlighting Active Section
    let current = "home";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("is-active");
      navLinksList.classList.remove("active");
    });
  });
});