// ===== UPLOAD PAGE JS =====

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');
const filePreview = document.getElementById('file-preview');
const fileName = document.getElementById('file-name');
const fileSize = document.getElementById('file-size');
const fileRemove = document.getElementById('file-remove');
const uploadProgress = document.getElementById('upload-progress');
const progressPercent = document.getElementById('progress-percent');
const progressBarFill = document.getElementById('progress-bar-fill');
const uploadComplete = document.getElementById('upload-complete');
const uploadBtn = document.getElementById('upload-btn');
const resetBtn = document.getElementById('reset-btn');

let selectedFile = null;

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

// ===== DRAG & DROP =====
dropzone.addEventListener('click', () => fileInput.click());
browseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  fileInput.click();
});

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('drag-over');
});

dropzone.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dropzone.classList.remove('drag-over');
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('drag-over');
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFile(files[0]);
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    handleFile(fileInput.files[0]);
  }
});

// ===== HANDLE FILE SELECTION =====
function handleFile(file) {
  // Validate type
  if (file.type !== 'application/pdf') {
    showToast('Only PDF files are supported', 'error');
    return;
  }

  // Validate size (50MB)
  if (file.size > 50 * 1024 * 1024) {
    showToast('File exceeds 50 MB limit', 'error');
    return;
  }

  selectedFile = file;
  fileName.textContent = file.name;
  fileSize.textContent = formatFileSize(file.size);
  filePreview.classList.add('visible');
  uploadBtn.disabled = false;
  resetBtn.style.display = 'inline-flex';
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ===== REMOVE FILE =====
fileRemove.addEventListener('click', resetUpload);
resetBtn.addEventListener('click', resetUpload);

function resetUpload() {
  selectedFile = null;
  fileInput.value = '';
  filePreview.classList.remove('visible');
  uploadProgress.classList.remove('visible');
  uploadComplete.classList.remove('visible');
  uploadBtn.disabled = true;
  uploadBtn.style.display = 'inline-flex';
  resetBtn.style.display = 'none';
  progressBarFill.style.width = '0%';
  progressPercent.textContent = '0%';
}

// ===== UPLOAD SIMULATION =====
uploadBtn.addEventListener("click", async () => {
  if (!selectedFile) return;

  uploadBtn.disabled = true;
  uploadProgress.classList.add("visible");

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await fetch("https://patternpulse-ai.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Server returned " + response.status);
    }

    const data = await response.json();

    // Save backend response
    sessionStorage.setItem("pp_result", JSON.stringify(data));
    sessionStorage.setItem("pp_filename", data.filename);

    progressBarFill.style.width = "100%";
    progressPercent.textContent = "100%";

    uploadProgress.querySelector(".progress-label").textContent =
      "Upload complete";

    uploadComplete.classList.add("visible");

    setTimeout(() => {
      window.location.href = "processing.html";
    }, 1500);

    } catch (error) {

    uploadBtn.disabled = false;
}
});


// ===== TOAST NOTIFICATION =====
function showToast(message, type) {
  // Remove existing toast
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
