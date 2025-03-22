// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

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

    // Add click handler for skill cards
    card.addEventListener('click', () => {
        const modal = document.getElementById('skillModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const skillTitle = card.querySelector('h4').textContent;

        const descriptions = {
            'Network Security': 'Expertise in implementing and maintaining network security protocols, firewalls, and intrusion detection systems.',
            'Penetration Testing': 'Experience in conducting security assessments and identifying vulnerabilities in systems and networks.',
            'Cryptography': 'Knowledge of encryption algorithms, secure communication protocols, and key management systems.',
            'Malware Analysis': 'Skilled in analyzing and reverse engineering malicious software to understand their behavior and impact.',
            'SIEM Tools': 'Proficient in using Security Information and Event Management tools for threat detection and response.',
            'Forensics': 'Experience in digital forensics, incident response, and evidence collection methodologies.'
        };

        modalTitle.textContent = skillTitle;
        modalDescription.textContent = descriptions[skillTitle];
        modal.style.display = 'block';
    });
});

// Close modal functionality
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('skillModal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('skillModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Background experience click handlers
document.querySelectorAll('.exp-item').forEach(item => {
    item.addEventListener('click', () => {
        const modal = document.getElementById('skillModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const role = item.dataset.role;

        const descriptions = {
            'Senior Developer': `Key responsibilities and achievements:
• Led critical enterprise application development initiatives
• Architected and implemented scalable solutions for enterprise clients
• Mentored junior developers and conducted code reviews
• Led agile development teams of 5-7 members
• Implemented CI/CD pipelines and DevOps practices
• Reduced system downtime by 35% through infrastructure improvements`,

            'Full Stack Developer': `Key responsibilities and achievements:
• Developed and maintained multiple client-facing web applications
• Implemented responsive designs and enhanced UX across platforms
• Optimized database queries resulting in 50% faster load times
• Integrated third-party APIs and payment gateways
• Collaborated with UX designers to implement new features
• Improved application performance by 40% through code optimization`
        };

        modalTitle.textContent = role;
        modalDescription.textContent = descriptions[role];
        modal.style.display = 'block';
    });
});

// Close modal when clicking outside