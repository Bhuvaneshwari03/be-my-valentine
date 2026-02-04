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
const video = document.getElementById("valentineVideo");

// When Yes is clicked
yesBtn.addEventListener("click", () => {
  question.innerHTML = "Yay! I knew it! ❤️";
  
  // Hide GIF, Show Video
  gif.style.display = "none";
  video.style.display = "block";
  
  // Play immediately - forcing muted first for mobile policy
  video.muted = true; 
  video.play().then(() => {
      // Optional: Unmute if browser allows, otherwise keep muted
      // video.muted = false; 
  }).catch(e => {
      console.log("Playback failed:", e);
  });

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