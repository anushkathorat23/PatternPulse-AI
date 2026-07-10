// ===== RESULTS PAGE JS =====
// ===== MOBILE NAV =====
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

// ===== LOAD FILENAME =====
const storedName = sessionStorage.getItem("pp_filename");
const result = JSON.parse(sessionStorage.getItem("pp_result"));

// ===== Display Sensitive Information =====
if (result) {
  const sensitiveList = document.getElementById("sensitive-list");
  sensitiveList.innerHTML = "";

  const sensitive = result.detected_sensitive_info;

  for (const type in sensitive) {
    sensitive[type].forEach(value => {
      const item = document.createElement("div");
      item.className = "sensitive-item";

      item.innerHTML = `
        <span class="sensitive-type-badge">${type.toUpperCase()}</span>
        <span class="sensitive-value">${value}</span>
        <span class="sensitive-redacted">✔ Redacted</span>
      `;

      sensitiveList.appendChild(item);
    });
  }
}

if (storedName) {
  document.getElementById("results-filename").textContent = storedName;

  const meta = document.getElementById("results-file-meta");
  meta.textContent = meta.textContent.replace(
    "Floor_Plan_A101.pdf",
    storedName
  );
}

if (result) {
  document.getElementById("discipline-name").textContent =
    result.discipline;
}
// ===== LOAD BACKEND RESULT =====

const confidenceValue = result
  ? parseFloat(result.confidence)
  : 92.5;

const circumference = 2 * Math.PI * 54; // r=54

function animateConfidence() {
  const circle = document.getElementById('confidence-circle');
  const numberEl = document.getElementById('confidence-number');
  const barFill = document.getElementById('confidence-bar-fill');

  // Animate circle
  const targetOffset = circumference - (confidenceValue / 100) * circumference;
  circle.style.strokeDashoffset = targetOffset;

  // Animate number
  let current = 0;
  const duration = 1500;
  const step = confidenceValue / (duration / 16);

  const counter = setInterval(() => {
    current += step;
    if (current >= confidenceValue) {
      current = confidenceValue;
      clearInterval(counter);
    }
    numberEl.textContent = current.toFixed(1) + '%';
  }, 16);

  // Animate mini bar
  barFill.style.width = confidenceValue + '%';

  // Set interpretation
  const interp = document.getElementById('confidence-interpretation');
  if (confidenceValue >= 90) {
    interp.textContent = 'Very High Confidence';
    interp.style.color = 'var(--accent-light)';
  } else if (confidenceValue >= 75) {
    interp.textContent = 'High Confidence';
    interp.style.color = 'var(--primary-light)';
  } else if (confidenceValue >= 50) {
    interp.textContent = 'Moderate Confidence';
    interp.style.color = '#FBBF24';
  } else {
    interp.textContent = 'Low Confidence';
    interp.style.color = '#FCA5A5';
  }
}

// ===== KEYWORD HOVER EFFECTS =====
document.querySelectorAll('.keyword-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'translateY(-2px)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = 'translateY(0)';
  });
});

// ===== SENSITIVE ITEMS COUNT ANIMATION =====
function animateSensitiveItems() {
  const items = document.querySelectorAll('.sensitive-item');
  items.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-10px)';
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 100 + i * 80);
  });
}

// ===== UPDATE TOTAL SENSITIVE ITEMS =====
if (result) {

    let total = 0;

    for (const type in result.detected_sensitive_info) {
        total += result.detected_sensitive_info[type].length;
    }

    document.querySelector(".sensitive-count").innerHTML =
        `<strong>${total} items</strong> detected and successfully redacted`;

}
// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.id === 'card-confidence') {
        animateConfidence();
      }
      if (entry.target.id === 'card-sensitive') {
        animateSensitiveItems();
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const confidenceCard = document.getElementById('card-confidence');
const sensitiveCard = document.getElementById('card-sensitive');

if (confidenceCard) observer.observe(confidenceCard);
if (sensitiveCard) observer.observe(sensitiveCard);

// ===== DOWNLOAD BUTTON SIMULATIONS =====
document.getElementById("btn-download-redacted").addEventListener("click", (e) => {
    e.preventDefault();

    const result = JSON.parse(sessionStorage.getItem("pp_result"));

    if (!result) {
        showToast("No result found", "error");
        return;
    }

    if (!result.redacted_pdf) {
        showToast("Redacted PDF not available", "error");
        return;
    }

    // Convert Windows path to browser URL
    const fileUrl =
        "https://patternpulse-ai.onrender.com/" +
        result.redacted_pdf.replace(/\\/g, "/");

    console.log(fileUrl);

    // Download file
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showToast("Downloading redacted PDF...", "success");
});
document.getElementById('btn-download-csv').addEventListener('click', (e) => {
  e.preventDefault();
  showToast('CSV report downloaded successfully', 'success');
});

// ===== TOAST NOTIFICATION =====
function showToast(message, type) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    padding: 12px 24px;
    background: ${type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)'};
    border: 1px solid ${type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'};
    color: ${type === 'error' ? '#FCA5A5' : '#6EE7B7'};
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    backdrop-filter: blur(16px);
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
