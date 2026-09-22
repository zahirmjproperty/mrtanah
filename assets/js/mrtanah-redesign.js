(() => {
  const header = document.querySelector('[data-site-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-primary-nav]');
  const advancedButton = document.querySelector('[data-advanced-toggle]');
  const advancedFilters = document.querySelector('[data-advanced-filters]');
  const searchForm = document.querySelector('[data-property-search]');
  const resultsStatus = document.querySelector('[data-results-status]');

  const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);
  setHeaderState();
  addEventListener('scroll', setHeaderState, { passive: true });

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Buka menu');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    nav?.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  advancedButton?.addEventListener('click', () => {
    const open = advancedButton.getAttribute('aria-expanded') !== 'true';
    advancedButton.setAttribute('aria-expanded', String(open));
    if (advancedFilters) advancedFilters.hidden = !open;
  });

  // Restore search controls from the URL without changing the authoritative data source.
  if (searchForm) {
    const params = new URLSearchParams(location.search);
    [...searchForm.elements].forEach(control => {
      if (!control.name || !params.has(control.name)) return;
      if (control.type === 'radio') control.checked = control.value === params.get(control.name);
      else control.value = params.get(control.name) || '';
    });

    searchForm.addEventListener('reset', () => {
      requestAnimationFrame(() => {
        const url = new URL(searchForm.action, location.origin);
        history.replaceState({}, '', url.pathname);
      });
    });
  }

  // Local-only favourites: no personal data leaves the device.
  const storageKey = 'mr-tanah-favourites';
  let favourites = new Set();
  try { favourites = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]')); } catch (_) {}

  document.querySelectorAll('[data-favourite]').forEach(button => {
    const id = button.dataset.favourite;
    const render = () => {
      const saved = favourites.has(id);
      button.setAttribute('aria-pressed', String(saved));
      button.textContent = saved ? '♥' : '♡';
    };
    render();
    button.addEventListener('click', () => {
      favourites.has(id) ? favourites.delete(id) : favourites.add(id);
      localStorage.setItem(storageKey, JSON.stringify([...favourites]));
      render();
      if (resultsStatus) resultsStatus.textContent = favourites.has(id) ? 'Listing disimpan.' : 'Listing dibuang daripada simpanan.';
    });
  });

  // Progressive enhancement for real listing data supplied by the production site.
  // Hermes should replace this event hook with the existing data/filter controller.
  document.addEventListener('mrtanah:results-updated', event => {
    if (!resultsStatus) return;
    const count = Number(event.detail?.count || 0);
    resultsStatus.textContent = `${count} listing dijumpai.`;
  });
})();

