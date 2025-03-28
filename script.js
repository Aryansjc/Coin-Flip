const flipButton = document.getElementById("flip-coin");
const resetButton = document.getElementById("reset-stats");
const coin = document.getElementById("coin");
const result = document.getElementById("result");
const side1Display = document.getElementById("side1-display");
const side2Display = document.getElementById("side2-display");
const themeSelect = document.getElementById("theme-select");
const side1Label = document.getElementById("side1-label");
const side2Label = document.getElementById("side2-label");
const side1Count = document.getElementById("side1-count");
const side2Count = document.getElementById("side2-count");

let side1Wins = 0;
let side2Wins = 0;

const themes = {
  "heads-tails": ["Heads", "Tails", "linear-gradient(to bottom, #4facfe, #00f2fe)", "linear-gradient(to bottom, #ff758c, #ff7eb3)"],
  "ronaldo-messi": ["Ronaldo", "Messi", "linear-gradient(to bottom, #ffe259, #ffa751)", "linear-gradient(to bottom, #43c6ac, #f8ffae)"],
  "day-night": ["Day", "Night", "linear-gradient(to bottom, #ff7e5f, #feb47b)", "linear-gradient(to bottom, #4facfe, #00f2fe)"],
  "cats-dogs": ["Cats", "Dogs", "linear-gradient(to bottom, #e8cbc0, #636fa4)", "linear-gradient(to bottom, #fdc830, #f37335)"],
  "sun-moon": ["Sun", "Moon", "linear-gradient(to bottom, #fbc2eb, #a6c1ee)", "linear-gradient(to bottom, #1c92d2, #f2fcfe)"],
};

function setTheme() {
  const selectedTheme = themes[themeSelect.value];
  side1Label.textContent = selectedTheme[0];
  side2Label.textContent = selectedTheme[1];
  side1Display.textContent = selectedTheme[0];
  side2Display.textContent = selectedTheme[1];
  side1Display.style.background = selectedTheme[2];
  side2Display.style.background = selectedTheme[3];
}
function flipCoin() {
    // Get the audio element or create one dynamically
    let flipSound = document.getElementById("flip-sound");
  
    // If the audio element doesn't exist, create it dynamically
    if (!flipSound) {
      flipSound = new Audio("sounds/coin-flip.mp3"); // Path to the sound file
    }
  
    // Play the sound effect
    flipSound.currentTime = 0; // Reset the audio to the beginning
    flipSound.play();
  
    // Randomly determine heads (true) or tails (false)
    const isHeads = Math.random() < 0.5;
  
    // Set the base number of spins (minimum 5 spins = 1800 degrees)
    const baseSpins = 5 * 360; // 5 full rotations
  
    // Add additional random spins to make it more dynamic (e.g., up to 10 more spins)
    const randomExtraSpins = Math.floor(Math.random() * 6) * 360; // 0 to 5 extra spins
  
    // Calculate the total rotations (base + random extra spins + final adjustment for heads/tails)
    const rotations = baseSpins + randomExtraSpins + (isHeads ? 0 : 180);
  
    // Apply the rotation to the coin
    coin.style.transform = `rotateY(${rotations}deg)`;
  
    // Delay the result update to match the animation time
    setTimeout(() => {
      // Update the result message
      result.textContent = isHeads ? side1Label.textContent + " Wins!" : side2Label.textContent + " Wins!";
  
      // Update the stats
      if (isHeads) {
        side1Wins++;
        side1Count.textContent = side1Wins;
      } else {
        side2Wins++;
        side2Count.textContent = side2Wins;
      }
    }, 3500); // Matches the CSS animation duration
  }
  

function resetStats() {
  side1Wins = 0;
  side2Wins = 0;
  side1Count.textContent = side1Wins;
  side2Count.textContent = side2Wins;
  result.textContent = "";
  coin.style.transform = "rotateY(0deg)";
}

themeSelect.addEventListener("change", setTheme);
flipButton.addEventListener("click", flipCoin);
resetButton.addEventListener("click", resetStats);

// Initialize the theme on page load
setTheme();
