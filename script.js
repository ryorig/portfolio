// Loading Screen Management
document.addEventListener('DOMContentLoaded', () => {
  // Hide loading screen after content loads
  setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.classList.add('hide');
    }
  }, 1500);
});

// Custom Cursor
const cursor = document.querySelector('.cursor-follow');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
  const speed = 0.15;
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;
  
  if (cursor) {
    cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
  }
  
  requestAnimationFrame(animateCursor);
}

if (window.matchMedia("(hover: hover)").matches) {
  animateCursor();
}

// Cursor hover effects
document.querySelectorAll('a, button, .work-card').forEach(element => {
  element.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.transform += ' scale(1.5)';
  });
  
  element.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
  });
});

// Navigation
const nav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Scroll effect for navigation
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Parallax effect for gradient orbs
const parallaxElements = document.querySelectorAll('.gradient-orb');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      
      // Special animation for timeline items
      if (entry.target.classList.contains('timeline-item')) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, delay * 100);
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section-header, .about-content, .work-card, .contact-content').forEach(el => {
  observer.observe(el);
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
  item.dataset.delay = index;
  observer.observe(item);
});

// Work cards hover effect with tilt
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Dynamic typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const titleLines = heroTitle.querySelectorAll('.title-line');
  titleLines.forEach((line, index) => {
    line.style.animationDelay = `${0.5 + index * 0.2}s`;
  });
}

// Smooth reveal for sections
const revealSection = () => {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.8) {
      section.classList.add('revealed');
    }
  });
};

window.addEventListener('scroll', revealSection);
revealSection();

// Add active state to navigation based on scroll position
const updateActiveNav = () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.pageYOffset + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', updateActiveNav);

// Magnetic effect for buttons and links
document.querySelectorAll('.contact-link').forEach(link => {
  link.addEventListener('mousemove', (e) => {
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    link.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translate(0, 0)';
  });
});

// Performance optimization - throttle scroll events
let scrollTimeout;
const throttledScroll = (callback) => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      callback();
      scrollTimeout = null;
    }, 66); // ~15fps
  }
};

// Replace direct scroll listeners with throttled versions
window.addEventListener('scroll', () => {
  throttledScroll(() => {
    updateActiveNav();
    revealSection();
  });
});

// Add smooth page transitions
window.addEventListener('beforeunload', () => {
  document.body.style.opacity = '0';
});

// Initialize animations on page load
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  
  // Trigger initial animations
  setTimeout(() => {
    document.querySelectorAll('.hero-title .title-line').forEach((line, index) => {
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, 500);
});

// Easter egg: Konami code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    
    if (konamiIndex === konamiCode.length) {
      document.body.style.animation = 'rainbow 2s linear infinite';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 5000);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

// Add rainbow animation style
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  
  section {
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  section.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  
  .in-view {
    animation: fadeInUp 0.6s ease forwards;
  }
  
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
  
  .nav-menu a.active {
    color: var(--color-primary);
  }
`;
document.head.appendChild(style);

console.log('%c Welcome to Ryosuke Nakamoto\'s Portfolio! 🚀', 'font-size: 20px; color: #4F46E5; font-weight: bold;');
console.log('%c Built with passion for technology and education', 'font-size: 14px; color: #06B6D4;');