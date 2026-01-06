// theme toggle
const toggle = document.getElementById('theme-toggle');
const html   = document.documentElement;
const saved  = localStorage.getItem('theme');
if (saved) html.classList.toggle('dark', saved === 'dark');
toggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});
// dynamic year

document.getElementById('year').textContent = new Date().getFullYear();

// copy coupon
document.getElementById('copy-btn').addEventListener('click', () => {
  navigator.clipboard.writeText('SILVAR').then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 1500);
  });
});

