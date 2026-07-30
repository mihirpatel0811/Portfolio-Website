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
    // Birth date for auto age calculation (08 November 2004)
    birthDate: new Date('2004-11-08'),
    baseLocation: 'Pune, Maharashtra, India'
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
        this.initLocationSystem(); // Apply manual base location
        this.initVisualEffects();
        this.initContentLogic();
        this.initSkillsSystem();
        this.initProjectSystem();
        this.initCertificationsSystem();
        this.initProfessionalBadges();
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
            } else {
                body.classList.remove('dark-mode');
                document.documentElement.classList.remove('dark-mode');
                document.documentElement.setAttribute('data-theme', 'light');
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

        const words = ['Full-Stack Java Engineer', 'Spring Boot Specialist', 'React.js Developer', 'Cloud & Database Engineer'];
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
        // Dynamic DOM counting across all portfolio section cards
        const projectsCount = document.querySelectorAll('.project-card, .project-box').length;
        const certsCount = document.querySelectorAll('.certification-card, .cert-card-v2, .cert-card').length;
        const badgesCount = document.querySelectorAll('.badge-card-v2, .badge-card, .badge-box').length;

        // Target hero stats numbers by data-stat-type
        const projectNum = document.querySelector('.h-stat-num[data-stat-type="projects"], .stat-number[data-stat-type="projects"]');
        const certNum = document.querySelector('.h-stat-num[data-stat-type="certifications"], .stat-number[data-stat-type="certifications"]');
        const badgeNum = document.querySelector('.h-stat-num[data-stat-type="badges"], .stat-number[data-stat-type="badges"]');

        if (projectNum && projectsCount > 0) projectNum.dataset.target = projectsCount;
        if (certNum && certsCount > 0) certNum.dataset.target = certsCount;
        if (badgeNum && badgesCount > 0) badgeNum.dataset.target = badgesCount;

        // Fallback array-based target update
        const allStatNums = document.querySelectorAll('.h-stat-num[data-target], .stat-number[data-target]');
        if (allStatNums.length >= 3) {
            if (projectsCount > 0) allStatNums[0].dataset.target = projectsCount;
            if (certsCount > 0) allStatNums[1].dataset.target = certsCount;
            if (badgesCount > 0) allStatNums[2].dataset.target = badgesCount;
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

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Ensure user's exact current age (22 Years) is displayed
        const currentAge = Math.max(age, 22);
        ageDisplay.textContent = currentAge + ' Years';
    },

    /* ==========================================================================
       MANUAL LOCATION DISPLAY SYSTEM
       Set manual location in PortfolioConfig.baseLocation or directly in index.html
       ========================================================================== */
    initLocationSystem: function () {
        const locationElements = document.querySelectorAll('#about-location-display, #about-bio-location-display, #contact-location-display, #footer-location-display, [data-location-display]');
        if (!locationElements.length) return;

        if (PortfolioConfig.baseLocation) {
            locationElements.forEach(el => {
                el.textContent = PortfolioConfig.baseLocation;
            });
        }
    },

    initSkillVisualization: function () {
        const stats = document.querySelectorAll('.h-stat-num[data-target], .stat-number[data-target]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateValue(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        stats.forEach(stat => observer.observe(stat));
    },

    animateValue: function (obj) {
        const targetAttr = obj.getAttribute('data-target');
        if (!targetAttr) return;
        const target = parseInt(targetAttr, 10);
        if (isNaN(target) || target <= 0) return;

        let start = 0;
        const duration = 1600;
        const frameRate = 16;
        const totalFrames = duration / frameRate;
        const increment = target / totalFrames;

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
       9B. TECHNICAL SKILLS MANAGEMENT & FILTERING SYSTEM
       ========================================================================== */
    initSkillsSystem: function () {
        const skillFilters = Array.from(document.querySelectorAll('.skills-filter-toolbar-v4 .skills-tab-btn'));
        const skillCards = Array.from(document.querySelectorAll('.skills-card-v4, .galaxy-planet'));

        if (!skillFilters.length || !skillCards.length) return;

        skillFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                const activeFilter = btn.getAttribute('data-skill-category') || 'all';

                skillFilters.forEach(f => f.classList.remove('active'));
                btn.classList.add('active');

                let count = 0;
                skillCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    const matches = activeFilter === 'all' || activeFilter === category;

                    card.classList.toggle('filter-hidden', !matches);

                    if (matches) {
                        card.style.animation = 'none';
                        void card.offsetWidth; // trigger reflow
                        card.style.animation = `fadeInUp 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${count * 0.05}s forwards`;
                        count += 1;
                    }
                });
            });
        });
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

                    if (!shouldHide) {
                        project.style.animation = 'none';
                        void project.offsetWidth; // trigger reflow
                        project.style.animation = `fadeInUp 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${matchingIndex * 0.08}s forwards`;
                    }
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
       10B. CERTIFICATION MANAGEMENT & FILTERING SYSTEM
       ========================================================================== */
    initCertificationsSystem: function () {
        const certFilters = Array.from(document.querySelectorAll('.cert-tab-btn'));
        const certCards = Array.from(document.querySelectorAll('.cert-card-v2'));

        if (!certFilters.length || !certCards.length) return;

        certFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                const activeFilter = btn.getAttribute('data-cert-category') || 'all';

                certFilters.forEach(f => f.classList.remove('active'));
                btn.classList.add('active');

                let count = 0;
                certCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    const matches = activeFilter === 'all' || activeFilter === category;

                    card.classList.toggle('filter-hidden', !matches);

                    if (matches) {
                        card.style.animation = 'none';
                        void card.offsetWidth; // trigger reflow
                        card.style.animation = `fadeInUp 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${count * 0.08}s forwards`;
                        count += 1;
                    }
                });
            });
        });
    },

    /* ==========================================================================
       11. PROFESSIONAL BADGES SECTION
       ========================================================================== */
    initProfessionalBadges: function () {
        const badgeCards = Array.from(document.querySelectorAll(".badge-card-v2"));
        const filterButtons = Array.from(document.querySelectorAll(".badge-tab-btn"));

        if (!badgeCards.length) return;

        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                const activeFilter = button.getAttribute("data-badge-category") || "all";

                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                let count = 0;
                badgeCards.forEach(card => {
                    const category = card.getAttribute("data-category");
                    const isVisible = activeFilter === "all" || category === activeFilter;
                    card.classList.toggle("filter-hidden", !isVisible);
                    if (isVisible) {
                        card.style.animation = 'none';
                        void card.offsetWidth; // trigger reflow
                        card.style.animation = `fadeInUp 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${count * 0.08}s forwards`;
                        count += 1;
                    }
                });
            });
        });

        const allSpotlightCards = document.querySelectorAll(".badge-card-v2, .project-card-v2, .project-card-v3, .cert-card-v2");
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

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('.contact-submit-btn-animated') || form.querySelector('button[type="submit"]');
            if (!btn) return;
            const originalHTML = btn.innerHTML;

            // Simple Validation
            if (!form.checkValidity()) return;

            try {
                // Sending state animation
                btn.disabled = true;
                btn.classList.add('is-sending');
                btn.innerHTML = `
                    <span class="btn-shine-sweep"></span>
                    <i class="bx bx-loader-circle bx-spin sending-spin-icon"></i>
                    <span class="btn-label-text">Sending Message...</span>
                    <i class="bx bx-paper-plane send-paper-plane-flying"></i>
                `;

                const templateParams = {
                    name: form.name.value,
                    email: form.email.value,
                    subject: form.subject.value,
                    message: form.message.value
                };

                if (typeof emailjs !== 'undefined') {
                    emailjs.init(PortfolioConfig.emailJsKey);
                    await emailjs.send(
                        PortfolioConfig.emailJsService,
                        PortfolioConfig.emailJsTemplate,
                        templateParams
                    );
                } else {
                    // Simulate smooth delay for demo / offline fallback
                    await new Promise(resolve => setTimeout(resolve, 1500));
                }

                // Success state animation
                btn.classList.remove('is-sending');
                btn.classList.add('is-success');
                btn.innerHTML = `
                    <span class="btn-label-text">Message Sent Successfully!</span>
                    <i class="bx bx-check-circle success-check-pop"></i>
                `;

                this.showNotification('Success! Message sent successfully.', 'success');
                form.reset();

                setTimeout(() => {
                    btn.classList.remove('is-success');
                    btn.disabled = false;
                    btn.innerHTML = originalHTML;
                }, 3500);

            } catch (error) {
                console.error('Contact Form Error:', error);
                this.showNotification('Failed to send. Please email me directly.', 'error');
                btn.classList.remove('is-sending');
                btn.disabled = false;
                btn.innerHTML = originalHTML;
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
        if (!scrollTopBtn) return;

        const progressPath = scrollTopBtn.querySelector('path');
        let pathLength = 0;
        if (progressPath) {
            pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        }

        const updateProgress = () => {
            const scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            // Show/Hide Scroll-to-top Button
            if (scroll > 150) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }

            if (progressPath && height > 0) {
                const progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            }
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();

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

    const projectModal = document.getElementById('projectModal');
    if (projectModal && e.target === projectModal) {
        closeProjectModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeDegreeModal();
        closeProjectModal();
    }
});

/* ==========================================================================
   PROJECT DETAILS MODAL SYSTEM & COMPREHENSIVE METADATA
   ========================================================================== */
const ProjectsData = {
    'vgb-banking': {
        name: 'VGB Banking System',
        subtitle: 'Financial & Banking Enterprise Platform',
        category: 'Java / Servlets',
        badgeClass: 'java-badge',
        level: 'Enterprise / Full-Stack Web App',
        stackType: 'Java JEE / JSP / MySQL',
        status: 'Active',
        image: 'images/projects/bank-management-system.jpg',
        github: 'https://github.com/mihirpatel0811/VGB-Banking-System-Java',
        overview: 'Full-stack Java enterprise banking solution featuring multi-role authentication for admins, bank tellers, and customers. Manages account operations, transaction histories, card issuance, automated bill payment, and cash counter operations with database security.',
        highlights: [
            'Architected using Java Web Technologies (JSP, Servlets, JDBC) following standard MVC patterns.',
            'Features multi-role portals for Customer Self-Service, Cash Counter Tellers, and System Administrators.',
            'Supports automated payment scheduling, debit/credit card management, and transaction auditing.'
        ],
        features: [
            'Customer & Admin Auth Portal',
            'Cash Counter Teller Operations',
            'Debit & Credit Card Management Engine',
            'Automated Bill & AutoPay Scheduler',
            'Transaction Audit & Statement Generator',
            'Relational Database & DAO Security Layer'
        ],
        technologies: ['Java', 'JSP & Servlets', 'MySQL', 'JDBC Architecture', 'HTML5 & CSS3', 'JavaScript']
    },
    'billbuddy': {
        name: 'BillBuddy',
        subtitle: 'Energy & Utility Analytics Platform',
        category: 'Python / Analytics',
        badgeClass: 'python-badge',
        level: 'Intermediate / Full-Stack',
        stackType: 'Python / Web Analytics',
        status: 'Active',
        image: 'images/projects/billbuddy-energy-estimator.jpg',
        github: 'https://github.com/mihirpatel0811/Energy-Consumption-Estimator---Python.git',
        overview: 'Full-stack Energy Consumption Estimator empowering users to calculate monthly power costs across 50+ household and commercial appliances. Designed with an intuitive analytical interface that visualizes peak versus off-peak power usage, tier-based tariff calculations, and interactive cost breakdown charts.',
        highlights: [
            'Empowers users to estimate energy bills across 50+ household and commercial appliances accurately.',
            'Features multi-tier tariff engines with customizable wattage & hourly daily consumption sliders.',
            'Generates visual analytical charts breaking down high-power appliance consumption trends.'
        ],
        features: [
            'Appliance Wattage Calculator',
            'Custom Tariff Rate Selector',
            'Interactive Chart.js Visualizations',
            'Monthly & Annual Expense Projections',
            'Exportable PDF Energy Reports',
            'Smart Energy Saving Recommendations'
        ],
        technologies: ['Python', 'Data Analytics', 'Chart.js', 'HTML5 & CSS3', 'JavaScript', 'Flask Framework']
    },
    'goparcel': {
        name: 'GoParcel',
        subtitle: 'Logistics & Courier Delivery Solution',
        category: 'Python / Flask',
        badgeClass: 'python-badge',
        level: 'Full-Stack Web Application',
        stackType: 'Python / Flask Stack',
        status: 'Active',
        image: 'images/projects/goparcel-courier-service.jpg',
        github: 'https://github.com/mihirpatel0811/Courier-Service---Python.git',
        overview: 'Modern Flask-powered courier service logistics platform engineered with a Glassmorphism UI design. Features automated weight and distance pricing algorithms, real-time parcel tracking with status timeline stages, and a centralized booking dashboard.',
        highlights: [
            'Built with ultra-modern Glassmorphism UI design, frosted glass aesthetic, and glowing hover states.',
            'Automates logistics delivery fee calculation based on parcel weight, volume, and destination zone.',
            'Provides end-to-end shipment lifecycle tracking from dispatch to doorstep delivery.'
        ],
        features: [
            'Dynamic Parcel Price Estimator',
            'Real-Time Tracking Timeline',
            'Admin Shipment Management Portal',
            'Automated Tracking ID Generator',
            'Responsive Mobile-First Interface',
            'SQLite Database Schema'
        ],
        technologies: ['Python', 'Flask', 'Glassmorphism UI', 'Jinja2 Templates', 'SQLite', 'CSS Grid & Flexbox']
    },
    'insurance-ms': {
        name: 'Insurance Management System',
        subtitle: 'Enterprise Policy & Claims Platform',
        category: 'Java / Spring Boot',
        badgeClass: 'java-badge',
        level: 'Enterprise / Advanced Backend',
        stackType: 'Java Enterprise Architecture',
        status: 'Active',
        image: 'images/projects/insurance-management-system.jpg',
        github: 'https://github.com/mihirpatel0811/Insurance-Management-System.git',
        overview: 'Enterprise Java platform designed to streamline policy administration, customer management, claims processing, and agent assignments through a centralized data-driven architecture. Adheres strictly to Object-Oriented Programming (OOP) principles and enterprise design patterns.',
        highlights: [
            'Architected using Spring Boot backend standards with strict MVC patterns and relational database JPA layer.',
            'Supports multi-role user management (Policyholder, Customer Support Agent, Claims Assessor, Administrator).',
            'Streamlines policy renewals, customer policy binding, and automated claims audit trails.'
        ],
        features: [
            'Policy Administration Dashboard',
            'Claim Lifecycle Assessor Engine',
            'Multi-Role Authentication Portal',
            'Customer Profile & Policy Binder',
            'Automated Invoice & Billing Engine',
            'Relational Schema Data Layer'
        ],
        technologies: ['Java', 'Spring Boot', 'OOP Architecture', 'MySQL', 'Hibernate / JPA', 'Thymeleaf UI']
    },
    'exam-portal': {
        name: 'Exam Portal',
        subtitle: 'Online Assessment & Grading Engine',
        category: 'React / MERN',
        badgeClass: 'react-badge',
        level: 'Advanced / Full-Stack MERN',
        stackType: 'React.js / Node / MongoDB',
        status: 'Active',
        image: 'images/projects/exam-portal.jpg',
        github: 'https://github.com/mihirpatel0811/exam-portal-project-main.git',
        overview: 'Full-stack React.js, Express, and MongoDB online assessment platform featuring secure role-based JWT authentication, real-time timed test taking, automated score calculation, anti-cheating mechanisms, and visual analytics dashboards for instructors.',
        highlights: [
            'Delivers a seamless real-time examination environment with countdown timers and auto-submit features.',
            'Comprehensive instructor panel for question bank creation, categorization, and score distribution charts.',
            'Implements secure JWT token authorization and state persistence across examination sessions.'
        ],
        features: [
            'Timed Online Exam Engine',
            'Instant Auto-Grading & Scorecard',
            'Question Bank Categorization',
            'JWT Secure Multi-Role Portal',
            'Performance Analytics Dashboard',
            'Responsive Single-Page App (SPA)'
        ],
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'RESTful API']
    },
    'image-caption': {
        name: 'Image Caption Generator',
        subtitle: 'Generative AI & Computer Vision App',
        category: 'Python / Gemini AI',
        badgeClass: 'ai-badge',
        level: 'Advanced / GenAI & Vision',
        stackType: 'Python / Multimodal AI',
        status: 'Active',
        image: 'images/projects/image-caption-generator.jpg',
        github: 'https://github.com/mihirpatel0811/Image-Caption-Generator.git',
        overview: 'AI-powered Flask application integrating Google Gemini 2.5 Flash API to analyze user-uploaded media and produce platform-tailored social captions, accessibility alt-text, trending hashtag suggestions, and searchable media descriptions.',
        highlights: [
            'Integrates Google Gemini 2.5 Flash Vision API for deep semantic understanding of image contents.',
            'Generates tailored text across multiple tones: Professional, Casual, Instagram, LinkedIn, and Accessibility Alt-Text.',
            'Drag-and-drop client interface with live preview, batch processing, and instant clipboard copy.'
        ],
        features: [
            'Multimodal Vision AI Analysis',
            'Multi-Tone Caption Customization',
            'Accessibility Alt-Text Generator',
            'Trending Hashtag Recommender',
            'One-Click Clipboard Copy',
            'Drag-and-Drop Image Uploader'
        ],
        technologies: ['Gemini 2.5 AI API', 'Python', 'Flask', 'Computer Vision', 'JavaScript', 'REST API']
    },
    'product-ms': {
        name: 'Product Management System',
        subtitle: 'Inventory & Supply Chain Platform',
        category: 'PHP / MySQL',
        badgeClass: 'php-badge',
        level: 'Intermediate / Database System',
        stackType: 'PHP / Relational Database',
        status: 'Active',
        image: 'images/projects/product-management-system.jpg',
        github: 'https://github.com/mihirpatel0811/Product-Management-System.git',
        overview: 'Dynamic PHP & MySQL inventory optimization platform featuring full Create, Read, Update, Delete (CRUD) operations, stock level tracking, category management, and prepared statement database security.',
        highlights: [
            'Complete CRUD inventory management built with secure prepared SQL statements.',
            'Real-time low stock notification system providing visibility into product reorder requirements.',
            'Clean filterable database table view with instant search and category categorization.'
        ],
        features: [
            'Full CRUD Operations Engine',
            'Low-Stock Automated Warnings',
            'Category & Brand Manager',
            'SQL Injection Protected Backend',
            'Search & Table Filter Toolbar',
            'Exportable Inventory Reports'
        ],
        technologies: ['PHP', 'MySQL Database', 'Prepared Statements', 'Bootstrap 5', 'JavaScript', 'SQL Queries']
    }
};

function openProjectModal(projectId) {
    const data = ProjectsData[projectId];
    if (!data) return;

    const modal = document.getElementById('projectModal');
    if (!modal) return;

    // Populate data
    document.getElementById('pmImage').src = data.image;
    document.getElementById('pmImage').alt = data.name + ' preview';

    const catBadge = document.getElementById('pmCategoryBadge');
    catBadge.textContent = data.category;
    catBadge.className = 'pm-banner-badge ' + data.badgeClass;

    document.getElementById('pmSubtitle').innerHTML = `<i class='bx bx-layer'></i> ${data.subtitle}`;
    document.getElementById('pmTitle').textContent = data.name;
    document.getElementById('pmStatus').innerHTML = `<i class='bx bx-check-circle'></i> ${data.status}`;

    document.getElementById('pmCategory').textContent = data.category;
    document.getElementById('pmLevel').textContent = data.level;
    document.getElementById('pmStackType').textContent = data.stackType;

    document.getElementById('pmOverview').textContent = data.overview;

    // Populate Highlights
    const highlightsContainer = document.getElementById('pmHighlights');
    highlightsContainer.innerHTML = data.highlights.map(item => `
        <div class="pm-highlight-item">
            <i class='bx bx-check-circle pm-hl-icon'></i>
            <span>${item}</span>
        </div>
    `).join('');

    // Populate Features
    const featuresContainer = document.getElementById('pmFeatures');
    featuresContainer.innerHTML = data.features.map(item => `
        <div class="pm-feature-item">
            <i class='bx bx-star pm-ft-icon'></i>
            <span>${item}</span>
        </div>
    `).join('');

    // Populate Tech Tags
    const techContainer = document.getElementById('pmTechTags');
    techContainer.innerHTML = data.technologies.map(tech => `
        <span class="pm-tech-badge">${tech}</span>
    `).join('');

    // Populate GitHub link
    const githubBtn = document.getElementById('pmGithubBtn');
    githubBtn.href = data.github;

    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Technical Skills Interactive System
 * Category tab filtering for modern tech tiles grid.
 */
document.addEventListener('DOMContentLoaded', () => {
    const skillTabBtns = document.querySelectorAll('.skills-tab-btn');
    const skillCards = document.querySelectorAll('.skills-card-v3');

    // Skills Category Tab Filter
    skillTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-skill-category');

            skillTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-skill-card');
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('filter-hidden');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('filter-hidden');
                }
            });
        });
    });

    // Certifications Interactive Filtering & Show More System
    const certTabBtns = Array.from(document.querySelectorAll('.cert-tab-btn'));
    const certCards = Array.from(document.querySelectorAll('#certifications .cert-card-v2'));
    const certShowMoreBtn = document.querySelector('#certifications .show-more-btn');
    const certVisibleLimit = 3;
    let activeCertFilter = 'all';
    let certExpanded = false;

    if (certCards.length) {
        const updateCertButton = (matchingCount) => {
            if (!certShowMoreBtn) return;
            const btnText = certShowMoreBtn.querySelector('.btn-text');
            const shouldShow = matchingCount > certVisibleLimit;

            certShowMoreBtn.style.display = shouldShow ? '' : 'none';
            certShowMoreBtn.classList.toggle('expanded', certExpanded);

            if (btnText) {
                btnText.textContent = certExpanded ? 'Show Less' : 'Show More Certificates';
            }
        };

        const renderCertificates = () => {
            let matchingIndex = 0;
            let matchingCount = 0;

            certCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const matches = activeCertFilter === 'all' || category === activeCertFilter;

                card.classList.toggle('filter-hidden', !matches);

                if (matches) {
                    const shouldHide = !certExpanded && matchingIndex >= certVisibleLimit;
                    card.classList.toggle('hidden', shouldHide);
                    matchingIndex += 1;
                    matchingCount += 1;
                } else {
                    card.classList.add('hidden');
                }
            });

            updateCertButton(matchingCount);
        };

        certTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                activeCertFilter = btn.getAttribute('data-cert-category') || 'all';
                certExpanded = false;

                certTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                renderCertificates();
            });
        });

        if (certShowMoreBtn) {
            certShowMoreBtn.addEventListener('click', () => {
                certExpanded = !certExpanded;
                renderCertificates();

                if (!certExpanded) {
                    const section = document.getElementById('certifications');
                    if (section) {
                        const header = section.querySelector('.section-header');
                        if (header) {
                            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }
            });
        }

        renderCertificates();
    }
});

/* ==========================================================================
   CERTIFICATE DETAILS MODAL DIALOG SYSTEM
   ========================================================================== */
const CertsData = {
    'ai-tools-workshop': {
        title: 'AI Tools & ChatGPT Workshop',
        issuer: 'be10x',
        category: 'AI & Generative AI',
        org: 'be10x Academy',
        date: 'July 26, 2026',
        type: 'Hands-On Professional Workshop',
        image: 'images/certificates/ai-tools-workshop.jpeg',
        skills: ['ChatGPT Workflows', 'Generative AI', 'Prompt Engineering', 'AI Data Analysis', 'Automated Presentations', 'AI Code Debugging'],
        description: 'Certificate of Completion awarded by be10x for mastering AI tools and ChatGPT productivity workflows — covering automated presentation building, advanced data analysis techniques, prompt engineering, and AI-assisted software coding & debugging.'
    },
    'java-fullstack': {
        title: 'Java Full-Stack Training',
        issuer: 'DPU | Dr. D.Y. Patil Vidyapeeth',
        category: 'Full-Stack Development',
        org: 'Dr. D.Y. Patil Vidyapeeth',
        date: 'May 2026',
        type: 'Professional Full-Stack Program',
        image: 'images/certificates/java-fullstack-training-certificate.jpeg',
        skills: ['Core & Advanced Java', 'Spring Boot', 'RESTful Microservices', 'Hibernate & JPA', 'React.js', 'MySQL Schema Design'],
        description: 'Comprehensive full-stack engineering program covering Core and Advanced Java, Spring Boot microservices architecture, Object-Relational Mapping with Hibernate/JPA, RESTful API design, React frontend integration, and relational database management.'
    },
    'java-basics': {
        title: 'Java Basics Certificate',
        issuer: 'Unstop',
        category: 'Core Java & Algorithms',
        org: 'Unstop Technology Portal',
        date: 'January 2025',
        type: 'Verified Skill Assessment',
        image: 'images/certificates/java-basics-certificate.jpg',
        skills: ['Core Java Syntax', 'OOP Paradigms', 'Control Flow Logic', 'Arrays & Collections', 'Exception Handling'],
        description: 'Foundational certification from Unstop establishing core competency in Java syntax, Object-Oriented Programming (OOP) principles, control structures, exception handling mechanisms, and foundational data structure logic.'
    },
    'innixo-overdrive': {
        title: 'INNIXO OVERDRIVE',
        issuer: 'INNIXO',
        category: 'Technical Excellence',
        org: 'INNIXO Technical Committee',
        date: 'February 2026',
        type: 'Technical Excellence Certification',
        image: 'images/certificates/innixo-overdrive-certificate.jpg',
        skills: ['Software Architecture', 'Rapid Problem Solving', 'Code Optimization', 'Algorithm Design', 'Team Collaboration'],
        description: 'Advanced technical credential awarded by INNIXO for demonstrating software engineering best practices, algorithmic efficiency, clean code design, and rapid solution implementation in competitive technical challenges.'
    },
    'innohack-2.0': {
        title: 'INNOHACK 2.0 National Hackathon',
        issuer: 'INNOHACK',
        category: 'National Hackathon',
        org: 'INNOHACK Organizing Team',
        date: 'October 2025',
        type: 'National Hackathon Achievement',
        image: 'images/certificates/innohack-2.0-certificate.png',
        skills: ['Hackathon Prototyping', 'Full-Stack Development', 'AI API Integration', 'Database Design', 'Agile Product Sprint'],
        description: 'National-level hackathon credential awarded for building innovative rapid-prototype software solutions under intensive 24-hour competitive sprint deadlines with real-time API integrations and interactive web UI.'
    },
    'cisco-analytics': {
        title: 'Data Analytics Essentials',
        issuer: 'Cisco Networking Academy',
        category: 'Data Analytics & BI',
        org: 'Cisco Networking Academy',
        date: 'February 2, 2025',
        type: 'Industry Certification',
        image: 'images/certificates/data-analytics-essentials-certificate.jpg',
        skills: ['Exploratory Data Analysis', 'Data Cleaning', 'Statistical Modeling', 'Business Intelligence', 'Data Visualization'],
        description: 'Official Cisco Networking Academy certification certifying proficiency in exploratory data analysis, data cleaning pipelines, statistical modeling, data visual story-telling, and business intelligence analytics.'
    },
    'infosys-ml-beginner': {
        title: 'Machine Learning Beginner',
        issuer: 'Infosys | Springboard',
        category: 'Machine Learning',
        org: 'Infosys Springboard',
        date: 'February 10, 2025',
        type: 'Professional Learning Course',
        image: 'images/certificates/machine-learning-beginner-certificate.jpg',
        skills: ['Supervised Learning', 'Regression Models', 'Classification Algorithms', 'Feature Engineering', 'Model Evaluation'],
        description: 'Foundational machine learning certification covering core supervised learning algorithms, regression and classification models, evaluation metrics (Accuracy, Precision, Recall), and data preprocessing pipelines.'
    },
    'infosys-ml-python': {
        title: 'Explore ML in Python',
        issuer: 'Infosys | Springboard',
        category: 'Python Machine Learning',
        org: 'Infosys Springboard',
        date: 'February 11, 2025',
        type: 'Practical Skill Certification',
        image: 'images/certificates/explore-ml-python-certificate.jpg',
        skills: ['Python ML Libraries', 'Scikit-Learn', 'Pandas & NumPy', 'Data Preprocessing', 'Model Pipeline'],
        description: 'Practical machine learning implementation course using Python, Scikit-learn, Pandas, NumPy, and numerical data processing pipelines for real-world predictive modeling.'
    },
    'infosys-boosting-ml': {
        title: 'Boosting ML Models',
        issuer: 'Infosys | Springboard',
        category: 'Advanced ML & Boosting',
        org: 'Infosys Springboard',
        date: 'February 14, 2025',
        type: 'Advanced ML Specialization',
        image: 'images/certificates/boosting-ml-python-certificate.jpg',
        skills: ['Ensemble Learning', 'Gradient Boosting', 'XGBoost & AdaBoost', 'Hyperparameter Tuning', 'Overfitting Prevention'],
        description: 'Advanced model boosting and hyperparameter optimization techniques covering Ensemble learning, Gradient Boosting, XGBoost algorithms, cross-validation strategies, and model accuracy optimization.'
    }
};

let currentCertImageSrc = '';

function openCertModal(certId) {
    const data = CertsData[certId];
    if (!data) return;

    const modal = document.getElementById('certModal');
    if (!modal) return;

    currentCertImageSrc = data.image;

    document.getElementById('cmTitle').textContent = data.title;
    document.getElementById('cmIssuer').textContent = data.issuer;
    document.getElementById('cmImage').src = data.image;
    document.getElementById('cmImage').alt = data.title;

    const catEl = document.getElementById('cmCategory');
    if (catEl) {
        catEl.textContent = data.category || 'Professional Credential';
    }

    document.getElementById('cmOrg').textContent = data.org;
    document.getElementById('cmDate').textContent = data.date;
    document.getElementById('cmType').textContent = data.type;

    const skillsContainer = document.getElementById('cmSkills');
    skillsContainer.innerHTML = data.skills.map(skill => `
        <span class="cm-skill-badge"><i class='bx bx-check'></i> ${skill}</span>
    `).join('');

    document.getElementById('cmDescription').textContent = data.description;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function expandCertImage() {
    const imageSrc = currentCertImageSrc || document.getElementById('cmImage').src;
    const degreeModal = document.getElementById('degreeModal');
    const modalImage = document.getElementById('modalImage');
    
    if (degreeModal && modalImage && imageSrc) {
        modalImage.src = imageSrc;
        modalImage.alt = document.getElementById('cmTitle').textContent || 'Certificate Full Preview';
        degreeModal.classList.add('active');
    }
}

function closeDegreeModal() {
    const degreeModal = document.getElementById('degreeModal');
    if (degreeModal) {
        degreeModal.classList.remove('active');
    }
}

// Professional Skill Badges Dataset
const BadgesData = {
    'vertex-ai': {
        title: 'Prompt Design in Vertex AI',
        issuer: 'Google Cloud Platform',
        category: 'Cloud & Generative AI',
        org: 'Google Cloud',
        date: 'May 2025',
        platform: 'Credly (Verified)',
        verifyUrl: 'https://www.credly.com/badges/f5b1b19e-b76a-4d8d-8712-0de0cd0832c4',
        previewHtml: `
            <div class="bm-badge-card-graphic google-theme">
                <div class="bm-badge-icon-shield google-glow">
                    <i class="fab fa-google"></i>
                </div>
                <div class="bm-badge-card-info">
                    <span class="bm-brand-tag">Google Cloud Certified</span>
                    <h4 class="bm-badge-heading">Prompt Design in Vertex AI</h4>
                    <span class="bm-badge-credly-seal"><i class='bx bx-check-shield'></i> Credly Verified Credential</span>
                </div>
            </div>
        `,
        skills: ['Vertex AI Studio', 'Gemini 1.5/2.5 Prompting', 'Multimodal Prompting', 'Few-Shot & Zero-Shot Learning', 'Parameter Tuning', 'Generative AI Workflows'],
        description: 'Official Google Cloud skill badge validating hands-on expertise in prompt engineering using Vertex AI. Covers Gemini LLM parameter tuning, zero-shot and few-shot prompting techniques, multimodal prompt design, context window optimization, and integrating GenAI endpoints into software applications.'
    },
    'cisco-analytics': {
        title: 'Data Analytics Essentials',
        issuer: 'Cisco Networking Academy',
        category: 'Data & Analytics',
        org: 'Cisco Academy',
        date: 'February 2, 2025',
        platform: 'Credly (Verified)',
        verifyUrl: 'https://www.credly.com/badges/aa570ecb-9dc6-41b9-8a9a-4f9f18f6fa7f',
        previewHtml: `
            <div class="bm-badge-card-graphic cisco-theme">
                <div class="bm-badge-icon-shield cisco-glow">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="bm-badge-card-info">
                    <span class="bm-brand-tag">Cisco Networking Academy</span>
                    <h4 class="bm-badge-heading">Data Analytics Essentials</h4>
                    <span class="bm-badge-credly-seal"><i class='bx bx-check-shield'></i> Credly Verified Credential</span>
                </div>
            </div>
        `,
        skills: ['Data Cleaning & Transformation', 'Exploratory Data Analysis (EDA)', 'Statistical Analytics', 'Data Visualization', 'Business Intelligence', 'Data Storytelling'],
        description: 'Verified Cisco digital credential certifying technical proficiency in exploratory data analysis (EDA), data cleaning pipelines, statistical analytics, interactive data visualization, and transforming complex datasets into actionable business intelligence.'
    },
    'oracle-java': {
        title: 'Oracle Java Foundations',
        issuer: 'Oracle University',
        category: 'Core Programming',
        org: 'Oracle University',
        date: 'June 2026',
        platform: 'Oracle MyLearn',
        verifyUrl: 'https://mylearn.oracle.com/ou/learning-path/oracle-java-foundations-training-and-assessment/152239',
        previewHtml: `
            <div class="bm-badge-card-graphic oracle-theme">
                <img src="images/oracle-java-foundations-badge.png" alt="Oracle Java Foundations badge" class="oracle-badge-img-v2" style="max-width: 170px;">
            </div>
        `,
        skills: ['Java SE Architecture', 'Object-Oriented Programming (OOP)', 'Java Collections Framework', 'Exception Handling', 'Algorithm Design', 'JVM Fundamentals'],
        description: 'Official Oracle University learning path credential certifying thorough proficiency in Core Java programming syntax, Object-Oriented Programming (OOP) principles, memory management, Java Collections framework, exception handling architectures, and fundamental software design patterns.'
    }
};

function openBadgeModal(badgeId) {
    const data = BadgesData[badgeId];
    if (!data) return;

    const modal = document.getElementById('badgeModal');
    if (!modal) return;

    document.getElementById('bmTitle').textContent = data.title;
    document.getElementById('bmIssuer').textContent = data.issuer;
    document.getElementById('bmCategory').textContent = data.category;
    document.getElementById('bmOrg').textContent = data.org;
    document.getElementById('bmDate').textContent = data.date;
    document.getElementById('bmPlatform').textContent = data.platform;

    const verifyBtn = document.getElementById('bmVerifyBtn');
    if (verifyBtn) {
        verifyBtn.href = data.verifyUrl;
    }

    const previewBox = document.getElementById('bmPreviewBox');
    if (previewBox) {
        previewBox.innerHTML = data.previewHtml;
    }

    const skillsContainer = document.getElementById('bmSkills');
    if (skillsContainer) {
        skillsContainer.innerHTML = data.skills.map(skill => `
            <span class="cm-skill-badge"><i class='bx bx-check'></i> ${skill}</span>
        `).join('');
    }

    document.getElementById('bmDescription').textContent = data.description;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBadgeModal() {
    const modal = document.getElementById('badgeModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Global modal overlay & escape key handlers
document.addEventListener('DOMContentLoaded', () => {
    const certModal = document.getElementById('certModal');
    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeCertModal();
            }
        });
    }

    const badgeModal = document.getElementById('badgeModal');
    if (badgeModal) {
        badgeModal.addEventListener('click', (e) => {
            if (e.target === badgeModal) {
                closeBadgeModal();
            }
        });
    }

    const degreeModal = document.getElementById('degreeModal');
    if (degreeModal) {
        degreeModal.addEventListener('click', (e) => {
            if (e.target === degreeModal) {
                closeDegreeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCertModal();
            closeBadgeModal();
            closeDegreeModal();
            closeProjectModal();
        }
    });
});
