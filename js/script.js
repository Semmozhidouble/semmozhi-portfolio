
// ==========================================================================
// Advanced UI/UX Animations Module
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Inject Advanced UI Elements
    const body = document.body;
    
    // Noise Overlay
    const noise = document.createElement('div');
    noise.classList.add('noise-overlay');
    body.appendChild(noise);
    
    // Custom Cursor
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.id = 'cursor';
        const follower = document.createElement('div');
        follower.id = 'cursor-follower';
        body.appendChild(cursor);
        body.appendChild(follower);
        
        // Cursor Logic
        let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Immediate update for main cursor
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth follower loop
        setInterval(() => {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;
            follower.style.left = posX + 'px';
            follower.style.top = posY + 'px';
        }, 16);
        
        // Hover States
        const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
    }

    // 2. 3D Tilt Effect
    const tiltCards = document.querySelectorAll('.project-card, .skill-item, .about-card');
    
    tiltCards.forEach(card => {
        card.classList.add('tilt-card'); // Mark for CSS styling
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // 3. Text Scramble Effect (Cyberpunk Style)
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Apply Scramble to Titles
    const titles = document.querySelectorAll('.hero-title, .section-title, .project-title');
    titles.forEach(title => {
        const fx = new TextScramble(title);
        // Store original text
        title.dataset.original = title.innerText;
        
        title.addEventListener('mouseenter', () => {
            fx.setText(title.dataset.original);
        });
    });

});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile-specific optimizations
    const isMobile = window.innerWidth <= 768;
    const isTouchDevice = 'ontouchstart' in window;
    
    // Disable space objects on mobile for better performance
    if (isMobile) {
        const spaceObjects = document.querySelector('.space-objects');
        if (spaceObjects) {
            spaceObjects.style.display = 'none';
        }
        
        // Reduce animation intensity on mobile
        document.body.style.setProperty('--animation-scale', '0.5');
    }

    // Enhanced mobile navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');

    if (navToggle && navMenu) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function() {
            if (navigator.vibrate && isTouchDevice) {
                navigator.vibrate(50); // Short vibration
            }
            
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Mobile overlay click to close menu
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', closeMobileMenu);
        }

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        function openMobileMenu() {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
            if (mobileOverlay) mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Add setTheme function for mobile theme switching
        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Update desktop theme toggle icon
            const themeIcon = document.querySelector('.theme-icon');
            if (themeIcon) {
                if (theme === 'dark') {
                    themeIcon.textContent = '☀️';
                } else {
                    themeIcon.textContent = '🌙';
                }
            }
            
            // Add transition effect
            document.body.style.transition = 'all 0.3s ease';
        }
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on orientation change
        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }, 100);
        });
    }
    
    // Mobile touch improvements for buttons
    if (isTouchDevice) {
        const buttons = document.querySelectorAll('.btn, .social-btn, .nav-link');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let the form submit to Formspree
            // Just do basic validation first
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name.trim() || !email.trim() || !message.trim()) {
                e.preventDefault();
                alert('Please fill in all fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }

            // If validation passes, show confirmation and let form submit
            alert(`Thank you, ${name}! Your message is being sent. I'll get back to you soon!`);
        });
    }

    // Smooth scrolling for anchor links (if any are added later)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Add animation on scroll (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards for animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add loading state for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            // Fallback for broken images
            this.alt = 'Image not available';
            this.style.opacity = '0.5';
        });
        
        // Set initial opacity
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
});

// Add active navigation highlighting based on current page
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', highlightActiveNav);

// Typing Effect
function typeText(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text');
        setTimeout(() => {
            typeText(typingElement, text, 100);
        }, 1000);
    }

    // Animate skill bars when they come into view
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                    observer.unobserve(progressBar);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Initialize skill bar animations
    animateSkillBars();

    // Enhanced scroll animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.skill-item, .project-card, .about-text p, .section-title, .stat-item, .featured-card, .contact-form, .hero-content, .tech-card, .fun-facts');
        
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
        });

        const scrollObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    }

    // Initialize scroll animations
    initScrollAnimations();

    // Add smooth page transitions
    function initPageTransitions() {
        const links = document.querySelectorAll('a[href$=".html"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.hostname === window.location.hostname) {
                    e.preventDefault();
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(() => {
                        window.location.href = this.href;
                    }, 300);
                }
            });
        });
    }

    // Initialize page transitions
    initPageTransitions();

    // Add page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add floating animation to hero content
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
});

// Add CSS for fadeInUp animation if not already present
if (!document.querySelector('[data-animation-styles]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animation-styles', 'true');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        img.addEventListener('load', function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        });
        
        // Handle already loaded images
        if (img.complete) {
            img.classList.remove('loading');
            img.classList.add('loaded');
        }
    });
});

// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Check for saved theme or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }
    
    // Initialize icon
    updateThemeIcon(currentTheme);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon with animation
            themeIcon.style.transform = 'scale(0)';
            setTimeout(() => {
                updateThemeIcon(newTheme);
                themeIcon.style.transform = 'scale(1)';
            }, 150);
            
            // Add a nice transition effect
            document.body.style.transition = 'all 0.3s ease';
        });
    }
    
    // Smooth theme transition on page load
    setTimeout(() => {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }, 100);
});

// Auto-detect system theme preference (optional enhancement)
function detectSystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Only use system preference if no theme is saved
    if (!savedTheme) {
        const systemTheme = prefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemTheme);
        localStorage.setItem('theme', systemTheme);
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            if (newTheme === 'dark') {
                themeIcon.textContent = '☀️';
            } else {
                themeIcon.textContent = '🌙';
            }
        }
    }
});

// Initialize system theme detection
document.addEventListener('DOMContentLoaded', function() {
    // Only detect system theme if no preference is saved
    if (!localStorage.getItem('theme')) {
        detectSystemTheme();
    }
});

// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        // Hide loading screen after page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500); // Show loading for 1.5 seconds minimum
        });
    }
});

// Animated Counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        statNumbers.forEach(stat => {
            counterObserver.observe(stat);
        });
    }
});

// Enhanced Mouse Parallax Effect
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const particles = document.querySelectorAll('.particle');
    
    if (hero && particles.length > 0) {
        hero.addEventListener('mousemove', function(e) {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.5;
                const xMovement = (x - 0.5) * speed * 20;
                const yMovement = (y - 0.5) * speed * 20;
                
                particle.style.transform = `translate(${xMovement}px, ${yMovement}px)`;
            });
        });
        
        hero.addEventListener('mouseleave', function() {
            particles.forEach(particle => {
                particle.style.transform = 'translate(0, 0)';
            });
        });
    }
});

// Smooth reveal animations for sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.stats-section, .featured-projects');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
});

// Enhanced featured cards interaction
document.addEventListener('DOMContentLoaded', function() {
    const featuredCards = document.querySelectorAll('.featured-card');
    
    featuredCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle glow effect
            this.style.boxShadow = '0 20px 40px rgba(74, 144, 226, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove glow effect
            this.style.boxShadow = '';
        });
    });
});

// Add floating animation to stat items
document.addEventListener('DOMContentLoaded', function() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach((item, index) => {
        // Add staggered floating animation
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('float-animation');
    });
});

// Add CSS for floating animation
if (!document.querySelector('[data-float-animation]')) {
    const style = document.createElement('style');
    style.setAttribute('data-float-animation', 'true');
    style.textContent = `
        .float-animation {
            animation: floatStat 6s ease-in-out infinite;
        }
        
        @keyframes floatStat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Testimonials Animation
document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    
    const testimonialObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateY(30px)';
        testimonial.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        testimonialObserver.observe(testimonial);
    });
});

// Add cursor trail effect (subtle)
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-trail');
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
});

// Add CSS for cursor trail
if (!document.querySelector('[data-cursor-trail]')) {
    const style = document.createElement('style');
    style.setAttribute('data-cursor-trail', 'true');
    style.textContent = `
        .cursor-trail {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(74, 144, 226, 0.3), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.1s ease;
        }
        
        @media (max-width: 768px) {
            .cursor-trail {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced scroll to top with progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Create progress ring
        const progressRing = document.createElement('div');
        progressRing.classList.add('scroll-progress');
        scrollToTopBtn.appendChild(progressRing);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            if (scrollTop > 300) {
                scrollToTopBtn.classList.add('visible');
                progressRing.style.background = `conic-gradient(#4a90e2 ${scrollPercent * 3.6}deg, rgba(74, 144, 226, 0.2) 0deg)`;
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
    }
});

// Add CSS for scroll progress
if (!document.querySelector('[data-scroll-progress]')) {
    const style = document.createElement('style');
    style.setAttribute('data-scroll-progress', 'true');
    style.textContent = `
        .scroll-progress {
            position: absolute;
            top: -3px;
            left: -3px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: conic-gradient(#4a90e2 0deg, rgba(74, 144, 226, 0.2) 0deg);
            z-index: -1;
        }
        
        .scroll-to-top {
            position: relative;
        }
    `;
    document.head.appendChild(style);
}

// Add Easter egg - Konami code
document.addEventListener('DOMContentLoaded', function() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let userInput = [];
    
    document.addEventListener('keydown', function(e) {
        userInput.push(e.keyCode);
        userInput.splice(0, userInput.length - konamiCode.length);
        
        if (userInput.join(',') === konamiCode.join(',')) {
            // Easter egg activation
            document.body.style.animation = 'rainbow 2s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    });
});

// Add CSS for Easter egg
if (!document.querySelector('[data-easter-egg]')) {
    const style = document.createElement('style');
    style.setAttribute('data-easter-egg', 'true');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}
