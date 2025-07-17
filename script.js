// Typing Effect
const typingElement = document.querySelector('.typing-text');
const roles = ['Frontend Developer', 'Backend Developer','Ai/Ml Enthusiast'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
typeEffect();

// Particle Background
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = Math.random() * 3 + 2 + 's';
    particle.style.opacity = Math.random();
    document.getElementById('particles-container').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Create particles
setInterval(createParticle, 300);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});


    // Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
   hamburger.classList.remove('active');
   navMenu.classList.remove('active');
}));

// Scroll Reveal Animation
const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
       if (entry.isIntersecting) {
           entry.target.classList.add('animate');
       }
   });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section-title, .about-text, .about-stats, .project-card, .contact-info, .contact-form').forEach(el => {
   observer.observe(el);
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
   const navbar = document.querySelector('.navbar');
   if (window.scrollY > 50) {
       navbar.style.background = 'rgba(26, 26, 26, 0.95)';
   } else {
       navbar.style.background = 'rgba(26, 26, 26, 0.9)';
   }
});

// Active Navigation Link
window.addEventListener('scroll', () => {
   const sections = document.querySelectorAll('section');
   const navLinks = document.querySelectorAll('.nav-link');
   
   let current = '';
   sections.forEach(section => {
       const sectionTop = section.offsetTop;
       const sectionHeight = section.clientHeight;
       if (scrollY >= sectionTop - 200) {
           current = section.getAttribute('id');
       }
   });
   
   navLinks.forEach(link => {
       link.classList.remove('active');
       if (link.getAttribute('href') === `#${current}`) {
           link.classList.add('active');
       }
   });
});

// Project Card Stagger Animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
   card.style.animationDelay = `${index * 0.2}s`;
});

// Form Submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
   e.preventDefault();
   
   // Get form data
   const formData = new FormData(e.target);
   const name = e.target.querySelector('input[type="text"]').value;
   const email = e.target.querySelector('input[type="email"]').value;
   const message = e.target.querySelector('textarea').value;
   
   // Simple validation
   if (name && email && message) {
       // Show success message
       showNotification('Message sent successfully!', 'success');
       
       // Reset form
       e.target.reset();
       
       // Here you would typically send the data to your server
       console.log('Form submitted:', { name, email, message });
   } else {
       showNotification('Please fill in all fields.', 'error');
   }
});

// Notification System
function showNotification(message, type) {
   const notification = document.createElement('div');
   notification.className = `notification ${type}`;
   notification.textContent = message;
   
   // Add styles
   notification.style.cssText = `
       position: fixed;
       top: 20px;
       right: 20px;
       background: ${type === 'success' ? '#4CAF50' : '#f44336'};
       color: white;
       padding: 1rem 1.5rem;
       border-radius: 10px;
       z-index: 10000;
       animation: slideInRight 0.3s ease;
   `;
   
   document.body.appendChild(notification);
   
   setTimeout(() => {
       notification.style.animation = 'slideOutRight 0.3s ease';
       setTimeout(() => {
           notification.remove();
       }, 300);
   }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
   @keyframes slideInRight {
       from {
           transform: translateX(100%);
           opacity: 0;
       }
       to {
           transform: translateX(0);
           opacity: 1;
       }
   }
   
   @keyframes slideOutRight {
       from {
           transform: translateX(0);
           opacity: 1;
       }
       to {
           transform: translateX(100%);
           opacity: 0;
       }
   }
   
   .nav-link.active {
       color: var(--primary-color);
   }
   
   .nav-link.active::after {
       width: 100%;
   }
`;
document.head.appendChild(style);

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
   position: fixed;
   bottom: 20px;
   right: 20px;
   width: 50px;
   height: 50px;
   border-radius: 50%;
   background: var(--gradient-1);
   border: none;
   color: white;
   font-size: 1.2rem;
   cursor: pointer;
   opacity: 0;
   visibility: hidden;
   transition: all 0.3s ease;
   z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
   if (window.scrollY > 300) {
       scrollToTopBtn.style.opacity = '1';
       scrollToTopBtn.style.visibility = 'visible';
   } else {
       scrollToTopBtn.style.opacity = '0';
       scrollToTopBtn.style.visibility = 'hidden';
   }
});

scrollToTopBtn.addEventListener('click', () => {
   window.scrollTo({
       top: 0,
       behavior: 'smooth'
   });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
   const scrolled = window.pageYOffset;
   const hero = document.querySelector('.hero');
   if (hero) {
       hero.style.transform = `translateY(${scrolled * 0.5}px)`;
   }
});

// Mouse Cursor Effect
document.addEventListener('mousemove', (e) => {
   const cursor = document.querySelector('.cursor');
   if (!cursor) {
       const newCursor = document.createElement('div');
       newCursor.className = 'cursor';
       newCursor.style.cssText = `
           position: fixed;
           width: 20px;
           height: 20px;
           background: var(--primary-color);
           border-radius: 50%;
           pointer-events: none;
           z-index: 9999;
           transition: transform 0.1s ease;
           mix-blend-mode: difference;
       `;
       document.body.appendChild(newCursor);
   }
   
   const currentCursor = document.querySelector('.cursor');
   currentCursor.style.left = e.clientX - 10 + 'px';
   currentCursor.style.top = e.clientY - 10 + 'px';
});

// Hover effects for interactive elements
document.querySelectorAll('a, button, .project-card').forEach(el => {
   el.addEventListener('mouseenter', () => {
       const cursor = document.querySelector('.cursor');
       if (cursor) {
           cursor.style.transform = 'scale(1.5)';
       }
   });
   
   el.addEventListener('mouseleave', () => {
       const cursor = document.querySelector('.cursor');
       if (cursor) {
           cursor.style.transform = 'scale(1)';
       }
   });
});

// Loading Animation
window.addEventListener('load', () => {
   const loader = document.createElement('div');
   loader.className = 'loader';
   loader.innerHTML = `
       <div class="loader-content">
           <div class="spinner"></div>
           <p>Loading...</p>
       </div>
   `;
   
   loader.style.cssText = `
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background: var(--bg-color);
       display: flex;
       justify-content: center;
       align-items: center;
       z-index: 10000;
       animation: fadeOut 1s ease 2s forwards;
   `;
   
   const spinnerStyle = document.createElement('style');
   spinnerStyle.textContent = `
       .loader-content {
           text-align: center;
       }
       
       .spinner {
           width: 50px;
           height: 50px;
           border: 3px solid rgba(255, 0, 128, 0.3);
           border-top: 3px solid var(--primary-color);
           border-radius: 50%;
           animation: spin 1s linear infinite;
           margin: 0 auto 1rem;
       }
       
       @keyframes spin {
           0% { transform: rotate(0deg); }
           100% { transform: rotate(360deg); }
       }
       
       @keyframes fadeOut {
           to {
               opacity: 0;
               visibility: hidden;
           }
       }
   `;
   
   document.head.appendChild(spinnerStyle);
   document.body.appendChild(loader);
   
   setTimeout(() => {
       loader.remove();
       spinnerStyle.remove();
   }, 3000);
});

// Skill Progress Animation
function animateSkillBars() {
   const skillBars = document.querySelectorAll('.skill-bar');
   skillBars.forEach(bar => {
       const progress = bar.getAttribute('data-progress');
       bar.style.width = progress + '%';
   });
}

// Intersection Observer for skill bars
const skillObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
       if (entry.isIntersecting) {
           animateSkillBars();
       }
   });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
   skillObserver.observe(skillsSection);
}

// Dynamic Project Loading (simulation)
function loadMoreProjects() {
   const projectsGrid = document.querySelector('.projects-grid');
   const loadMoreBtn = document.querySelector('.load-more-btn');
   
   if (loadMoreBtn) {
       loadMoreBtn.addEventListener('click', () => {
           // Simulate loading new projects
           showNotification('Loading more projects...', 'success');
           
           // Add loading state
           loadMoreBtn.textContent = 'Loading...';
           loadMoreBtn.disabled = true;
           
           setTimeout(() => {
               loadMoreBtn.textContent = 'Load More';
               loadMoreBtn.disabled = false;
               showNotification('No more projects to load', 'error');
           }, 2000);
       });
   }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
   loadMoreProjects();
   
   // Add smooth reveal for elements
   const revealElements = document.querySelectorAll('.reveal');
   revealElements.forEach(el => {
       observer.observe(el);
   });
});

// Performance optimization - throttle scroll events
function throttle(func, wait) {
   let timeout;
   return function executedFunction(...args) {
       const later = () => {
           clearTimeout(timeout);
           func(...args);
       };
       clearTimeout(timeout);
       timeout = setTimeout(later, wait);
   };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
   // Your scroll-based animations here
}, 16)); // ~60fps

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

document.addEventListener('keydown', (e) => {
   konamiCode.push(e.keyCode);
   if (konamiCode.length > konamiSequence.length) {
       konamiCode.shift();
   }
   
   if (konamiCode.join(',') === konamiSequence.join(',')) {
       showNotification('🎉 Easter egg activated! You found the secret!', 'success');
       document.body.style.animation = 'rainbow 2s ease-in-out';
       
       // Add rainbow animation
       const rainbowStyle = document.createElement('style');
       rainbowStyle.textContent = `
           @keyframes rainbow {
               0% { filter: hue-rotate(0deg); }
               100% { filter: hue-rotate(360deg); }
           }
       `;
       document.head.appendChild(rainbowStyle);
       
       setTimeout(() => {
           document.body.style.animation = '';
           rainbowStyle.remove();
       }, 2000);
       
       konamiCode = [];
   }
});
// Scroll reveal for Resume Section
window.addEventListener("scroll", function () {
    const resumeSection = document.querySelector(".resume-section");
    const sectionPos = resumeSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos) {
        resumeSection.classList.add("visible");
    }
});
