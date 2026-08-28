const toast = document.getElementById('toast');
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.getElementById('shareBtn').addEventListener('click', async () => {
  const data = { title: 'Ridh — Profile', text: 'Check out Ridh’s profile', url: location.href };
  try {
    if (navigator.share) await navigator.share(data);
    else if (navigator.clipboard) { await navigator.clipboard.writeText(location.href); showToast('Profile link copied'); }
    else showToast('Copy this page URL to share');
  } catch (_) {}
});

document.querySelectorAll('.link').forEach(link => {
  link.addEventListener('click', () => {
    const name = link.querySelector('strong')?.textContent || 'link';
    showToast(`Opening ${name}`);
  });
});

// Subtle entrance animation without a framework.
requestAnimationFrame(() => document.querySelector('.profile-card')?.classList.add('ready'));
