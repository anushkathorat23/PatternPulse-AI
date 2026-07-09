// Mobile Nav
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Animate stat values
const statValues = document.querySelectorAll('.dash-stat-value');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateValue(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statValues.forEach(el => statsObserver.observe(el));

function animateValue(el) {
  const text = el.getAttribute('data-value');
  const hasPercent = text.includes('%');
  const hasS = text.includes('s');
  const hasComma = text.includes(',');
  const numericStr = text.replace(/[^0-9.]/g, '');
  const target = parseFloat(numericStr);
  const isFloat = text.includes('.');
  const duration = 1500;
  const startTime = Date.now();

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    let current = target * eased;

    let display;
    if (isFloat) {
      display = current.toFixed(1);
    } else {
      display = Math.floor(current).toString();
    }
    if (hasComma && !isFloat) {
      display = parseInt(display).toLocaleString();
    }
    if (hasPercent) display += '%';
    if (hasS) display += 's';

    el.textContent = display;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Bar chart animation
const bars = document.querySelectorAll('.bar');
bars.forEach(bar => {
  bar.setAttribute('data-height', bar.style.height);
  bar.style.height = '0%';
});

const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.bar').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.height = bar.getAttribute('data-height');
        }, i * 100);
      });
      chartObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const chartEl = document.querySelector('.bar-chart');
if (chartEl) chartObserver.observe(chartEl);
