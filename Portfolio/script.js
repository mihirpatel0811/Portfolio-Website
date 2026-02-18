/* ============================================
   PROFESSIONAL PORTFOLIO JAVASCRIPT
   Enhanced Interactive Features
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initPreloader();
    initCursorGlow();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initScrollHeader();
    initTypedText();
    initCounterAnimation();
    initSkillBars();
    initProjectFilters();
    initScrollAnimations();
    initParticleEffects();
    initContactForm();
    initTestimonialSlider();
    initScrollTop();
    initCharAnimations();
});

/* ============================================
   PRELOADER
   ============================================ */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1500);
    });
}

/* ============================================
   CURSOR GLOW EFFECT
   ============================================ */
function initCursorGlow() {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) return;

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hide cursor on mouse leave
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
}

/* ============================================
   THEME TOGGLE (DARK/LIGHT MODE)
   ============================================ */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeIcon(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcon(isDark);
        });
    }

    function updateThemeIcon(isDark) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (isDark) {
            icon.className = 'bx bx-sun';
        } else {
            icon.className = 'bx bx-moon';
        }
    }
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    if (mobileBtn && navbar) {
        mobileBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navbar.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
                mobileBtn.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && !mobileBtn.contains(e.target)) {
                navbar.classList.remove('active');
                mobileBtn.classList.remove('active');
            }
        });
    }
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   SCROLL HEADER EFFECT
   ============================================ */
function initScrollHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ============================================
   TYPED TEXT EFFECT
   ============================================ */
function initTypedText() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;

    const textArray = [
        'Full-Stack Developer',
        'Web Designer',
        'MCA Student',
        'Problem Solver',
        'Tech Enthusiast'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after a delay
    setTimeout(type, 1500);
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
}

/* ============================================
   SKILL BARS ANIMATION
   ============================================ */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.bar-fill');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(function() {
                    bar.style.width = width + '%';
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    skillBars.forEach(function(bar) {
        observer.observe(bar);
    });
}

/* ============================================
   PROJECT FILTERS
   ============================================ */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.project-box');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');

            // Filter projects
            const filter = this.getAttribute('data-filter');
            
            projectBoxes.forEach(function(box) {
                const category = box.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    box.classList.remove('hidden');
                    box.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    box.classList.add('hidden');
                }
            });
        });
    });
}

/* ============================================
   SCROLL ANIMATIONS (AOS)
   ============================================ */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

/* ============================================
   SOCIAL MEDIA ICONS HOVER EFFECTS
   ============================================ */
function initSocialIconEffects() {
    const socialLinks = document.querySelectorAll('.social-link, .contact .social-links a, .footer-social a');
    
    socialLinks.forEach(function(link) {
        const icon = link.querySelector('i');
        if (!icon) return;
        
        // Get platform name from class or href
        let platform = 'Follow';
        if (link.classList.contains('github')) platform = 'GitHub';
        else if (link.classList.contains('linkedin')) platform = 'LinkedIn';
        else if (link.classList.contains('whatsapp')) platform = 'WhatsApp';
        else if (link.classList.contains('instagram')) platform = 'Instagram';
        else if (link.classList.contains('twitter')) platform = 'Twitter';
        else if (link.classList.contains('email')) platform = 'Email';
        else if (link.classList.contains('youtube')) platform = 'YouTube';
        
        // Store original color
        const originalColor = getComputedStyle(icon).color;
        
        link.addEventListener('mouseenter', function() {
            // Scale animation
            icon.style.transform = 'scale(1.3)';
            icon.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            // Add glow effect
            this.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            icon.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
}

initSocialIconEffects();

/* ============================================
   PARTICLE EFFECTS
   ============================================ */
function initParticleEffects() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('span');
    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 10;
    const animationDelay = Math.random() * 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: var(--primary-500);
        border-radius: 50%;
        opacity: ${Math.random() * 0.5 + 0.2};
        left: ${left}%;
        bottom: -20px;
        animation: particleFloat ${animationDuration}s linear ${animationDelay}s infinite;
    `;
    
    container.appendChild(particle);
}

/* ============================================
   CONTACT FORM WITH EMAILJS
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Initialize EmailJS with your public key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    // Get it from: https://dashboard.emailjs.com/admin
    emailjs.init('YOUR_PUBLIC_KEY');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="bx bx-loader-alt bx-spin"></i>';
        submitBtn.disabled = true;
        
        // Get form data
        const templateParams = {
            from_name: form.querySelector('#name').value,
            from_email: form.querySelector('#email').value,
            subject: form.querySelector('#subject').value,
            message: form.querySelector('#message').value,
            to_name: 'Mihir Bhayani',
            to_email: 'mihirbhayani8@gmail.com'
        };
        
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual values
        // Get them from: https://dashboard.emailjs.com/admin
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('Email sent successfully!', response);
                showToast('Message sent successfully! I will get back to you soon.', 'success');
                form.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, function(error) {
                console.log('Email failed to send:', error);
                showToast('Failed to send message. Please try again or email me directly at mihirbhayani8@gmail.com', 'error');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
    });
    
    // Real-time validation feedback
    form.querySelectorAll('input, textarea').forEach(function(input) {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#10b981';
            } else {
                this.style.borderColor = '';
            }
        });
    });
}

function showToast(message, type) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon i');
    
    toastMessage.textContent = message;
    
    if (type === 'success') {
        toastIcon.className = 'bx bx-check-circle';
        toastIcon.style.color = '#10b981';
    } else if (type === 'error') {
        toastIcon.className = 'bx bx-x-circle';
        toastIcon.style.color = '#ef4444';
    }
    
    toast.classList.add('show');
    
    setTimeout(function() {
        toast.classList.remove('show');
    }, 4000);
}

/* ============================================
   TESTIMONIAL SLIDER
   ============================================ */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const cards = slider.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        cards.forEach(function(card) {
            card.classList.remove('active');
        });
        cards[index].classList.add('active');
    }
    
    // Auto-rotate testimonials
    setInterval(function() {
        currentSlide = (currentSlide + 1) % cards.length;
        showSlide(currentSlide);
    }, 5000);
    
    showSlide(currentSlide);
}

/* ============================================
   SCROLL TO TOP
   ============================================ */
function initScrollTop() {
    const scrollBtn = document.getElementById('scrollTop');
    if (!scrollBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   CHARACTER ANIMATIONS
   ============================================ */
function initCharAnimations() {
    const chars = document.querySelectorAll('.char');
    if (chars.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    chars.forEach(function(char) {
        observer.observe(char);
    });
}

/* ============================================
   NAVIGATION ACTIVE STATE
   ============================================ */
function initNavigationActiveState() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

initNavigationActiveState();

/* ============================================
   PROJECT MODAL
   ============================================ */
function initProjectModal() {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });
}

initProjectModal();

/* ============================================
   SKILL ICONS TOOLTIP
   ============================================ */
function initSkillTooltips() {
    const iconItems = document.querySelectorAll('.icon-item');
    
    iconItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = item.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                padding: 5px 10px;
                background: var(--gray-900);
                color: white;
                font-size: 12px;
                border-radius: 4px;
                white-space: nowrap;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            `;
            item.appendChild(tooltip);
            
            setTimeout(function() {
                tooltip.style.opacity = '1';
            }, 10);
        });
        
        item.addEventListener('mouseleave', function() {
            const tooltip = item.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

initSkillTooltips();
