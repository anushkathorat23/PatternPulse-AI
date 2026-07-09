// ===== PROCESSING PAGE JS =====

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

// ===== LOAD FILENAME FROM SESSION =====
const filenameEl = document.getElementById('proc-filename');
const storedName = sessionStorage.getItem('pp_filename');
if (storedName) {
  filenameEl.textContent = storedName;
}

// ===== STEP DEFINITIONS =====
const steps = [
  { id: 0, label: 'Extracting Text', duration: 2200 },
  { id: 1, label: 'Running Classification', duration: 3000 },
  { id: 2, label: 'Detecting Sensitive Information', duration: 2800 },
  { id: 3, label: 'Redacting PDF', duration: 2400 },
  { id: 4, label: 'Generating Report', duration: 1800 }
];

const totalDuration = steps.reduce((a, s) => a + s.duration, 0);
const progressFill = document.getElementById('proc-progress-fill');
const progressPercent = document.getElementById('proc-progress-percent');
const doneSection = document.getElementById('processing-done');

let currentStep = 0;
let overallProgress = 0;

// ===== START PROCESSING =====
function startProcessing() {
  processStep(0);
}

function processStep(index) {
  if (index >= steps.length) {
    onAllComplete();
    return;
  }

  const step = steps[index];
  const stepEl = document.getElementById(`proc-step-${index}`);
  const timeEl = document.getElementById(`time-${index}`);

  // Mark as active
  stepEl.classList.add('active');
  stepEl.classList.remove('completed');

  // Animate progress for this step
  const stepWeight = step.duration / totalDuration;
  const startProgress = overallProgress;
  const targetProgress = startProgress + stepWeight * 100;
  const startTime = Date.now();

  // Update step timer
  let timerInterval = setInterval(() => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    timeEl.textContent = elapsed + 's';
  }, 100);

  // Animate progress
  let progressInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const ratio = Math.min(elapsed / step.duration, 1);
    const currentProgress = startProgress + ratio * stepWeight * 100;

    progressFill.style.width = currentProgress + '%';
    progressPercent.textContent = Math.floor(currentProgress) + '%';

    if (ratio >= 1) {
      clearInterval(progressInterval);
      clearInterval(timerInterval);

      overallProgress = targetProgress;

      // Mark completed
      stepEl.classList.remove('active');
      stepEl.classList.add('completed');

      // Replace icon with check
      const iconEl = stepEl.querySelector('.proc-step-icon');
      iconEl.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

      // Final time
      const finalTime = (step.duration / 1000).toFixed(1);
      timeEl.textContent = finalTime + 's';

      // Next step after small delay
      setTimeout(() => processStep(index + 1), 300);
    }
  }, 50);
}

function onAllComplete() {
  progressFill.style.width = '100%';
  progressPercent.textContent = '100%';

  // Store results data
  sessionStorage.setItem('pp_processed', 'true');

  // Show done
  setTimeout(() => {
    doneSection.classList.add('visible');
  }, 400);
}

// ===== START ON LOAD =====
setTimeout(startProcessing, 800);
