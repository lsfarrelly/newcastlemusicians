/* ============================================================
   directory.js — band grid + genre filtering
   ============================================================ */

(function () {
  let allBands = [];
  let activeGenre = 'all';

  function render(bands) {
    const grid = document.getElementById('band-grid');
    const empty = document.getElementById('empty-state');
    const count = document.getElementById('results-count');

    if (!bands.length) {
      grid.innerHTML = '';
      grid.classList.add('hidden');
      empty.classList.remove('hidden');
      count.textContent = '';
      return;
    }

    grid.classList.remove('hidden');
    empty.classList.add('hidden');
    grid.innerHTML = bands.map(b => bandCard(b)).join('');
    count.textContent = bands.length + ' act' + (bands.length === 1 ? '' : 's') + ' found';
  }

  function filterBands() {
    if (activeGenre === 'all') return allBands;
    return allBands.filter(b => (b.genre || []).includes(activeGenre));
  }

  // Load data
  fetch('bands.json')
    .then(r => r.json())
    .then(data => {
      allBands = data;
      render(allBands);
    })
    .catch(() => {
      document.getElementById('band-grid').innerHTML = '<p class="text-muted">Could not load artists.</p>';
    });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      activeGenre = this.dataset.genre;
      render(filterBands());
    });
  });
})();
