// Function to parse URL parameters
function getQueryParams() {
  const params = {};
  const queryString = window.location.search.substring(1); // Remove '?' from the URL
  const queryParts = queryString.split('&'); // Split parameters by '&'

  queryParts.forEach(part => {
    const [key, value] = part.split('='); // Split each key-value pair
    params[decodeURIComponent(key)] = decodeURIComponent(value); // Decode URI components
  });

  return params;
}

// Get parameters from the URL
const queryParams = getQueryParams();

// Extract product details
const productName = queryParams.product || 'Unknown Product';
const productSize = queryParams.size || 'Unknown Size';
const productPrice = parseFloat(queryParams.price) || 0; // Ensure price is a number
let productQuantity = parseInt(queryParams.quantity) || 1; // Ensure quantity is at least 1

// Display the initial data
document.getElementById('productName').textContent = productName;
document.getElementById('productSize').textContent = productSize;
const quantityInput = document.getElementById('productQuantity');
quantityInput.value = productQuantity;
updatePrice(); // Set the initial price

// Event listener for quantity changes
quantityInput.addEventListener('input', () => {
  const newQuantity = parseInt(quantityInput.value) || 0; // Default to 0 if input is invalid
  if (newQuantity > 0 && newQuantity <= 1000) {
    productQuantity = newQuantity;
    updatePrice();
  } else {
    alert('Please enter a valid quantity (1 - 1000).');
    quantityInput.value = productQuantity; // Reset to the last valid quantity
  }
});

// Function to update the total price
function updatePrice() {
  const totalPrice = productPrice * productQuantity;
  document.getElementById('productPrice').textContent = `₹${totalPrice.toFixed(2)}`; // Format price to 2 decimal places
}

// Function to change the displayed main image
function changeImage(thumbnail) {
  const mainImage = document.getElementById('displayedImage');
  mainImage.src = thumbnail.src; // Update the main image's src
  mainImage.alt = thumbnail.alt; // Update the alt text

  // Highlight the selected thumbnail
  const thumbnails = document.querySelectorAll('.thumbnails img');
  thumbnails.forEach(img => img.classList.remove('active'));
  thumbnail.classList.add('active');
}

// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const shippingForm = document.getElementById('shippingForm');
  if (shippingForm) {
    shippingForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent default form submission

      // Collect shipping details
      const firstName = document.getElementById('f-name').value;
      const lastName = document.getElementById('l-name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const door = document.getElementById('door').value;
      const street = document.getElementById('street').value;
      const city = document.getElementById('city').value;
      const state = document.getElementById('state').value;
      const zip = document.getElementById('zip').value;

      // Validation: Ensure all fields are filled
      if (!firstName || !email || !phone || !door || !street || !city || !state || !zip) {
        alert('Please fill in all shipping details.');
        return;
      }

      // Optionally, you can save the details to localStorage
      const shippingDetails = {
        firstName,
        lastName,
        email,
        phone,
        address: { door, street, city, state, zip }
      };
      localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));

      // Optionally, alert or log the details
      alert(`Shipping Details:
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      Address: ${door}, ${street}, ${city}, ${state}, ${zip}`);

      // Redirect to the payment page (ensure this path is correct based on your project structure)
      window.location.href = 'payment/payment.html';
    });
  }

  // Handle sound for the buttons
  const tickSound = document.getElementById('tickSound');
  const paymentButton = document.getElementById('paymentButton');
  const cartButton = document.getElementById('cartButton');

  function playTickSound() {
    tickSound.currentTime = 0; // Reset sound to start
    tickSound.play();
  }

  // Attach the click event listener
  paymentButton.addEventListener('click', playTickSound);
  cartButton.addEventListener('click', playTickSound);
});
