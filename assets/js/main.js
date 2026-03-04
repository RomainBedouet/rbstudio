/**
 * RB Studio — Main JavaScript
 * Vanilla JS, no frameworks
 * Respects prefers-reduced-motion
 */

(function () {
    'use strict';

    // ========================================
    // Utility: Check for reduced motion preference
    // ========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ========================================
    // Mobile Navigation
    // ========================================
    const initMobileNav = () => {
        const burger = document.getElementById('burger');
        const nav = document.getElementById('nav');

        if (!burger || !nav) return;

        burger.addEventListener('click', () => {
            const isOpen = burger.getAttribute('aria-expanded') === 'true';

            burger.setAttribute('aria-expanded', !isOpen);
            nav.classList.toggle('is-open', !isOpen);

            // Prevent body scroll when menu is open
            document.body.style.overflow = !isOpen ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.setAttribute('aria-expanded', 'false');
                nav.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                burger.setAttribute('aria-expanded', 'false');
                nav.classList.remove('is-open');
                document.body.style.overflow = '';
                burger.focus();
            }
        });
    };

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    const initSmoothScroll = () => {
        // Only if reduced motion is not preferred (CSS handles this via scroll-behavior)
        // This adds extra control for programmatic scrolling
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Skip if just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    if (prefersReducedMotion) {
                        window.scrollTo(0, targetPosition);
                    } else {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }

                    // Update URL without jumping
                    history.pushState(null, '', href);
                }
            });
        });
    };

    // ========================================
    // FAQ Accordion
    // ========================================
    const initFaqAccordion = () => {
        const faqItems = document.querySelectorAll('.faq__item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');
            const answer = item.querySelector('.faq__answer');

            if (!question || !answer) return;

            question.addEventListener('click', () => {
                const isOpen = question.getAttribute('aria-expanded') === 'true';

                // Close all other items
                faqItems.forEach(otherItem => {
                    const otherQuestion = otherItem.querySelector('.faq__question');
                    const otherAnswer = otherItem.querySelector('.faq__answer');

                    if (otherItem !== item && otherQuestion && otherAnswer) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.hidden = true;
                    }
                });

                // Toggle current item
                question.setAttribute('aria-expanded', !isOpen);
                answer.hidden = isOpen;
            });
        });
    };

    // ========================================
    // Back to Top Button
    // ========================================
    const initBackToTop = () => {
        const backToTopBtn = document.getElementById('backToTop');

        if (!backToTopBtn) return;

        const toggleVisibility = () => {
            const scrollY = window.pageYOffset;
            const threshold = 400;

            if (scrollY > threshold) {
                backToTopBtn.hidden = false;
            } else {
                backToTopBtn.hidden = true;
            }
        };

        // Throttle scroll event
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    toggleVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Click handler
        backToTopBtn.addEventListener('click', () => {
            if (prefersReducedMotion) {
                window.scrollTo(0, 0);
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });

        // Initial check
        toggleVisibility();
    };

    // ========================================
    // Reveal on Scroll (IntersectionObserver)
    // ========================================
    const initRevealOnScroll = () => {
        // Skip if user prefers reduced motion
        if (prefersReducedMotion) return;

        const revealElements = document.querySelectorAll('.section, .pricing-card, .project-card, .offer__card, .process__step');

        if (!revealElements.length) return;

        // Add reveal class
        revealElements.forEach(el => {
            el.classList.add('reveal');
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        revealElements.forEach(el => {
            observer.observe(el);
        });
    };

    // ========================================
    // Header Scroll State
    // ========================================
    const initHeaderScroll = () => {
        const header = document.getElementById('header');

        if (!header) return;

        let lastScrollY = 0;

        const handleScroll = () => {
            const scrollY = window.pageYOffset;

            // Add/remove shadow on scroll
            if (scrollY > 10) {
                header.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }

            lastScrollY = scrollY;
        };

        // Throttle scroll event
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    };

    // ========================================
    // Dynamic Year in Footer
    // ========================================
    const initDynamicYear = () => {
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    };

    // ========================================
    // Form Enhancement
    // ========================================
    const initFormEnhancement = () => {
        const form = document.querySelector('.contact__form');

        if (!form) return;

        // Enhance form submission with mailto
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const activity = formData.get('activity') || '';
            const city = formData.get('city') || '';
            const message = formData.get('message') || '';

            // Build email body
            const subject = encodeURIComponent('Demande de devis — RB Studio');
            const body = encodeURIComponent(
                `Nom: ${name}\n` +
                `Email: ${email}\n` +
                `Activité: ${activity}\n` +
                `Ville: ${city}\n\n` +
                `Message:\n${message}`
            );

            // Open mailto link
            window.location.href = `mailto:romainbedouetdev@gmail.com?subject=${subject}&body=${body}`;
        });

        // Add visual feedback on input focus
        const inputs = form.querySelectorAll('.form__input, .form__textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('is-focused');
            });
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('is-focused');
            });
        });
    };

    // ========================================
    // Active Navigation Link Highlight
    // ========================================
    const initActiveNavHighlight = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        if (!sections.length || !navLinks.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    navLinks.forEach(link => {
                        link.classList.remove('is-active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('is-active');
                        }
                    });
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    };

    // ========================================
    // Initialize All
    // ========================================
    const init = () => {
        initMobileNav();
        initSmoothScroll();
        initFaqAccordion();
        initBackToTop();
        initRevealOnScroll();
        initHeaderScroll();
        initDynamicYear();
        initFormEnhancement();
        initActiveNavHighlight();
    };

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
