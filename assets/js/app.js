(() => {
  'use strict';

  const SOUND_PATH = 'assets/audio/skr-intro.mp3';
  const INTRO_LENGTH = 3500;

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

  // Original cinematic sound. Browsers require a user gesture before audio can play.
  let sharedAudio = document.querySelector('[data-intro-audio]');
  const getAudio = () => {
    if (!sharedAudio) {
      sharedAudio = new Audio(SOUND_PATH);
      sharedAudio.preload = 'auto';
    }
    sharedAudio.volume = 0.78;
    return sharedAudio;
  };

  const playIntroSound = () => {
    const audio = getAudio();
    audio.currentTime = 0;
    return audio.play();
  };

  document.querySelectorAll('[data-sound-replay]').forEach((button) => {
    button.addEventListener('click', () => {
      playIntroSound().then(() => {
        button.classList.add('is-playing');
        button.setAttribute('aria-label', 'Cinematic intro sound is playing');
        window.setTimeout(() => {
          button.classList.remove('is-playing');
          button.setAttribute('aria-label', 'Replay cinematic intro sound');
        }, INTRO_LENGTH);
      }).catch(() => {
        button.setAttribute('aria-label', 'Audio could not be played');
      });
    });
  });

  const enterOverlay = document.querySelector('[data-enter]');
  const intro = document.querySelector('[data-intro]');
  const profileGate = document.querySelector('[data-profile-gate]');
  const skipIntro = document.querySelector('[data-skip-intro]');

  if (enterOverlay && intro && profileGate) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let started = false;

    const revealProfiles = () => {
      intro.classList.add('intro--done');
      profileGate.classList.add('is-visible');
      profileGate.removeAttribute('aria-hidden');
      document.body.classList.remove('landing-locked');
      window.setTimeout(() => profileGate.querySelector('a')?.focus({ preventScroll: true }), 100);
    };

    const startExperience = () => {
      if (started) return;
      started = true;
      enterOverlay.classList.add('is-hidden');
      intro.classList.add('intro--playing');
      playIntroSound().catch(() => {});
      window.setTimeout(revealProfiles, reducedMotion ? 80 : INTRO_LENGTH);
    };

    enterOverlay.addEventListener('click', startExperience);
    enterOverlay.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        startExperience();
      }
    });

    skipIntro?.addEventListener('click', (event) => {
      event.preventDefault();
      started = true;
      enterOverlay.classList.add('is-hidden');
      const audio = getAudio();
      audio.pause();
      revealProfiles();
      profileGate.scrollIntoView();
    });

    document.querySelectorAll('[data-profile-link]').forEach((card) => {
      card.addEventListener('click', (event) => {
        event.preventDefault();
        const href = card.getAttribute('href');
        card.classList.add('is-selected');
        window.setTimeout(() => {
          window.location.href = href;
        }, reducedMotion ? 0 : 260);
      });
    });
  }
})();
