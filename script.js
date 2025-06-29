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
        const targetId = this.getAttribute('href');

        // Only run smooth scroll if it's an in-page anchor (starts with #)
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            const navHeight = document.querySelector('nav').offsetHeight;

            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: 'smooth'
            });
        }
    });
});


// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    if (email && message) {
        alert('Message sent!');
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
            'Network Config & Sec': 'Managing network security protocols, configuring network devices, and overseeing IDS/IPS systems',
            'Penetration Testing': 'Performing security assessments and identifying vulnerabilities across systems and networks.',
            'Security Hardening': 'Understanding encryption algorithms, secure communication protocols, and key management. Proficient in ISO/IEC, NIST, GDPR, HIPAA security frameworks',
            'Operating Systems': 'Installing, configuring, and troubleshooting various operating systems (Windows, Linux, macOS).',
            'Troubleshoot': 'Skilled in diagnosing and resolving hardware and software issues within the network.',
            'Forensics': 'Experienced in digital forensics, incident response, and root cause analysis (RCA).',
            'Coding': 'Knowledgeable in multiple programming languages including Python, JavaScript, and C#.',
            'Scripting': 'Experienced in writing and utilizing scripts for automation and tasks.',
            'Information Security (INFOSEC)': 'Skilled in identifying, mitigating, and preventing security threats to ensure the confidentiality, integrity, and availability of information systems.'
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
            'Security Analyst': ['Conducted comprehensive audits and assessments of security frameworks using industry standards and tools, achieving a 98% accuracy rate. ',
                'Utilized collaboration with subject matter experts to compile and revise technical documentation, elevating completion efficiency by 30%.',
                'Mentored junior analyst and conducted report reviews',
                'Actively raise issues, provide feedback, and communicate with Security Research Analysts and Customer Operations Lead.',
                'Employed proactive measures to deepen technical expertise in drafting security questionnaires and RFPs, staying current with the latest writing methods and technology trends in security and compliance.'],

            'Customer and IT Support': ['Managed client relationships as the primary point of contact, successfully increasing client satisfaction over three months.',
                'Provided technical support to over 30 clients within through phone, email, and in-person interactions.',
                'Diagnosed and resolved hardware, software, and network issues, reducing downtime for clients and ensuring minimal disruption to their operations.',
                'Conducted product demonstrations and training sessions for over 13 clients, resulting increase in product adoption rates within six months.'],

            'Technical Support Intern': ['Coordinate with database administration and the IT department to ensure the smooth running of all software programs.',
                    'Perform routine maintenance on computers and other equipment including running virus scans, cleaning up the memory, OS installation, and upgrading software and hardware as needed.',
                    'Provided on-call assistance in fixing software and hardware problems to multiple branches of the company']
        };

        modalTitle.textContent = role;
        modalDescription.innerHTML = '<ul>' + descriptions[role].map(item => `<li>${item}</li>`).join('') + '</ul>';
        modal.style.display = 'block';
    });
});

// Close modal when clicking outside