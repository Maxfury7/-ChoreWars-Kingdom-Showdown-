// Chore Wars - Gamified Household Chore System

// Initialize the loading animation
function initLoadingAnimation() {
    const image = document.querySelector('.sliding-image');
    const loadingBar = document.querySelector('.loading-bar');

    // Start the image slide-up animation
    image.style.animation = 'slideUp 2s ease-in-out forwards';

    // Start the loading bar animation
    loadingBar.style.animation = 'loading 3s ease-in-out infinite';

    // Redirect to main content after loading
    setTimeout(() => {
        window.location.href = "index.html";
    }, 5000); // 5 seconds to match animation duration
}

// Sample chores
const chores = [
    { id: 1, name: "Wash dishes", difficulty: 1 },
    { id: 2, name: "Vacuum living room", difficulty: 2 },
    { id: 3, name: "Do laundry", difficulty: 2 },
    { id: 4, name: "Clean bathroom", difficulty: 3 },
];

let user = {
    xp: 0,
    points: 0,
};

// Function to claim a chore
function claimChore(choreId) {
    const chore = chores.find(c => c.id === choreId);
    if (chore) {
        // Simulate completing the chore
        completeChore(chore);
    }
}

// Function to complete a chore
function completeChore(chore) {
    const xpEarned = chore.difficulty * 10; // Example XP calculation
    user.xp += xpEarned;
    updateLevel();
    updateDisplay();
}

// Function to update the display
function updateDisplay() {
    document.getElementById("xp-display").innerText = `XP: ${user.xp}`;
    document.getElementById("rewards-display").innerText = `Points: ${user.points}`;
}

// Initialize the loading animation when the page loads
document.addEventListener('DOMContentLoaded', initLoadingAnimation);
