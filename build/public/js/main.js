// public/js/main.js
// Toggles the mobile navigation menu.

const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');

const closeNav = () => {
  primaryNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
};

const toggleNav = () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
};

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', toggleNav);

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) {
      closeNav();
    }
  });
}
