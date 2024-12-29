const nav = document.querySelector(".nav"),
      searchIcon = document.querySelector("#searchIcon"),
      searchInput = document.querySelector("#searchInput"),
      products = document.querySelectorAll(".box");

if (searchIcon && searchInput && products.length > 0) {
    searchIcon.addEventListener("click", () => {
        nav.classList.toggle("openSearch");
        nav.classList.remove("openNav");
        searchInput.focus();

        if (nav.classList.contains("openSearch")) {
            searchIcon.classList.replace("uil-search", "uil-times");
        } else {
            searchIcon.classList.replace("uil-times", "uil-search");
            searchInput.value = ""; // Clear input on close
            filterProducts(""); // Show all products again
        }
    });

    // Filter products based on input
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value || ""; 
        filterProducts(searchText.toLowerCase());
    });

    function filterProducts(searchText) {
        products.forEach(product => {
            const productName = product.getAttribute("data-product-name");
            if (productName && productName.toLowerCase().includes(searchText)) {
                product.style.display = "block"; // Show matching product
            } else {
                product.style.display = "none"; // Hide non-matching product
            }
        });
    }
}






// JavaScript for automatic sliding
const slider = document.getElementById("slider");
const slides = slider.children;
let scrollAmount = 0;
const scrollStep = slider.clientWidth;

// Clone the first slide and append it to the end
const firstSlideClone = slides[0].cloneNode(true);
slider.appendChild(firstSlideClone);

function slideImages() {
    if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
        // Reached the end, reset to the start smoothly
        slider.scrollTo({ left: 0, behavior: "auto" });
        scrollAmount = scrollStep; // Reset scroll amount to start from the second slide
    } else {
        // Scroll right by one step
        scrollAmount += scrollStep;
        slider.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        });
    }
}

// Start the slider
setInterval(slideImages, 3000); // Slide every 3 seconds



// read more button

function toggleReadMore(event) {
  const button = event.target;
  const content = button.previousElementSibling; // Selects the content div just before the button

  content.classList.toggle("expanded");
  button.textContent = content.classList.contains("expanded") ? "Read less" : "Read more";
}


// Rating stars 

let totalRatings = 0;
let numberOfRatings = 0;
let hasPurchased = false; // Set to true if the user has purchased the item

function setRating(rating) {
  if (!hasPurchased) {
    alert("You must purchase this product to rate it.");
    return;
  }

  const stars = document.querySelectorAll('.star-rating .fas');
  const ratingValue = document.querySelector('.star-rating .rating-value');

  // Update the total ratings and number of ratings
  totalRatings += rating;
  numberOfRatings += 1;
  const averageRating = (totalRatings / numberOfRatings).toFixed(1);

  // Update the star display based on the average rating
  stars.forEach((star, index) => {
    if (index < Math.round(averageRating)) {
      star.classList.add('filled');
    } else {
      star.classList.remove('filled');
    }
  });

  // Display the average rating
  ratingValue.innerText = `(${averageRating})`;
}

// Add click events to stars only if the user has purchased
document.querySelectorAll('.star-rating .fas').forEach((star, index) => {
  star.addEventListener('click', () => {
    setRating(index + 1);
  });
});


// Price mapping for products
const priceMapping = {
  'Butter':{
    '100g':99,
    '250g':239,
    '500g':469,
    '1kg':949
  },
  'SkimmedMilk': {
    
    '200ml': 15,
    '350ml': 25,
    '500ml': 35,
    '1L': 65
  },
  'curd': {
    '100g': 5,
    '250g': 12,
    '500g': 25,
    '1kg': 45
  },
  'Cooking-oil':{
    '100ml': 15,
    '250ml': 35,
    '500ml': 60,
    '1l': 110
  },
  'Ghee':{
    '50g': 49,
    '100g': 99,
    '250g': 245,
    '500g': 499,
    '1kg': 999
  },
  'Hair-Oil':{
    '30ml': 49,
    '100ml': 159,
    '250ml': 399,
    '500ml': 799,
    '1l': 1550
  },
  'Lassi':{
    '250ml': 20,
    '500ml': 40,
    '1l': 80
  },
  'NutButter':{
    '50g': 99,
    '100g': 199,
    '250g': 449,
    '500g': 899
  },
  'Palkova':{
    '50g': 25,
    '100g': 50,
    '250g': 120,
    '500g': 240,
    '1kg': 460
  },
  'Paneer':{
    '100g': 45,
    '250g': 135,
    '500g': 250,
    '1kg': 449
  },
  'Pickles':{
    '250g': 30
  },
  'Plants-Saplings':{
    'rose': 10,
    'dragon fruit': 100,
    'medicinal plants': 500
  },
  'ButterMilk':{
  '500ml': 20,
  '1l': 40
},
  'facemask': {
    '50g': 70,
    '100g': 120,
    '200g': 210
  },
  'Gheecream': {
    '50g': 249,
    '100g': 499,
    '250g': 1199,
    '500g': 2349
  }
};

// Function to toggle the popup
function toggleBasket(event, button) {
  event.preventDefault(); // Prevent the default anchor action

  // Get the product's name and measurement type
  const productBox = button.closest('.box');
  const productName = productBox.getAttribute('data-product-name');
  const measurement = productBox.getAttribute('data-measurement');

  // Get options and prices based on the selected product
  const options = Object.keys(priceMapping[productName] || {});
  const quantityTypeSelect = document.getElementById('quantityType');
  quantityTypeSelect.innerHTML = ''; // Clear existing options

  // Populate dropdown with quantity options
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = `${option} - ₹${priceMapping[productName][option]}`;
    quantityTypeSelect.appendChild(opt);
  });

  // Show the popup
  const popup = document.getElementById('popup');
  popup.setAttribute('data-product-name', productName); // Save the product name
  popup.classList.remove('hidden');
}

// Event listener to update the price display when quantity changes
document.getElementById('quantityType').addEventListener('change', () => {
  const popup = document.getElementById('popup');
  const productName = popup.getAttribute('data-product-name');
  const selectedSize = document.getElementById('quantityType').value;

  const pricePerUnit = priceMapping[productName][selectedSize];
  document.getElementById('priceDisplay').textContent = `Price per unit: ₹${pricePerUnit}`;
});

// Add to cart button logic
document.getElementById('addToCart').addEventListener('click', () => {
  const popup = document.getElementById('popup');
  const productName = popup.getAttribute('data-product-name');
  const size = document.getElementById('quantityType').value;
  const quantity = document.getElementById('quantity').value;

  if (quantity <= 1000) {
    const totalCost = priceMapping[productName][size] * quantity;
    alert(`Added ${quantity} x ${size} of ${productName} to your cart. Total Cost: ₹${totalCost}`);
    popup.classList.add('hidden'); // Hide the popup
  } else {
    alert('Maximum quantity cannot exceed 1 ton (1000 units).');
  }
});

// Buy Now button logic
document.getElementById('buyNow').addEventListener('click', () => {
  const popup = document.getElementById('popup');
  const productName = popup.getAttribute('data-product-name'); // Get product name
  const size = document.getElementById('quantityType').value; // Get selected size
  const quantity = parseInt(document.getElementById('quantity').value); // Get quantity
  const price = priceMapping[productName]?.[size] || 0; // Calculate price

  if (quantity <= 1000) {
    // Construct the URL with parameters
    const productPage = productName.toLowerCase().replace(/\s+/g, '') + '.html';
    const url = `${productPage}?product=${encodeURIComponent(productName)}&size=${encodeURIComponent(size)}&quantity=${quantity}&price=${price}`;
    
    // Redirect to the product-specific page with parameters
    window.location.href = url;
  } else {
    alert('Maximum quantity cannot exceed 1 ton (1000 units).');
  }
});


// Close popup when clicking outside
window.addEventListener('click', (e) => {
  const popup = document.getElementById('popup');
  if (e.target === popup) {
    popup.classList.add('hidden');
  }
});






                                               // cart notification alert



// Track the total number of items in the cart
let cartItemCount = 0;

// Add event listener for the "Add to Basket" button
document.getElementById('addToCart').addEventListener('click', () => {
  const size = document.getElementById('quantityType').value;
  const quantity = parseInt(document.getElementById('quantity').value);

  if (quantity <= 1000) {
    // Update cart item count
    cartItemCount += quantity;

    // Update the cart notification
    const cartNotification = document.getElementById('cart-notification');
    cartNotification.textContent = cartItemCount;
    cartNotification.style.display = cartItemCount > 0 ? 'block' : 'none';

    // Hide the popup and show success alert
    document.getElementById('popup').classList.add('hidden');
    alert(`${quantity} x ${size} added to your cart.`);
  } else {
    alert('Maximum quantity cannot exceed 1 ton (1000 units).');
  }
});

// Close popup when clicking outside
window.addEventListener('click', (e) => {
  const popup = document.getElementById('popup');
  if (e.target === popup) {
    popup.classList.add('hidden');
  }
});



