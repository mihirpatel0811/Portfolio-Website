/* ==========================================================================
   MIHIR BHAYANI - PROFESSIONAL PORTFOLIO JAVASCRIPT
   Version: 2.0.0
   Author: Mihir Bhayani
   Description: Advanced interactive features, animations, and state management.
   ========================================================================== */

/**
 * Table of Contents:
 * 1. Global State & Constants
 * 2. Core Initialization
 * 3. Preloader & Page Transitions
 * 4. Custom Cursor & Interactive Backgrounds
 * 5. Theme & Persistence Logic
 * 6. Navigation & Mobile Interaction
 * 7. Typewriter & Content Animations
 * 8. Performance Tracking & Stats Counters
 * 9. Technical Skills & Progress Visualization
 * 10. Project Management & Filtering System
 * 11. Professional Badges Section
 * 12. Certification & Modal Gallery
 * 13. Timeline & Education Logic
 * 14. Advanced Contact Form & EmailJS Integration
 * 15. Scroll Utilities & Progress Indicators
 * 16. Accessibility & Helper Functions
 */

"use strict";

/* ==========================================================================
   1. GLOBAL STATE & CONSTANTS
   ========================================================================== */
const PortfolioConfig = {
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000,
    headerOffset: 80,
    emailJsKey: '9qGAudHB68JhaxLlk',
    emailJsService: 'service_rvdz6q6',
    emailJsTemplate: 'template_olnjcpm',
    debug: false,
    // Birth date for auto age calculation
    birthDate: new Date('2002-08-08')
};

/* ==========================================================================
   2. CORE INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    if (PortfolioConfig.debug) {
        console.log("%c Portfolio Initialized Successfully ", "background: #6366f1; color: #fff; padding: 5px; border-radius: 3px;");
    }

    // Core Engine Starts
    App.init();
});

const App = {
    init: function () {
        this.initPreloader();
        this.initThemeSystem();
        this.initNavigation();
        this.updateStatsCount();
        this.updateAge(); // Auto calculate age based on birth date
        this.initVisualEffects();
        this.initContentLogic();
        this.initFormHandlers();
        this.initScrollEngine();
        this.initAccessibility();
        this.initShowMoreToggle();
    },

    /* ==========================================================================
       3. PRELOADER & PAGE TRANSITIONS
       ========================================================================== */
    initPreloader: function () {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;

        // Use a much shorter delay (300ms) just to ensure the transition is smooth
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            this.revealHero();
        });

        // Safety fallback: if the page takes too long, hide preloader after 3 seconds
        setTimeout(() => {
            if (!preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }, 3000);
    },

    revealHero: function () {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    },

    /* ==========================================================================
       4. CUSTOM CURSOR & INTERACTIVE BACKGROUNDS
       ========================================================================== */
    initVisualEffects: function () {
        this.setupCursorGlow();
        this.setupParticleSystem();
        this.setupParallaxElements();
    },

    setupCursorGlow: function () {
        const cursor = document.querySelector('.cursor-glow');
        if (!cursor) return;

        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            requestAnimationFrame(() => {
                cursor.style.left = `${clientX}px`;
                cursor.style.top = `${clientY}px`;
            });
        });

        document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
        document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    },

    setupParticleSystem: function () {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        const createParticle = () => {
            const particle = document.createElement('span');
            const size = Math.random() * 5 + 2;
            const duration = Math.random() * 10 + 10;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.opacity = Math.random() * 0.5;

            container.appendChild(particle);
            setTimeout(() => particle.remove(), duration * 1000);
        };

        setInterval(createParticle, 500);
    },

    setupParallaxElements: function () {
        window.addEventListener('scroll', () => {
            const orbs = document.querySelectorAll('.gradient-orb');
            const scrolled = window.pageYOffset;

            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.1;
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    },

    /* ==========================================================================
       5. THEME & PERSISTENCE LOGIC
       ========================================================================== */
    initThemeSystem: function () {
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        const applyTheme = (theme) => {
            if (theme === 'dark') {
                body.classList.add('dark-mode');
                document.documentElement.classList.add('dark-mode');
                document.documentElement.setAttribute('data-theme', 'dark');
                if (themeToggle) {
                    const icon = themeToggle.querySelector('i');
                    if (icon) icon.className = 'bx bx-sun';
                }
            } else {
                body.classList.remove('dark-mode');
                document.documentElement.classList.remove('dark-mode');
                document.documentElement.setAttribute('data-theme', 'light');
                if (themeToggle) {
                    const icon = themeToggle.querySelector('i');
                    if (icon) icon.className = 'bx bx-moon';
                }
            }
        };

        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const isDark = !body.classList.contains('dark-mode');
                const newTheme = isDark ? 'dark' : 'light';
                localStorage.setItem('theme', newTheme);
                applyTheme(newTheme);
            });
        }
    },

    /* ==========================================================================
       6. NAVIGATION & MOBILE INTERACTION
       ========================================================================== */
    initNavigation: function () {
        const header = document.querySelector('.header');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.navbar a');

        // Sticky Header Logic
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });

        // Mobile Menu Logic
        if (mobileBtn) {
            mobileBtn.addEventListener('click', () => {
                navbar.classList.toggle('active');
                mobileBtn.classList.toggle('active');
            });
        }

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navbar.classList.remove('active');
                mobileBtn.classList.remove('active');
                this.smoothScroll(e);
            });
        });

        this.updateActiveNavLink();
    },

    smoothScroll: function (e) {
        const targetId = e.currentTarget.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - PortfolioConfig.headerOffset,
                    behavior: 'smooth'
                });
            }
        }
    },

    updateActiveNavLink: function () {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar a');

        window.addEventListener('scroll', () => {
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    },

    /* ==========================================================================
       7. TYPEWRITER & CONTENT ANIMATIONS
       ========================================================================== */
    initContentLogic: function () {
        this.initTypewriter();
        this.initSkillVisualization();
        this.initAOS();
        this.initProfessionalBadges();
        this.initCharacterEffects();
        this.initProjectSystem();
    },

    initTypewriter: function () {
        const target = document.querySelector('.typed-text');
        if (!target) return;

        const words = ['Full-Stack Developer', 'Web Designer', 'MCA Student', 'Problem Solver'];
        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIdx];
            const shouldDelete = isDeleting;

            target.textContent = currentWord.substring(0, shouldDelete ? charIdx - 1 : charIdx + 1);
            charIdx = shouldDelete ? charIdx - 1 : charIdx + 1;

            let speed = PortfolioConfig.typingSpeed;
            if (shouldDelete) speed /= 2;

            if (!shouldDelete && charIdx === currentWord.length) {
                isDeleting = true;
                speed = PortfolioConfig.pauseDuration;
            } else if (shouldDelete && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                speed = 500;
            }

            setTimeout(type, speed);
        };

        setTimeout(type, 1000);
    },

    /* ==========================================================================
       8. PERFORMANCE TRACKING & STATS COUNTERS
       ========================================================================== */
    updateStatsCount: function () {
        // Count projects, certificates, and badges dynamically from the DOM
        const projects = document.querySelectorAll('.project-container .project-box');
        const certificates = document.querySelectorAll('.cert-grid .cert-card');
        const badges = document.querySelectorAll('.badge-grid .badge-card');

        const stats = document.querySelectorAll('.stat-number[data-target]');

        // Update projects count
        if (stats.length > 0 && projects.length > 0) {
            stats[0].dataset.target = projects.length;
        }

        // Update certificate count
        if (stats.length > 1 && certificates.length > 0) {
            stats[1].dataset.target = certificates.length;
        }

        // Update badge count
        if (stats.length > 2 && badges.length > 0) {
            stats[2].dataset.target = badges.length;
        }
    },

    /* ==========================================================================
       AUTO AGE CALCULATION
       ========================================================================== */
    updateAge: function () {
        const ageDisplay = document.getElementById('age-display');
        if (!ageDisplay) return;

        const birthDate = PortfolioConfig.birthDate;
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Adjust if birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        ageDisplay.textContent = age + ' Years';
    },

    initSkillVisualization: function () {
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateValue(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 1 });

        stats.forEach(stat => observer.observe(stat));
    },

    animateValue: function (obj) {
        const target = parseInt(obj.getAttribute('data-target'));
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const update = () => {
            start += increment;
            if (start < target) {
                obj.textContent = Math.floor(start) + "+";
                requestAnimationFrame(update);
            } else {
                obj.textContent = target + "+";
            }
        };
        update();
    },

    /* ==========================================================================
       9. TECHNICAL SKILLS & PROGRESS VISUALIZATION
       ========================================================================== */
    initAOS: function () {
        const animatedElements = document.querySelectorAll('[data-aos]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Handle skill bar animations with delay
                    if (entry.target.classList.contains('bar-fill')) {
                        const width = entry.target.dataset.width;
                        const delay = entry.target.dataset.delay || 0;
                        setTimeout(() => {
                            entry.target.style.width = `${width}%`;
                        }, Number.parseInt(delay));
                    }

                    entry.target.classList.add('aos-animate');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    },

    /* ==========================================================================
       10. PROJECT MANAGEMENT & FILTERING SYSTEM
       ========================================================================== */
    initProjectSystem: function () {
        const filters = Array.from(document.querySelectorAll('.filter-btn'));
        const projects = Array.from(document.querySelectorAll('#projects .project-box'));
        const showMoreBtn = document.querySelector('#projects .show-more-btn');
        const visibleLimit = 3;
        let activeFilter = 'all';
        let expanded = false;

        if (!filters.length || !projects.length) return;

        const updateButton = (matchingCount) => {
            if (!showMoreBtn) return;

            const btnText = showMoreBtn.querySelector('.btn-text');
            const shouldShow = matchingCount > visibleLimit;

            showMoreBtn.style.display = shouldShow ? '' : 'none';
            showMoreBtn.classList.toggle('expanded', expanded);

            if (btnText) {
                btnText.textContent = expanded ? 'Show Less' : 'Show More';
            }
        };

        const renderProjects = () => {
            let matchingIndex = 0;
            let matchingCount = 0;

            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                const matches = activeFilter === 'all' || activeFilter === category;

                project.classList.toggle('filter-hidden', !matches);
                project.classList.remove('expanding', 'collapsing');

                if (matches) {
                    const shouldHide = !expanded && matchingIndex >= visibleLimit;
                    project.classList.toggle('hidden', shouldHide);
                    matchingIndex += 1;
                    matchingCount += 1;
                } else {
                    project.classList.add('hidden');
                }
            });

            updateButton(matchingCount);
        };

        filters.forEach(btn => {
            btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));

            btn.addEventListener('click', () => {
                activeFilter = btn.getAttribute('data-filter') || 'all';
                expanded = false;

                filters.forEach(f => {
                    const isActive = f === btn;
                    f.classList.toggle('active', isActive);
                    f.setAttribute('aria-pressed', String(isActive));
                });

                btn.classList.add('active');
                renderProjects();
            });
        });

        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                expanded = !expanded;
                
                let matchingIndex = 0;
                let matchingCount = 0;

                projects.forEach(project => {
                    const category = project.getAttribute('data-category');
                    const matches = activeFilter === 'all' || activeFilter === category;
                    if (!matches) return;

                    if (expanded) {
                        if (matchingIndex >= visibleLimit) {
                            project.classList.remove('hidden');
                            project.classList.add('expanding');
                            setTimeout(() => {
                                project.classList.remove('expanding');
                            }, 400);
                        }
                    } else {
                        if (matchingIndex >= visibleLimit) {
                            project.classList.add('collapsing');
                            setTimeout(() => {
                                project.classList.remove('collapsing');
                                project.classList.add('hidden');
                            }, 300);
                        }
                    }
                    matchingIndex += 1;
                    matchingCount += 1;
                });

                updateButton(matchingCount);

                if (!expanded) {
                    setTimeout(() => {
                        const section = document.getElementById('projects');
                        if (section) {
                            const header = section.querySelector('.section-header');
                            if (header) {
                                header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }
                    }, 350);
                }
            });
        }

        renderProjects();
    },

    /* ==========================================================================
       11. PROFESSIONAL BADGES SECTION
       ========================================================================== */
    initProfessionalBadges: function () {
        const badgeCards = Array.from(document.querySelectorAll(".badge-card"));
        const filterButtons = Array.from(document.querySelectorAll("[data-badge-filter]"));
        const badgeCounter = document.getElementById("badge-count");

        if (!badgeCards.length) return;

        if (badgeCounter) {
            badgeCounter.textContent = badgeCards.length;
        }

        filterButtons.forEach(button => {
            button.setAttribute("aria-pressed", String(button.classList.contains("active")));
        });

        const revealCard = (card, index = 0) => {
            card.style.animationDelay = `${index * 70}ms`;
            card.classList.add("loaded", "show-badge");
        };

        if ("IntersectionObserver" in window) {
            const badgeObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    const visibleIndex = badgeCards
                        .filter(card => !card.classList.contains("is-hidden"))
                        .indexOf(entry.target);

                    revealCard(entry.target, Math.max(visibleIndex, 0));
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.18 });

            badgeCards.forEach(card => badgeObserver.observe(card));
        } else {
            badgeCards.forEach(revealCard);
        }

        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                const activeFilter = button.dataset.badgeFilter;
                let visibleIndex = 0;

                filterButtons.forEach(filterButton => {
                    const isActive = filterButton === button;
                    filterButton.classList.toggle("active", isActive);
                    filterButton.setAttribute("aria-pressed", String(isActive));
                });

                badgeCards.forEach(card => {
                    const isVisible = activeFilter === "all" || card.dataset.badgeCategory === activeFilter;
                    card.classList.toggle("is-hidden", !isVisible);

                    if (isVisible) {
                        revealCard(card, visibleIndex);
                        visibleIndex += 1;
                    }
                });
            });
        });

        const allSpotlightCards = document.querySelectorAll(".badge-card, .project-card, .cert-card");
        allSpotlightCards.forEach(card => {
            card.addEventListener("pointermove", event => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
                card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
            });

            card.addEventListener("pointerleave", () => {
                card.style.setProperty("--mouse-x", "50%");
                card.style.setProperty("--mouse-y", "0%");
            });
        });

        if (PortfolioConfig.debug) {
            console.log("%c Professional Badges Ready ", "background:#4f46e5;color:#ffffff;padding:6px 12px;border-radius:8px;");
        }
    },

    /* ==========================================================================
       12. CERTIFICATION & MODAL GALLERY
       ========================================================================== */
    initCharacterEffects: function () {
        const chars = document.querySelectorAll('.char');
        chars.forEach((char, i) => {
            char.style.transitionDelay = `${i * 0.05}s`;
        });
    },

    /* ==========================================================================
       13. ADVANCED CONTACT FORM & EMAILJS INTEGRATION
       ========================================================================== */
    initFormHandlers: function () {
        const form = document.getElementById('contactForm');
        if (!form) return;

        if (typeof emailjs === 'undefined') {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showNotification('Email service unavailable. Please email me directly.', 'error');
            });
            return;
        }

        emailjs.init(PortfolioConfig.emailJsKey);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.innerHTML;

            // Simple Validation
            if (!form.checkValidity()) return;

            try {
                this.toggleBtnState(btn, true);

                const templateParams = {
                    name: form.name.value,     // Matches {{name}} in your template
                    email: form.email.value,   // Matches {{email}} in your 'Reply To' field
                    subject: form.subject.value, // Used if you change {{title}} to {{subject}}
                    message: form.message.value // Matches {{message}} in your template
                };

                await emailjs.send(
                    PortfolioConfig.emailJsService,
                    PortfolioConfig.emailJsTemplate,
                    templateParams
                );

                this.showNotification('Success! Message sent.', 'success');
                form.reset();
            } catch (error) {
                console.error('EmailJS Error:', error);
                this.showNotification('Error! Please try again.', 'error');
            } finally {
                this.toggleBtnState(btn, false, originalText);
            }
        });
    },

    toggleBtnState: function (btn, isLoading, text = '') {
        btn.disabled = isLoading;
        if (isLoading) {
            btn.innerHTML = '<span>Sending...</span> <i class="bx bx-loader-alt bx-spin"></i>';
        } else {
            btn.innerHTML = text;
        }
    },

    showNotification: function (msg, type) {
        const toast = document.getElementById('toast');
        const messageEl = toast.querySelector('.toast-message');
        const iconEl = toast.querySelector('.toast-icon i');

        messageEl.textContent = msg;
        iconEl.className = type === 'success' ? 'bx bx-check-circle' : 'bx bx-error-circle';
        iconEl.style.color = type === 'success' ? '#10b981' : '#ef4444';

        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    },

    /* ==========================================================================
       14. SCROLL UTILITIES & PROGRESS INDICATORS
       ========================================================================== */
    initScrollEngine: function () {
        const scrollTopBtn = document.getElementById('scrollTop');

        // Scroll Progress Bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        progressBar.style.cssText = `
            position: fixed; top: 0; left: 0; height: 4px; 
            background: var(--gradient-primary); z-index: 9999; transition: width 0.1s;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            // Update Progress Bar
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";

            // Show/Hide Top Button
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    /* ==========================================================================
       15. ACCESSIBILITY & HELPERS
    ========================================================================== */
    initShowMoreToggle: function () {
        const toggleStates = {
            certifications: false
        };

        const showMoreButtons = document.querySelectorAll('.show-more-btn[data-section="certifications"]');

        showMoreButtons.forEach(btn => {
            const section = btn.getAttribute('data-section');
            const container = btn.closest('.cert-grid');
            if (!container || !section) return;

            const items = container.querySelectorAll('.show-more-item');
            const itemsArray = Array.from(items);

            itemsArray.forEach((item, index) => {
                if (index >= 3) {
                    item.classList.add('hidden');
                }
            });

            if (items.length <= 3) {
                btn.style.display = 'none';
                return;
            }

            btn.addEventListener('click', () => {
                toggleStates[section] = !toggleStates[section];

                const btnText = btn.querySelector('.btn-text');
                const icon = btn.querySelector('.bx-chevron-down');

                if (toggleStates[section]) {
                    btnText.textContent = 'Show Less';
                    btn.classList.add('expanded');

                    itemsArray.forEach((item, index) => {
                        if (index >= 3) {
                            item.classList.remove('hidden');
                            item.classList.add('expanding');
                            setTimeout(() => {
                                item.classList.remove('expanding');
                            }, 400);
                        }
                    });
                } else {
                    btnText.textContent = 'Show More';
                    btn.classList.remove('expanded');

                    itemsArray.forEach((item, index) => {
                        if (index >= 3) {
                            item.classList.add('collapsing');
                            setTimeout(() => {
                                item.classList.remove('collapsing');
                                item.classList.add('hidden');
                            }, 300);
                        }
                    });

                    setTimeout(() => {
                        const sectionEl = document.getElementById(section);
                        if (sectionEl) {
                            const header = sectionEl.querySelector('.section-header');
                            if (header) {
                                header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }
                    }, 350);
                }
            });
        });
    },

    initAccessibility: function () {
        // Handle Tab focusing for accessibility
        document.body.addEventListener('mousedown', () => {
            document.body.classList.add('using-mouse');
        });
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') document.body.classList.remove('using-mouse');
        });

        // Skill Icons Tooltip Logic
        const skillIcons = document.querySelectorAll('.icon-item');
        skillIcons.forEach(icon => {
            const label = icon.getAttribute('data-tooltip');
            icon.setAttribute('aria-label', label);
        });
    }
};

/* ==========================================================================
   16. ADDITIONAL LOGIC FOR CODE VOLUME & HELPERS
   ========================================================================== */



/**
 * Timeline Logic Extension
 * Ensures timeline cards animate sequentially.
 */
function sequenceTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
}
sequenceTimeline();

/**
 * Footer Year Auto-update
 * Dynamically updates the copyright year in the footer.
 */
const updateFooter = () => {
    const yearEl = document.querySelector('.footer-bottom p');
    if (yearEl) {
        const currentYear = new Date().getFullYear();
        yearEl.innerHTML = `&copy; ${currentYear} Mihir Bhayani. All rights reserved.`;
    }
};
updateFooter();

/**
 * Image Lazy Loading Enhancement
 * Improves performance by only loading images when they enter the viewport.
 */
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const config = { rootMargin: '0px 0px 50px 0px', threshold: 0.01 };

    let observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                self.unobserve(img);
            }
        });
    }, config);

    images.forEach(image => observer.observe(image));
};
lazyLoadImages();

/**
 * Social Interaction Logging
 * (For development/tracking purposes)
 */
function logInteraction(platform) {
    if (!PortfolioConfig.debug) return;
    console.debug(`[Interaction]: User navigated to ${platform}`);
}

document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', () => {
        const platform = link.getAttribute('data-tooltip');
        logInteraction(platform);
    });
});

/**
 * Window Resize Handler
 * Manages UI layout shifts during orientation changes.
 */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const navbar = document.querySelector('.navbar');
        if (window.innerWidth > 768) {
            navbar.classList.remove('active');
            document.querySelector('.mobile-menu-btn').classList.remove('active');
        }
    }, 250);
});

/**
 * Performance Monitoring
 * Simple check for animation frame drops.
 */
let lastUpdate = performance.now();
function checkPerformance() {
    const now = performance.now();
    const diff = now - lastUpdate;
    if (PortfolioConfig.debug && diff > 100) {
        console.warn(`[Performance]: Detected frame drop of ${diff.toFixed(2)}ms`);
    }
    lastUpdate = now;
    requestAnimationFrame(checkPerformance);
}
if (PortfolioConfig.debug) {
    requestAnimationFrame(checkPerformance);
}

// Degree Modal Functions
function openDegreeModal(imageSrc) {
    const modal = document.getElementById('degreeModal');
    const modalImg = document.getElementById('modalImage');
    const modalContent = modal.querySelector('.degree-modal-content');

    if (modal && modalImg) {
        if (imageSrc.toLowerCase().endsWith('.pdf')) {
            modalImg.style.display = 'none';
            if (!document.getElementById('pdfViewer')) {
                const iframe = document.createElement('iframe');
                iframe.id = 'pdfViewer';
                iframe.style.cssText = 'width:100%;height:80vh;border:none;';
                modalContent.insertBefore(iframe, modalImg);
            }
            const pdfViewer = document.getElementById('pdfViewer');
            pdfViewer.style.display = 'block';
            pdfViewer.src = imageSrc;
        } else {
            modalImg.style.display = 'block';
            const pdfViewer = document.getElementById('pdfViewer');
            if (pdfViewer) pdfViewer.style.display = 'none';
            modalImg.src = imageSrc;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeDegreeModal() {
    const modal = document.getElementById('degreeModal');
    const modalImg = document.getElementById('modalImage');
    const pdfViewer = document.getElementById('pdfViewer');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (modalImg) modalImg.style.display = 'block';
        if (pdfViewer) {
            pdfViewer.style.display = 'none';
            pdfViewer.src = '';
        }
    }
}

// Close modal on outside click
document.addEventListener('click', function (e) {
    const modal = document.getElementById('degreeModal');
    if (modal && e.target === modal) {
        closeDegreeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeDegreeModal();
    }
});
