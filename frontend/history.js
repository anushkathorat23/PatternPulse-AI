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

// Search & Filter
const searchInput = document.getElementById('search-input');
const tableBody = document.querySelector('#history-table tbody');
const rows = tableBody ? Array.from(tableBody.querySelectorAll('tr')) : [];

function applyFilters() {
  const query = searchInput ? searchInput.value.toLowerCase() : '';
  const statusFilter = document.getElementById('filter-status').value;
  const disciplineFilter = document.getElementById('filter-discipline').value;

  rows.forEach(row => {
    const filename = row.cells[0].textContent.toLowerCase();
    const discipline = row.cells[1].textContent.toLowerCase().trim();
    const statusEl = row.querySelector('.history-status');
    const status = statusEl ? statusEl.textContent.toLowerCase().trim() : '';

    let show = true;
    if (query && !filename.includes(query)) show = false;
    if (statusFilter !== 'all' && !status.includes(statusFilter)) show = false;
    if (disciplineFilter !== 'all' && !discipline.includes(disciplineFilter)) show = false;

    row.style.display = show ? '' : 'none';
  });
}

if (searchInput) searchInput.addEventListener('input', applyFilters);
document.querySelectorAll('.filter-select').forEach(sel => {
  sel.addEventListener('change', applyFilters);
});

// Pagination
document.querySelectorAll('.page-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) return;
    document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
