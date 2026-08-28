const toast = document.getElementById('toast');
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

document.getElementById('shareBtn').addEventListener('click', async () => {
  const data = { title: 'Ridh Profile', text: 'Check out Ridh’s profile', url: location.href };
  try {
    if (navigator.share) await navigator.share(data);
    else { await navigator.clipboard.writeText(location.href); showToast('Profile link copied'); }
  } catch (_) {}
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('.link').forEach(link => {
  link.addEventListener('click', () => showToast(`Opening ${link.textContent.trim().replace('↗','')}`));
});
