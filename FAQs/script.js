const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");
searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});
navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});

let lastScrollTop = 0;
const announcementBar = document.querySelector('.announcement-bar');
const navBar = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    announcementBar.style.transform = 'translateY(-100%)';
    navBar.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    announcementBar.style.transform = 'translateY(0)';
    navBar.style.transform = 'translateY(0)';
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});






// JavaScript for automatic sliding
const slider = document.getElementById("slider");
let scrollAmount = 0;
const scrollStep = slider.clientWidth; // Full scroll of container width

function slideImages() {
    // Check if the scroll has reached the end
    if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
        scrollAmount = 0; // Reset to the start
    } else {
        scrollAmount += scrollStep; // Scroll right by one step
    }
    slider.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
    });
}

// Start the slider
setInterval(slideImages, 3000); // Slide every 3 seconds