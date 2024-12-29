// script.js

window.addEventListener('load', () => {
  const loginSound = document.getElementById('login-sound');

  // Try to play the sound after loading
  loginSound.play().catch((error) => {
    console.error("Audio playback failed:", error);
  });

  // Redirect or close after 10 seconds
  setTimeout(() => {
    window.location.href = "D:\project\homepage\homepage.html";  // Change to the desired URL or action
  }, 10000); // 10000ms = 10 seconds
});
