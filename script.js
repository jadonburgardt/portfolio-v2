
// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Interactive Color Picker
function initColorPicker() {
    // Create color picker container
    const colorPickerContainer = document.createElement('div');
    colorPickerContainer.className = 'color-picker-container';
    colorPickerContainer.innerHTML = `
        <div class="color-picker-toggle">
            <i class="fas fa-palette"></i>
        </div>
        <div class="color-picker-panel">
            <h4>Choose Theme Color</h4>
            <input type="color" id="themeColorPicker" value="#2196f3">
            <div class="preset-colors">
                <div class="preset-color" data-color="#2196f3" style="background: #2196f3;" title="Default Blue"></div>
                <div class="preset-color" data-color="#f44336" style="background: #f44336;" title="Red"></div>
                <div class="preset-color" data-color="#4caf50" style="background: #4caf50;" title="Green"></div>
                <div class="preset-color" data-color="#ff9800" style="background: #ff9800;" title="Orange"></div>
                <div class="preset-color" data-color="#9c27b0" style="background: #9c27b0;" title="Purple"></div>
                <div class="preset-color" data-color="#00bcd4" style="background: #00bcd4;" title="Cyan"></div>
                <div class="preset-color" data-color="#795548" style="background: #795548;" title="Brown"></div>
                <div class="preset-color" data-color="#607d8b" style="background: #607d8b;" title="Blue Grey"></div>
            </div>
            <button class="reset-color-btn">Reset to Default</button>
        </div>
    `;
    
    document.body.appendChild(colorPickerContainer);
    
    // Get elements
    const toggle = colorPickerContainer.querySelector('.color-picker-toggle');
    const panel = colorPickerContainer.querySelector('.color-picker-panel');
    const colorInput = document.getElementById('themeColorPicker');
    const presetColors = colorPickerContainer.querySelectorAll('.preset-color');
    const resetBtn = colorPickerContainer.querySelector('.reset-color-btn');
    
    // Toggle panel
    toggle.addEventListener('click', () => {
        panel.classList.toggle('active');
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!colorPickerContainer.contains(e.target)) {
            panel.classList.remove('active');
        }
    });
    
    // Apply color function
    function applyThemeColor(color) {
        document.documentElement.style.setProperty('--primary-color', color);
        document.documentElement.style.setProperty('--primary-hover', adjustColorBrightness(color, 20));
        document.documentElement.style.setProperty('--primary-alpha', hexToRgba(color, 0.1));
        document.documentElement.style.setProperty('--primary-alpha-8', hexToRgba(color, 0.8));
        
        // Save to localStorage
        localStorage.setItem('themeColor', color);
        
        // Update color input
        colorInput.value = color;
    }
    
    // Color input change
    colorInput.addEventListener('input', (e) => {
        applyThemeColor(e.target.value);
    });
    
    // Preset color clicks
    presetColors.forEach(preset => {
        preset.addEventListener('click', () => {
            const color = preset.getAttribute('data-color');
            applyThemeColor(color);
            
            // Update active preset
            presetColors.forEach(p => p.classList.remove('active'));
            preset.classList.add('active');
        });
    });
    
    // Reset button
    resetBtn.addEventListener('click', () => {
        applyThemeColor('#2196f3');
        presetColors.forEach(p => p.classList.remove('active'));
        presetColors[0].classList.add('active');
    });
    
    // Load saved color
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        applyThemeColor(savedColor);
        // Find and mark active preset
        presetColors.forEach(preset => {
            if (preset.getAttribute('data-color') === savedColor) {
                preset.classList.add('active');
            }
        });
    } else {
        presetColors[0].classList.add('active');
    }
}

// Helper functions for color manipulation
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function adjustColorBrightness(hex, percent) {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Initialize color picker when page loads
document.addEventListener('DOMContentLoaded', initColorPicker);

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Event listeners for slider navigation
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play slider
setInterval(nextSlide, 5000);

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                if (card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 15, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
    }
});

// Animate elements on scroll
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

// Observe all cards and sections for animation
document.querySelectorAll('.skill-card, .project-card, .about-content, .hero-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Email copy functionality
function initEmailCopy() {
    const emailLinks = document.querySelectorAll('.email-link, .email-copy');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const email = link.getAttribute('data-email') || 'burgardtjad@gmail.com';
            
            // Copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                showCopyConfirmation('Email copied to clipboard!');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopyConfirmation('Email copied to clipboard!');
            });
        });
    });
}

// Show copy confirmation popup
function showCopyConfirmation(message) {
    // Remove existing popup if any
    const existingPopup = document.querySelector('.copy-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = 'copy-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Show popup with animation
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
    
    // Hide popup after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            if (popup.parentNode) {
                popup.remove();
            }
        }, 300);
    }, 3000);
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-info h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
    
    // Initialize email copy functionality
    initEmailCopy();
});

// Form submission handler (if you add a contact form later)
function handleFormSubmit(event) {
    event.preventDefault();
    // Add your form handling logic here
    alert('Thank you for your message! I\'ll get back to you soon.');
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
