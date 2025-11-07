// Navigation Scroll Effect
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isActive = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        
        // Prevent body scroll when menu is open
        if (isActive) {
            document.body.style.overflow = 'hidden';
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Calculate navbar height dynamically
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 100;
            const offsetTop = target.offsetTop - navbarHeight - 20; // Extra 20px for spacing
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.service-card, .testimonial-card, .gallery-item, .about-wrapper > div').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Contact Form Handling with Loading States and Error Handling
const contactForm = document.getElementById('contactForm');
const formError = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');

const errorMessages = {
    en: {
        required: 'Please fill in all required fields.',
        email: 'Please enter a valid email address.',
        phone: 'Please enter a valid phone number.',
        error: 'Something went wrong. Please try again later.'
    },
    mk: {
        required: 'Ве молиме пополнете ги сите задолжителни полиња.',
        email: 'Ве молиме внесете валидна е-пошта адреса.',
        phone: 'Ве молиме внесете валиден телефонски број.',
        error: 'Нешто тргна наопаку. Ве молиме обидете се повторно подоцна.'
    }
};

function showFormError(messageKey) {
    const currentLang = localStorage.getItem('language') || 'en';
    const message = errorMessages[currentLang][messageKey] || messageKey;
    formError.textContent = message;
    formError.classList.add('show');
    setTimeout(() => {
        formError.classList.remove('show');
    }, 5000);
}

function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    
    // Clear previous errors
    formError.classList.remove('show');
    
    // Validation
    if (!name || !email || !phone || !service) {
        showFormError('required');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormError('email');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)\/]+$/;
    if (!phoneRegex.test(phone)) {
        showFormError('phone');
        return;
    }
    
    // Set loading state
    setLoadingState(true);
    
    try {
        // Simulate API call (replace with actual endpoint)
        // Example: await fetch('/api/contact', { method: 'POST', body: formData })
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success
        const currentLang = localStorage.getItem('language') || 'en';
        const successMessages = {
            en: 'Message Sent! ✓',
            mk: 'Пораката е испратена! ✓'
        };
        submitBtn.style.background = '#10b981';
        btnText.textContent = successMessages[currentLang] || 'Message Sent! ✓';
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.style.background = '';
            // Update button text based on current language
            const btnTextLang = localStorage.getItem('language') || 'en';
            const sendMessages = {
                en: 'Send Message',
                mk: 'Испрати порака'
            };
            btnText.textContent = sendMessages[btnTextLang] || 'Send Message';
            setLoadingState(false);
        }, 2000);
        
    } catch (error) {
        setLoadingState(false);
        showFormError('error');
        console.error('Form submission error:', error);
    }
});

// Add active state to navigation links on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 100;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - navbarHeight - 20;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-blue) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Lazy Loading for Gallery Images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
                const newImg = new Image();
                newImg.src = src;
                newImg.alt = img.dataset.alt || 'Gallery image';
                newImg.loading = 'lazy';
                newImg.onload = () => {
                    img.appendChild(newImg);
                    img.classList.add('loaded');
                    observer.unobserve(img);
                };
            }
        }
    });
}, { rootMargin: '50px' });

document.querySelectorAll('.gallery-image[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Gallery Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const item = galleryItems[index];
    const imgElement = item.querySelector('.gallery-image img');
    const imgSrc = imgElement ? imgElement.src : (item.querySelector('.gallery-image').dataset.src || '');
    
    if (imgSrc) {
        lightboxImage.src = imgSrc;
        lightboxImage.alt = imgElement ? imgElement.alt : 'Gallery image';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    openLightbox(currentImageIndex);
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentImageIndex);
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

// Gallery "See More" functionality
const galleryLoadMoreBtn = document.getElementById('galleryLoadMore');
const hiddenGalleryItems = document.querySelectorAll('.gallery-item-hidden');
let allItemsShown = false;

if (galleryLoadMoreBtn && hiddenGalleryItems.length > 0) {
    galleryLoadMoreBtn.addEventListener('click', () => {
        if (!allItemsShown) {
            // Show all hidden items
            hiddenGalleryItems.forEach(item => {
                item.classList.add('show');
            });
            allItemsShown = true;
            
            // Update button text
            const currentLang = localStorage.getItem('language') || 'en';
            galleryLoadMoreBtn.textContent = currentLang === 'mk' ? 'Види помалку' : 'See Less';
            galleryLoadMoreBtn.setAttribute('data-action', 'hide');
            
            // Smooth scroll to first newly shown item
            if (hiddenGalleryItems[0]) {
                hiddenGalleryItems[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        } else {
            // Hide items again
            hiddenGalleryItems.forEach(item => {
                item.classList.remove('show');
            });
            allItemsShown = false;
            
            // Update button text
            const currentLang = localStorage.getItem('language') || 'en';
            galleryLoadMoreBtn.textContent = currentLang === 'mk' ? 'Види повеќе' : 'See More';
            galleryLoadMoreBtn.setAttribute('data-action', 'show');
            
            // Scroll to gallery section
            document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Statistics counter animation
const stats = document.querySelectorAll('.stat h3');

const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateValue(stat, 0, target, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('#about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Bilingual Support (Macedonian/English)
const currentLang = localStorage.getItem('language') || 'en';
const langButtons = document.querySelectorAll('.lang-btn');

function updateLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    
    // Update all elements with data-en and data-mk attributes
    document.querySelectorAll('[data-en][data-mk]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            // Check if it's an input/textarea/select for placeholder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.hasAttribute('placeholder')) {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            } else if (el.tagName === 'OPTION') {
                el.textContent = text;
            } else if (el.tagName === 'SELECT') {
                // For select, update all options
                Array.from(el.options).forEach(option => {
                    if (option.hasAttribute('data-en') && option.hasAttribute('data-mk')) {
                        const optionText = option.getAttribute(`data-${lang}`);
                        if (optionText) {
                            option.textContent = optionText;
                        }
                    }
                });
            } else {
                el.textContent = text;
            }
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-placeholder-en][data-placeholder-mk]').forEach(el => {
        const text = el.getAttribute(`data-placeholder-${lang}`);
        if (text) {
            el.placeholder = text;
        }
    });
    
    // Update aria-labels
    document.querySelectorAll('[data-aria-en][data-aria-mk]').forEach(el => {
        const text = el.getAttribute(`data-aria-${lang}`);
        if (text) {
            el.setAttribute('aria-label', text);
        }
    });
    
    // Update active button
    langButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update gallery "See More" button text if it exists
    const galleryLoadMoreBtn = document.getElementById('galleryLoadMore');
    if (galleryLoadMoreBtn) {
        const isExpanded = galleryLoadMoreBtn.getAttribute('data-action') === 'hide';
        if (isExpanded) {
            galleryLoadMoreBtn.textContent = lang === 'mk' ? 'Види помалку' : 'See Less';
        } else {
            galleryLoadMoreBtn.textContent = lang === 'mk' ? 'Види повеќе' : 'See More';
        }
    }
}

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        updateLanguage(btn.dataset.lang);
    });
});

// Initialize language
updateLanguage(currentLang);

// Breadcrumbs Navigation
function updateBreadcrumbs() {
    const breadcrumbList = document.querySelector('.breadcrumb-list');
    if (!breadcrumbList) return;
    
    const currentSection = document.querySelector('section[id]:target') || 
                          Array.from(document.querySelectorAll('section[id]')).find(section => {
                              const rect = section.getBoundingClientRect();
                              return rect.top <= 100 && rect.bottom >= 100;
                          });
    
    if (currentSection && currentSection.id !== 'home') {
        const sectionName = currentSection.querySelector('.section-title')?.textContent || 
                           currentSection.id.charAt(0).toUpperCase() + currentSection.id.slice(1);
        breadcrumbList.innerHTML = `
            <li><a href="#home">Home</a></li>
            <li><a href="#${currentSection.id}">${sectionName}</a></li>
        `;
    } else {
        breadcrumbList.innerHTML = '<li><a href="#home">Home</a></li>';
    }
}

window.addEventListener('scroll', updateBreadcrumbs);
window.addEventListener('hashchange', updateBreadcrumbs);
updateBreadcrumbs();

