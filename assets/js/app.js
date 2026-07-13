(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menu.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    menu.addEventListener('click', (event) => {
      if (event.target.matches('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      }
    });
  }

  document.querySelectorAll('[data-rail]').forEach((rail) => {
    const track = rail.querySelector('.rail-track');
    const left = rail.querySelector('[data-rail-left]');
    const right = rail.querySelector('[data-rail-right]');
    const amount = () => Math.max(300, track.clientWidth * 0.78);
    left?.addEventListener('click', () => track.scrollBy({ left: -amount(), behavior: 'smooth' }));
    right?.addEventListener('click', () => track.scrollBy({ left: amount(), behavior: 'smooth' }));
  });

  const modal = document.querySelector('[data-modal]');
  const title = modal?.querySelector('[data-modal-title]');
  const description = modal?.querySelector('[data-modal-description]');
  const tech = modal?.querySelector('[data-modal-tech]');
  const link = modal?.querySelector('[data-modal-link]');
  const close = modal?.querySelector('[data-modal-close]');

  const openProject = (card) => {
    if (!modal || typeof modal.showModal !== 'function') return;
    title.textContent = card.dataset.title || 'Project';
    description.textContent = card.dataset.description || '';
    tech.textContent = card.dataset.tech || '';
    link.href = card.dataset.link || '#';
    modal.showModal();
  };

  document.querySelectorAll('[data-project]').forEach((card) => {
    card.addEventListener('click', () => openProject(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject(card);
      }
    });
  });

  close?.addEventListener('click', () => modal.close());
  modal?.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) modal.close();
  });

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const intro = document.querySelector('.intro');
  if (intro) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(() => intro.classList.add('intro--done'), reduced ? 0 : 1500);
  }
})();
