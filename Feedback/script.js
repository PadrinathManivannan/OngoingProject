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






//       FEEDBAK SECTION


            
// JavaScript Code in script.js
function sendemail(event) {
  event.preventDefault(); // Prevent form submission

  var email = document.getElementById("email").value;
  var mobile = document.getElementById("tel").value;
  var name = document.getElementById("name").value;
  var feedback = document.getElementById("feedback").value;

  var templateParams = {
      email: email,
      mobile: mobile,
      to_name: name,
      message: feedback,
      to_email: "gheethasorganicsverified@gmail.com"
  };

        

emailjs.send("service_zi1l8om", "template_k2qzhds", templateParams,'Dnjqrpti0-3kiI6Xx')
  .then(
    function(response) {
      console.log("SUCCESS!", response.status, response.text);

        // Display the success message
        document.getElementById("successMessage").innerHTML = "Thank you for your feedback! We have received your message.";
        document.getElementById("successMessage").style.display = "block"; // Make sure the success message is visible
        
        // Optionally, clear the form after submission
        document.getElementById("feedbackForm").reset();

    },
    function(error) {
      console.log("FAILED...", error);

       // Display error message if the email fails
       document.getElementById("successMessage").innerHTML = "Something went wrong. Please try again.";
       document.getElementById("successMessage").style.display = "block"; // Show error message
    }
  );
}