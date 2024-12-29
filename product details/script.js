// Function to toggle the pop-up
function toggleBasket(event) {
    event.preventDefault();
    document.getElementById('popup-slider').classList.add('active');
    updatePrice(); // Ensure the price is updated on open
}

// Function to close the pop-up
function closePopup() {
    document.getElementById('popup-slider').classList.remove('active');
}

// Function to update price based on quantity and size
function updatePrice() {
    const size = document.getElementById('size').value; // Size value in grams
    const quantity = document.getElementById('quantity').value; // Quantity value
    let pricePerUnit;

    switch (size) {
        case '100':
            pricePerUnit = 99;
            break;
        case '250':
            pricePerUnit = 249;
            break;
        case '500':
            pricePerUnit = 499;
            break;
        case '1000':
            pricePerUnit = 899;
            break;
        default:
            pricePerUnit = 0;
    }

    const totalPrice = pricePerUnit * quantity;
    document.getElementById('popup-price').textContent = totalPrice;
}

// Function to handle "Add to Cart"
function addToCart() {
    alert("Product added to cart!");
    closePopup();
}

// Function to handle "Buy Now"
function buyNow() {
    alert("Proceeding to Buy Now...");
    window.location.href = "buy-now.html"; // Redirect to your buy now page
}
