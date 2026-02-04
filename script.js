const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const gif = document.getElementById("valentineGif");
const container = document.querySelector(".container");

// Wait for fonts to load before showing the container to prevent layout shift
document.fonts.ready.then(() => {
    container.classList.add("loaded");
});

// Fallback: If fonts take too long, show it anyway after 1s
setTimeout(() => {
    container.classList.add("loaded");
}, 1000);

// --- PRELOAD VIDEO ---
// Create the video element immediately so it buffers while the user decides
const video = document.createElement('video');
video.src = "./InShot_20260203_190724193.mp4"; 
video.preload = "auto"; // Tell browser to download it ASAP
video.loop = true;
video.controls = false;
video.muted = false; // Start muted to allow autoplay if needed, but user interaction allows sound usually
video.style.maxWidth = "100%";
video.style.height = "200px"; // Match the gif height initially to prevent jump
video.style.borderRadius = "15px";
video.style.marginBottom = "20px";
video.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
video.style.objectFit = "cover"; // Ensure it fills nicely

// Force loading
video.load();

// When Yes is clicked
yesBtn.addEventListener("click", () => {
  question.innerHTML = "Yay! I knew it! ❤️";
  
  // Style adjustments for the playing state
  video.style.height = "auto"; 
  video.style.maxHeight = "400px";
  
  // Replace the image with the preloaded video
  gif.parentNode.replaceChild(video, gif);
  
  // Play immediately
  video.play().catch(e => console.log("Playback failed:", e));

  // Hide the buttons container
  document.querySelector(".buttons").style.display = "none";
  
  // CRITICAL FIX: Also explicitly hide the No button 
  // because it might have been moved to the <body> tag
  noBtn.style.display = "none"; 

  // Optional: Add confetti or background change here
  startConfetti();
});

// When No is hovered or clicked
function interactionHandler(e) {
    // Prevent default behavior to avoid any weird focus/click issues
    if (e) e.preventDefault(); 
    moveButton();
}

noBtn.addEventListener("mouseover", interactionHandler);
noBtn.addEventListener("click", interactionHandler);
noBtn.addEventListener("touchstart", interactionHandler); // For mobile support

function moveButton() {
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  // Get window dimensions
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Calculate safe boundaries
  const padding = 20; 
  const maxX = windowWidth - btnWidth - padding;
  const maxY = windowHeight - btnHeight - padding;

  // Ensure random position is positive and within bounds
  const newX = Math.max(padding, Math.random() * maxX);
  const newY = Math.max(padding, Math.random() * maxY);

  // CRITICAL FIX: Move button to body to avoid container trapping it
  // This solves the issue where backdrop-filter or transforms on the container
  // make 'fixed' positioning act relative to the container instead of the viewport.
  if (noBtn.parentNode !== document.body) {
      document.body.appendChild(noBtn);
      // Re-apply styles needed for independent existence
      noBtn.style.position = "fixed";
  }

  // Apply new position
  noBtn.style.position = "fixed"; 
  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";
  noBtn.style.zIndex = "9999"; 
}

// Simple confetti effect
function startConfetti() {
  // We can add a simple canvas confetti here or just change background
  document.body.style.backgroundColor = "#ffc1e3";
}