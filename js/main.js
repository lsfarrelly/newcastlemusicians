/* ============================================================
   main.js — shared utilities across all pages
   ============================================================ */

/**
 * Build a band card HTML string from a band object.
 * Used on homepage (featured) and directory.
 */
function bandCard(band) {
  const genres = (band.genre || []).map(g => `<span class="genre-tag">${g}</span>`).join('');
  const photo = band.photo
    ? `<img class="band-card-img" src="${band.photo}" alt="${band.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">`
    : '';
  const placeholder = `<div class="band-card-img-placeholder" ${band.photo ? 'style="display:none;"' : ''}>🎸</div>`;

  return `
    <div class="band-card" onclick="window.location.href='profile.html?id=${band.id}'">
      ${photo}${placeholder}
      <div class="band-card-body">
        <div class="band-card-name">${band.name}</div>
        <div class="band-card-location">📍 ${band.location}</div>
        <div class="band-card-bio">${band.bio}</div>
        <div class="band-card-footer">
          <div class="genre-tags">${genres}</div>
          <span class="text-muted" style="font-size:0.8rem;">${band.feeRange || ''}</span>
        </div>
      </div>
    </div>`;
}

// Expose globally
window.bandCard = bandCard;
