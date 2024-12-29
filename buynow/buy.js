document.getElementById("shippingForm").addEventListener("submit", function (event) {
  // Prevent form submission
  event.preventDefault();

  // Collect form data
  const shippingDetails = {
    firstName: document.getElementById('f-name').value,
    lastName: document.getElementById('l-name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: {
      door: document.getElementById('door').value,
      street: document.getElementById('street').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      zip: document.getElementById('zip').value,
    },
  };

  // Save data to localStorage
  localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));

  // Redirect to payment page
  window.location.href = 'payment/payment.html';
});

document.addEventListener('DOMContentLoaded', () => {
  // Select buttons and the audio element
  const tickSound = document.getElementById('tickSound');
  const paymentButton = document.getElementById('paymentButton');
  const cartButton = document.getElementById('cartButton');

  // Function to play the tick sound
  function playTickSound() {
    tickSound.currentTime = 0; // Reset sound to start
    tickSound.play();
  }

  // Attach the click event listener
  paymentButton.addEventListener('click', playTickSound);
  cartButton.addEventListener('click', playTickSound);
});
