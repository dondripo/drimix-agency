// Main JavaScript for Creative Agency Website

document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Scroll effect for header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Portfolio slider functionality
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - n)}%)`;
        });
    }
    
    if (slides.length > 0 && prevBtn && nextBtn) {
        // Initialize slider
        showSlide(currentSlide);
        
        // Next button
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
        
        // Previous button
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
        
        // Auto slide
        setInterval(function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(n) {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.display = index === n ? 'block' : 'none';
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === n);
        });
    }
    
    if (testimonials.length > 0 && dots.length > 0) {
        // Initialize testimonials
        showTestimonial(currentTestimonial);
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });
        
        // Auto rotate testimonials
        setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 6000);
    }
    
    // Lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (galleryItems.length > 0 && lightbox && lightboxImg && closeLightbox) {
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const imgSrc = item.querySelector('img').getAttribute('src');
                const imgAlt = item.querySelector('img').getAttribute('alt');
                
                lightboxImg.setAttribute('src', imgSrc);
                lightboxCaption.textContent = imgAlt;
                lightbox.classList.add('active');
            });
        });
        
        closeLightbox.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fade-in animation for elements
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check
    checkFade();
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);
});
