// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const closeBtn = document.getElementById('closeBtn');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking close button
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Don't unobserve so animation can trigger again on scroll
        } else {
            // Remove animated class when element goes out of view (for re-animation on scroll up/down)
            entry.target.classList.remove('animated');
        }
    });
}, observerOptions);

// Enhanced scroll animation with direction detection
let lastScrollY = window.scrollY;
let scrollDirection = 'down';

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Detect scroll direction
    if (currentScrollY > lastScrollY) {
        scrollDirection = 'down';
    } else {
        scrollDirection = 'up';
    }
    
    lastScrollY = currentScrollY;
    
    // Add scroll class to body for CSS animations
    document.body.classList.toggle('scrolling-down', scrollDirection === 'down');
    document.body.classList.toggle('scrolling-up', scrollDirection === 'up');
});

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    // Observe sections with fade-in classes (they already have CSS animations, just need to trigger on scroll)
    // Exclude the hero section (#home) so the hero uses CSS-only load animations
    const sectionElements = document.querySelectorAll('section:not(#home)');
    sectionElements.forEach(section => {
        observer.observe(section);
    });

    // Observe skill cards with delays
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Observe process items
    const processItems = document.querySelectorAll('.process-item');
    processItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });
    
    // Observe about content
    // Disabled scroll-triggered animation for About section so it uses CSS-only animations on load
    // (Removed: observing '.about-text' and '.stats-container')
    
    // Observe testimonial slide
    const testimonialSlide = document.querySelector('.testimonial-slide');
    if (testimonialSlide) {
        testimonialSlide.classList.add('animate-on-scroll');
        observer.observe(testimonialSlide);
    }
    
    // Observe contact content
    const contactElements = document.querySelectorAll('.contact-info, .contact-form');
    contactElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Observe section dividers for scroll animation
    const sectionDividers = document.querySelectorAll('.section-divider');
    sectionDividers.forEach(divider => {
        observer.observe(divider);
    });
});

// Counter Animation for Statistics
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const target = parseInt(statNumber.getAttribute('data-target'));
            animateCounter(statNumber, target);
            statsObserver.unobserve(statNumber);
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Testimonial Carousel
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const testimonialSlide = document.querySelector('.testimonial-slide');
const indicatorDots = document.querySelectorAll('.indicator-dot');

// Testimonials data
const testimonials = [
    {
        quote: "Aditya immediately understood our product goals and translated them into a beautifully optimized web experience. His technical expertise and collaborative spirit made a complex project feel effortless.",
        name: "Carlos Méndez",
        role: "Co-Founder of Launchl"
    },
    {
        quote: "Working with Aditya was a game-changer for our business. His attention to detail and commitment to quality is unmatched. Highly recommended!",
        name: "Sarah Johnson",
        role: "CEO of TechStart"
    },
    {
        quote: "Aditya delivered beyond our expectations. The project was completed on time and the code quality was exceptional. We'll definitely work together again.",
        name: "Michael Chen",
        role: "Product Manager at InnovateLab"
    },
    {
        quote: "The level of professionalism and technical skill Aditya brought to our project was outstanding. He transformed our vision into reality with precision and creativity.",
        name: "Emily Rodriguez",
        role: "Founder of DesignHub"
    }
];

let currentTestimonial = 0;

const updateTestimonial = (index) => {
    const testimonial = testimonials[index];
    const quoteElement = document.querySelector('.testimonial-text');
    const nameElement = document.querySelector('.author-name');
    const roleElement = document.querySelector('.author-role');
    
    if (quoteElement && nameElement && roleElement) {
        // Fade out
        quoteElement.style.opacity = '0';
        nameElement.style.opacity = '0';
        roleElement.style.opacity = '0';
        
        setTimeout(() => {
            quoteElement.textContent = testimonial.quote;
            nameElement.textContent = testimonial.name;
            roleElement.textContent = testimonial.role;
            
            // Fade in
            quoteElement.style.opacity = '1';
            nameElement.style.opacity = '1';
            roleElement.style.opacity = '1';
        }, 250);
    }
    
    // Update indicator (if multiple dots exist)
    if (indicatorDots && indicatorDots.length > 1) {
        indicatorDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
};

// Initialize testimonials with multiple slides
const initTestimonials = () => {
    const wrapper = document.querySelector('.testimonials-wrapper');
    if (!wrapper) return;
    
    // Create multiple slides if needed
    testimonials.forEach((testimonial, index) => {
        if (index === 0) {
            // First slide already exists, just update it
            updateTestimonial(0);
        } else {
            // For now, we'll use a single slide and update content
            // This keeps it simpler and matches the reference design better
        }
    });
};

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTestimonials();
    
    // Add transition styles
    const style = document.createElement('style');
    style.textContent = `
        .testimonial-text,
        .author-name,
        .author-role {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation and submission handling
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            submitBtn.style.background = '#00ff88';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// Parallax effect for hero section
// Disabled: hero now uses CSS-only animations on page load (no scroll-based transform/opacity)

// Skill card hover animations
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const image = this.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1.1)';
            image.style.transition = 'transform 0.5s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const image = this.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Service item hover effect
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const number = this.querySelector('.service-number');
        if (number) {
            number.style.opacity = '0.5';
            number.style.transform = 'scale(1.1)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const number = this.querySelector('.service-number');
        if (number) {
            number.style.opacity = '0.3';
            number.style.transform = 'scale(1)';
        }
    });
});

// Add active class to navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Hero name animation is handled by CSS (slide-in-left)

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Stagger animations are handled inline in the observer setup above

// Performance optimization: Debounce scroll events
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll handlers
const handleScroll = debounce(() => {
    // Scroll-dependent code here
}, 10);

window.addEventListener('scroll', handleScroll);

// Initialize all animations on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Add initial opacity to body for smooth page load
document.body.style.opacity = '0';

