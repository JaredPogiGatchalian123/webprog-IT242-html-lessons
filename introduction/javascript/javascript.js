const btn = document.getElementById("scrollBtn");

btn.addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({
    behavior: "smooth"
  });
});
