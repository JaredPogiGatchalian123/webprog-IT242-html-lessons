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

  // 4. Lightbox Modal
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("imgFull");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const galleryImages = document.querySelectorAll(".galleryItem img");

  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerHTML = img.alt;
    });
  });

  if(closeBtn) {
    closeBtn.onclick = () => { modal.style.display = "none"; };
  }
  
  window.onclick = (event) => {
    if (event.target == modal) { modal.style.display = "none"; }
  };
});