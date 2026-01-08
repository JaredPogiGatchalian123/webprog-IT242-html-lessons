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
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    let current = "home";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
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

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("is-active");
      navLinksList.classList.remove("active");
    });
  });

  // 4. GALLERY TAB LOGIC
  const tabBtns = document.querySelectorAll(".tabBtn");
  const galleryContents = document.querySelectorAll(".galleryContent");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      galleryContents.forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
    });
  });

  // 5. LIGHTBOX MODAL LOGIC
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("closeLightbox");
  
  let currentImgIndex = 0;
  let activeTabPhotos = [];

  // Function to setup photo listeners (called whenever you switch tabs or load)
  function updatePhotoListeners() {
    const photoCards = document.querySelectorAll(".photoCard");
    photoCards.forEach((card) => {
      // Remove old listener to prevent double triggers
      card.onclick = null; 
      card.onclick = () => {
        const img = card.querySelector("img");
        // Get only the photos in the currently active tab
        const activeTab = document.querySelector(".galleryContent.active");
        activeTabPhotos = Array.from(activeTab.querySelectorAll("img"));
        currentImgIndex = activeTabPhotos.indexOf(img);
        
        openLightbox(activeTabPhotos[currentImgIndex].src);
      };
    });
  }

  function openLightbox(src) {
    lightbox.style.display = "flex";
    lightboxImg.src = src;
    document.body.style.overflow = "hidden"; // Stop page from scrolling
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto"; // Allow page to scroll again
    lightboxImg.src = "";
  }

  function showNext() {
    currentImgIndex = (currentImgIndex + 1) % activeTabPhotos.length;
    lightboxImg.src = activeTabPhotos[currentImgIndex].src;
  }

  function showPrev() {
    currentImgIndex = (currentImgIndex - 1 + activeTabPhotos.length) % activeTabPhotos.length;
    lightboxImg.src = activeTabPhotos[currentImgIndex].src;
  }

  // Close when clicking X
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard controls (Escape, Arrows)
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
  });

  // Initial setup of listeners
  updatePhotoListeners();
  
  // Re-run listeners whenever a tab is clicked
  tabBtns.forEach(btn => btn.addEventListener("click", updatePhotoListeners));
});