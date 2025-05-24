// Main JavaScript for Drimix Agency Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation toggle
    initNavigation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize FAQ accordions
    initFaqAccordions();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize stat counters
    initStatCounters();
    
    // Initialize header scroll effect
    initHeaderScroll();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle animation for hamburger icon
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-toggle') && !event.target.closest('.nav-menu')) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // Reset hamburger icon
                const spans = document.querySelectorAll('.nav-toggle span');
                spans.forEach(span => span.classList.remove('active'));
            }
        }
    });
}

// Scroll animations
function initAnimations() {
    // Scroll animation for elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Initial check for elements in viewport
    checkAnimatedElements();
    
    // Check on scroll
    window.addEventListener('scroll', checkAnimatedElements);
    
    function checkAnimatedElements() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9) {
                element.classList.add('show');
            }
        });
    }
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    // Set initial active slide
    showSlide(currentSlide);
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }
    
    // Dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide change
    setInterval(function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
}

// FAQ accordions functionality
function initFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Toggle current item
                item.classList.toggle('active');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission (in a real site, this would send data to a server)
            setTimeout(function() {
                contactForm.style.display = 'none';
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
            }, 1000);
        });
    }
}

// Stat counters animation
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!statNumbers.length) return;
    
    let countersStarted = false;
    
    // Check if counters are in viewport
    window.addEventListener('scroll', function() {
        if (countersStarted) return;
        
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        
        const statsSectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsSectionTop < windowHeight * 0.8) {
            startCounters();
            countersStarted = true;
        }
    });
    
    // Initial check
    if (isInViewport(document.querySelector('.stats'))) {
        startCounters();
        countersStarted = true;
    }
    
    function startCounters() {
        statNumbers.forEach(statNumber => {
            const targetValue = parseInt(statNumber.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            const startValue = 0;
            
            function updateCounter() {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                
                if (elapsedTime < duration) {
                    const value = Math.floor(easeInOutQuad(elapsedTime, startValue, targetValue, duration));
                    statNumber.textContent = value;
                    requestAnimationFrame(updateCounter);
                } else {
                    statNumber.textContent = targetValue;
                }
            }
            
            updateCounter();
        });
    }
    
    // Easing function for smooth animation
    function easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }
    
    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight * 0.8
        );
    }
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});
