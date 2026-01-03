document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth Scroll
  const scrollBtn = document.getElementById("scrollBtn");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    });
  }

  // 2. Load More / See Less Toggle Logic
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const galleryItems = document.querySelectorAll(".galleryItem");
  const initialCount = 8; // Number of items to show at start

  function applyInitialLimit() {
    galleryItems.forEach((item, index) => {
      if (index >= initialCount) {
        item.classList.add("hidden-moment");
      } else {
        item.classList.remove("hidden-moment");
      }
    });
  }

  applyInitialLimit();

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      const isExpanded = loadMoreBtn.innerText === "See Less Pictures";

      if (isExpanded) {
        applyInitialLimit();
        loadMoreBtn.innerText = "Show More Pictures";
        document.getElementById("gallery").scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        galleryItems.forEach(item => item.classList.remove("hidden-moment"));
        loadMoreBtn.innerText = "See Less Pictures";
      }
    });
  }

  // 3. Gallery Filtering
  const filterBtns = document.querySelectorAll(".filterBtn");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filterBtn.active").classList.remove("active");
      btn.classList.add("active");
      const filterValue = btn.getAttribute("data-filter");
      
      galleryItems.forEach(item => {
        item.classList.remove("hidden-moment"); 
        if (filterValue === "all") {
          applyInitialLimit(); 
          if (loadMoreBtn) {
            loadMoreBtn.style.display = "inline-block";
            loadMoreBtn.innerText = "Show More Pictures";
          }
          item.classList.remove("hide");
        } else if (item.getAttribute("data-category") === filterValue) {
          item.classList.remove("hide");
          if (loadMoreBtn) loadMoreBtn.style.display = "none";
        } else {
          item.classList.add("hide");
        }
      });
    });
  });

  // 4. Lightbox Modal with Navigation
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("imgFull");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  
  // Track current image index for navigation
  let currentIndex = 0;
  let visibleImages = [];

  // Function to update the modal content
  function updateModal(index) {
    const img = visibleImages[index].querySelector("img");
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
    currentIndex = index;
  }

  // Open modal when clicking any image
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      // Get only images currently not hidden by filters
      visibleImages = Array.from(galleryItems).filter(i => !i.classList.contains('hide') && !i.classList.contains('hidden-moment'));
      const index = visibleImages.indexOf(item);
      
      if (index !== -1) {
        modal.style.display = "block";
        updateModal(index);
      }
    });
  });

  // Close logic
  if(closeBtn) {
    closeBtn.onclick = () => { modal.style.display = "none"; };
  }
  
  window.onclick = (event) => {
    if (event.target == modal) { modal.style.display = "none"; }
  };

  // Keyboard Support (Arrows and Escape)
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "ArrowRight") {
        let next = (currentIndex + 1) % visibleImages.length;
        updateModal(next);
      } else if (e.key === "ArrowLeft") {
        let prev = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
        updateModal(prev);
      } else if (e.key === "Escape") {
        modal.style.display = "none";
      }
    }
  });
});