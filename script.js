
// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navHeight = document.querySelector('nav').offsetHeight;
        
        window.scrollTo({
            top: targetSection.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    if (email && message) {
        alert('Message sent! (Demo only)');
        this.reset();
    } else {
        alert('Please fill in all fields');
    }
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Animate skill progress bars
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.querySelector('.skill-progress');
            const level = entry.target.dataset.level;
            progress.style.width = `${level}%`;
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// Random shape generator for hero image
function generateRandomShape() {
    const heroImage = document.querySelector('.hero-image img');
    const shapes = [
        'circle(50% at 50% 50%)',
        'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        'polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%)',
        'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
    ];
    
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    heroImage.style.clipPath = randomShape;
}

// Change shape every 5 seconds
setInterval(generateRandomShape, 5000);
