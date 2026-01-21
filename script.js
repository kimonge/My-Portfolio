// -------------------- Mobile Menu --------------------
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

// Toggle menu
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

// -------------------- Dark Mode with localStorage --------------------
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});

// -------------------- Animate Progress Bars on Scroll --------------------
const progressBars = document.querySelectorAll('.progress-bar');

function animateProgress() {
  progressBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    const target = parseInt(bar.dataset.progress);

    // Check if bar is visible and not animated yet
    if (rect.top < window.innerHeight - 50 && !bar.dataset.animated) {
      bar.dataset.animated = true;
      let width = 0;

      const interval = setInterval(() => {
        if (width >= target) {
          clearInterval(interval);
        } else {
          width++;
          bar.style.width = width + '%';
          bar.textContent = width + '%';
          bar.setAttribute('aria-valuenow', width);
        }
      }, 15);
    }
  });
}

// Animate bars on scroll and page load
window.addEventListener('scroll', animateProgress);
window.addEventListener('load', animateProgress);
