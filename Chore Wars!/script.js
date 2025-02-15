// Chore Wars - Gamified Household Chore System

// Initialize the loading animation
function initLoadingAnimation() {
    const image = document.querySelector('.sliding-image');
    const loadingBar = document.querySelector('.loading-bar');

    // Start the image slide-up animation
    image.style.animation = 'slideUp 2s ease-in-out forwards';

    // Start the loading bar animation
    loadingBar.style.animation = 'loading 3s ease-in-out forwards';

    // Notify when animations complete
    loadingBar.addEventListener('animationend', () => {
        const loadingScreen = document.querySelector('.loading-screen');
        const mainContent = document.querySelector('.main-content');
        
        if (loadingScreen && mainContent) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
                mainContent.style.display = 'block';
            }, 500);
        }
    });
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
    id: null
};

// Fetch user XP from database
async function fetchUserXP(userId) {
    try {
        const response = await fetch(`http://localhost:5504/api/xp/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch XP');
        const data = await response.json();
        user.xp = data.xp || 0;
        // Update both display text and HTML value
        const xpDisplay = document.getElementById("xp-display");
        xpDisplay.innerText = `XP: ${user.xp}`;
        xpDisplay.dataset.xpValue = user.xp;
    } catch (error) {
        console.error('Error fetching XP:', error);
    }
}

// Initialize user data
function initUser(userId) {
    user.id = userId;
    fetchUserXP(userId);
}

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
    const xpDisplay = document.getElementById("xp-display");
    xpDisplay.innerText = `XP: ${user.xp}`;
    xpDisplay.dataset.xpValue = user.xp; // Store the actual XP value in data attribute
    document.getElementById("rewards-display").innerText = `Points: ${user.points}`;
}

// Initialize with a test user ID (replace with actual user ID from login)
initUser(1);

// Initialize the loading animation when the page loads
if (document.querySelector('.loading-screen')) {
    document.addEventListener('DOMContentLoaded', initLoadingAnimation);
}
