// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.project-card, .skill-category, .highlight-item, .stats-card, .experience-card, .education-card, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fillBar 1.5s ease-out forwards';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Typing effect for heroe roles (looping between Data Analyst and ML Engineer)
const typedRoles = ['Data Analyst', 'ML Engineer'];
const typedRoleElement = document.querySelector('.typed-role');

if (typedRoleElement) {
    let roleIndex = 0;
    let charIndex = 0;
    const typingDelay = 120;
    const erasingDelay = 60;
    const holdDelay = 1500;

    const typeRole = () => {
        const currentRole = typedRoles[roleIndex];
        typedRoleElement.textContent = currentRole.slice(0, charIndex + 1);
        charIndex += 1;
        if (charIndex < currentRole.length) {
            setTimeout(typeRole, typingDelay);
        } else {
            setTimeout(eraseRole, holdDelay);
        }
    };

    const eraseRole = () => {
        const currentRole = typedRoles[roleIndex];
        charIndex -= 1;
        typedRoleElement.textContent = currentRole.slice(0, charIndex);
        if (charIndex > 0) {
            setTimeout(eraseRole, erasingDelay);
        } else {
            roleIndex = (roleIndex + 1) % typedRoles.length;
            setTimeout(typeRole, typingDelay);
        }
    };

    setTimeout(typeRole, typingDelay);
}

// Project Card Hover Effect - Add ripple
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transition = 'all 0.3s ease';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Counter Animation for About Highlights
function animateCounter(element, target) {
    let count = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(count) + '+';
        }
    }, 20);
}

// Observe about highlights for counter animation
const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3 = entry.target.querySelector('h3');
            const text = h3.textContent;
            if (text.includes('+')) {
                const number = parseInt(text);
                if (!isNaN(number)) {
                    h3.textContent = '0+';
                    animateCounter(h3, number);
                }
            }
            highlightObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.highlight-item').forEach(item => {
    highlightObserver.observe(item);
});

// Add cursor trail effect
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

if (circles.length === 0) {
    // Create cursor trail circles if they don't exist
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        document.body.appendChild(circle);
    }
}

const allCircles = document.querySelectorAll('.circle');

allCircles.forEach(function (circle) {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    allCircles.forEach(function (circle, index) {
        circle.style.left = x - 12 + 'px';
        circle.style.top = y - 12 + 'px';
        circle.style.transform = `scale(${(allCircles.length - index) / allCircles.length})`;

        circle.x = x;
        circle.y = y;

        const nextCircle = allCircles[index + 1] || allCircles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

// Disable cursor trail on mobile
if (window.innerWidth > 768) {
    animateCircles();
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add page transition effect
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic year in footer
const yearElement = document.querySelector('.footer-content p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
}

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.5)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.boxShadow = '0 5px 15px rgba(99, 102, 241, 0.4)';
});

// Console message
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cInterested in working together? Let\'s connect!', 'color: #8b5cf6; font-size: 14px;');
