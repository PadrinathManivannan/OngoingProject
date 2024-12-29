document.getElementById('paymentForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
  if (!selectedPayment) {
      alert('Please select a payment method.');
      return;
  }

  const amount = parseFloat(document.getElementById('amount').value);
  if (selectedPayment.value === 'COD' && amount > 3000) {
      alert('Cash on Delivery is only available for amounts under ₹3000.');
      return;
  }

  alert('Payment successful! Redirecting to Thank You page...');

  // Redirect to Thank You page
  window.location.href = 'thankyou.html';

  // Code to save order in MyOrders tab can be added in backend logic.
});

document.querySelectorAll('input[name="paymentMethod"]').forEach(method => {
  method.addEventListener('change', function () {
      const upiDetails = document.getElementById('upiDetails');
      const cardDetails = document.getElementById('cardDetails');

      if (this.value === 'UPI') {
          upiDetails.style.display = 'block';
          cardDetails.style.display = 'none';
      } else if (this.value === 'Card') {
          upiDetails.style.display = 'none';
          cardDetails.style.display = 'block';
      } else {
          upiDetails.style.display = 'none';
          cardDetails.style.display = 'none';
      }
  });
});