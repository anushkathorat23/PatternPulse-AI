// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== SCROLL REVEAL (Intersection Observer) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Don't unobserve — we only animate once
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.feature-card, .pipeline-step, .tech-card, .section-header, .hero-content, .hero-visual, .hero-stats, .cta-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== STAT COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateStats();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.getElementById('hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

function animateStats() {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const suffix = stat.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }
      stat.textContent = Math.floor(current) + suffix;
    }, 16);
  });
}

// ===== PIPELINE STEP STAGGER =====
const pipelineSteps = document.querySelectorAll('.pipeline-step');
const pipelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const steps = entry.target.parentElement.querySelectorAll('.pipeline-step');
      steps.forEach((step, i) => {
        setTimeout(() => {
          step.classList.add('revealed');
        }, i * 150);
      });
      pipelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

if (pipelineSteps.length > 0) {
  pipelineObserver.observe(pipelineSteps[0]);
}

// ===== FEATURE CARDS STAGGER =====
const featureCards = document.querySelectorAll('.feature-card');
const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('revealed');
        }, i * 120);
      });
      featureObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

if (featureCards.length > 0) {
  featureObserver.observe(featureCards[0]);
}

// ===== TECH CARDS STAGGER =====
const techCards = document.querySelectorAll('.tech-card');
const techObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = document.querySelectorAll('.tech-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('revealed');
        }, i * 80);
      });
      techObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

if (techCards.length > 0) {
  techObserver.observe(techCards[0]);
}

// ===== PARALLAX HERO GLOWS =====
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  const glow1 = document.querySelector('.hero-glow-1');
  const glow2 = document.querySelector('.hero-glow-2');

  if (glow1 && glow2) {
    glow1.style.transform = `translate(${x * 40 - 20}px, ${y * 40 - 20}px)`;
    glow2.style.transform = `translate(${-x * 30 + 15}px, ${-y * 30 + 15}px)`;
  }
});
