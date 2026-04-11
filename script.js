/**
 * WISPA AI - Interactive Behaviors
 * Pure vanilla JavaScript - no dependencies
 */

(function() {
    'use strict';

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle menu on button click
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                mobileMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            } else {
                mobileMenu.classList.add('active');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
        });

        // Close menu when clicking on a link
        mobileNavLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ========================================
    // FAQ ACCORDION
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        if (otherQuestion) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    question.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });

            // Keyboard accessibility
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        }
    });

    // ========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            
            // Ignore empty anchors
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Get header height for offset
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Calculate position
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // SCROLL-BASED HEADER SHADOW (OPTIONAL)
    // ========================================
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        if (scrollTop > 0) {
            header.style.boxShadow = '0 2px 0 rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // ========================================
    // LAZY LOAD OPTIMIZATION (FUTURE)
    // ========================================
    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with fade-in class (if you add them)
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // ========================================
    // STAT CARDS ANIMATION ON HOVER
    // ========================================
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            // Add any additional animation logic if needed
        });
    });

    // ========================================
    // FORM VALIDATION (IF YOU ADD FORMS LATER)
    // ========================================
    const ctaButtons = document.querySelectorAll('.btn-cta-main, .btn-cta, .btn-primary');

    ctaButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            // Placeholder for future form handling
            console.log('CTA clicked - implement form handling here');
            
            // Example: Open modal, show form, etc.
            // For now, just prevent default if needed
            // e.preventDefault();
        });
    });

    // ========================================
    // ACCESSIBILITY: SKIP TO CONTENT
    // ========================================
    // Add skip link for keyboard navigation (optional enhancement)
    const createSkipLink = function() {
        const skipLink = document.createElement('a');
        skipLink.href = '#system';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--color-accent);
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            font-weight: bold;
            z-index: 10000;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    };

    // Uncomment to enable skip link
    // createSkipLink();

    // ========================================
    // PERFORMANCE: DEBOUNCE UTILITY
    // ========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ========================================
    // WINDOW RESIZE HANDLER
    // ========================================
    const handleResize = debounce(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // ========================================
    // CONSOLE MESSAGE (OPTIONAL BRANDING)
    // ========================================
    console.log('%c👋 Hello from Wispa AI', 'font-size: 20px; font-weight: bold; color: #FF3000;');
    console.log('%cDesigned with Swiss Precision', 'font-size: 12px; color: #000000;');
    console.log('%cInterested in joining our team? Email: hello@wispa.ai', 'font-size: 12px; color: #666;');

    // ========================================
    // INITIALIZATION COMPLETE
    // ========================================
    console.log('✓ Wispa AI - All systems operational');

})();
