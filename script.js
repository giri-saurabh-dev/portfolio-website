/**
 * SAURABH GIRI - PORTFOLIO SCRIPT v1.0
 * Includes: Lucide Icons, Mobile-Aware Parallax, and Bento Spotlight.
 */

// 1. Initialize Lucide Icons
lucide.createIcons();

// 2. Optimized Parallax Effect for the Hero Window
const windowEl = document.getElementById('window');
let ticker = false;

// Check if the device has a mouse/fine pointer (Desktop)
const isDesktop = window.matchMedia("(pointer: fine)").matches;

if (isDesktop && windowEl) {
    document.addEventListener('mousemove', (e) => {
        if (!ticker) {
            window.requestAnimationFrame(() => {
                const moveValues = calculateRotation(e);
                windowEl.style.transform = `rotateY(${moveValues.x}deg) rotateX(${moveValues.y}deg)`;
                ticker = false;
            });
            ticker = true;
        }
    });
} else if (windowEl) {
    // For mobile/touch, keep a static aesthetic tilt
    windowEl.style.transform = `rotateX(5deg)`;
}

function calculateRotation(e) {
    const sensitivity = 40; // Higher = more subtle movement
    const xAxis = (window.innerWidth / 2 - e.pageX) / sensitivity;
    const yAxis = (e.pageY - window.innerHeight / 2) / sensitivity;
    
    return {
        x: xAxis.toFixed(2),
        y: yAxis.toFixed(2)
    };
}

// 3. Bento Grid Spotlight Effect
const bentoItems = document.querySelectorAll('.bento-item');

bentoItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left; // X position inside the element
        const y = e.clientY - rect.top;  // Y position inside the element

        // Update CSS variables used in the .bento-item::before selector
        item.style.setProperty('--mouse-x', `${x}px`);
        item.style.setProperty('--mouse-y', `${y}px`);
    });
});

// A little something for the curious minds
console.log(
    "%c System Access Granted: Saurabh Giri v1.0 ", 
    "color: #4c82ff; background: #0b0b0b; font-weight: bold; border: 1px solid #4c82ff; padding: 5px;"
);
console.log("Status: Root access active. No vulnerabilities found.");