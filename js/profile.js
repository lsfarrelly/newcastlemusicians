/* ============================================================
   profile.js — load and render a single artist profile
   ============================================================ */

(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    window.location.href = 'directory.html';
    return;
  }

  fetch('bands.json')
    .then(r => r.json())
    .then(bands => {
      const band = bands.find(b => b.id === id);
      if (!band) {
        window.location.href = 'directory.html';
        return;
      }

      // Update page title
      document.title = band.name + ' — Newcastle Musicians';

      renderHero(band);
      renderEmbeds(band);
      renderBooking(band);
    })
    .catch(() => {
      document.getElementById('profile-hero-content').innerHTML = '<p class="text-muted">Could not load profile.</p>';
    });

  function renderHero(band) {
    const genres = (band.genre || []).map(g => `<span class="genre-tag">${g}</span>`).join('');

    const socials = [];
    if (band.spotify)    socials.push(`<a href="${band.spotify}" class="social-link" target="_blank" rel="noopener">🎵 Spotify</a>`);
    if (band.soundcloud) socials.push(`<a href="${band.soundcloud}" class="social-link" target="_blank" rel="noopener">☁️ SoundCloud</a>`);
    if (band.instagram)  socials.push(`<a href="${band.instagram}" class="social-link" target="_blank" rel="noopener">📸 Instagram</a>`);
    if (band.facebook)   socials.push(`<a href="${band.facebook}" class="social-link" target="_blank" rel="noopener">👥 Facebook</a>`);

    const photoEl = band.photo
      ? `<img class="profile-photo" src="${band.photo}" alt="${band.name}" onerror="this.style.display='none';document.getElementById('profile-photo-placeholder').style.display='flex';">
         <div class="profile-photo-placeholder" id="profile-photo-placeholder" style="display:none;">🎸</div>`
      : `<div class="profile-photo-placeholder" id="profile-photo-placeholder">🎸</div>`;

    document.getElementById('profile-hero-content').innerHTML = `
      <div class="profile-hero-inner">
        <div>${photoEl}</div>
        <div>
          <h1 class="profile-name">${band.name}</h1>
          <div class="profile-location">📍 ${band.location}</div>
          ${band.feeRange ? `<span class="profile-fee">💰 ${band.feeRange}</span>` : ''}
          <div class="genre-tags" style="margin-bottom:1.25rem;">${genres}</div>
          <p class="profile-bio">${band.bio}</p>
          <div class="profile-socials">${socials.join('')}</div>
          ${band.bookingEmail
            ? `<a href="mailto:${band.bookingEmail}" class="btn btn-primary">📩 Enquire About Booking</a>`
            : ''}
        </div>
      </div>`;
  }

  function renderEmbeds(band) {
    const embeds = [];

    if (band.youtube) {
      embeds.push(`
        <div class="embed-wrap">
          <div class="embed-label">▶ YouTube</div>
          <iframe src="${band.youtube}" height="315" allowfullscreen loading="lazy" title="YouTube video"></iframe>
        </div>`);
    }

    if (band.spotify) {
      // Convert artist URL to embed URL
      const embedUrl = band.spotify.replace('open.spotify.com/artist/', 'open.spotify.com/embed/artist/');
      embeds.push(`
        <div class="embed-wrap">
          <div class="embed-label">🎵 Spotify</div>
          <iframe src="${embedUrl}" height="152" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>`);
    }

    if (embeds.length) {
      const section = document.getElementById('media-section');
      section.style.display = '';
      document.getElementById('embed-grid').innerHTML = embeds.join('');
    }
  }

  function renderBooking(band) {
    const section = document.getElementById('booking-section');
    const avail = document.getElementById('avail-box');
    const cta = document.getElementById('booking-cta');

    if (band.availability || band.bookingEmail) {
      section.style.display = '';
      avail.textContent = band.availability || 'Contact for availability.';
      if (band.bookingEmail) {
        cta.innerHTML = `
          <a href="mailto:${band.bookingEmail}" class="btn btn-primary">📩 Send Booking Enquiry</a>
          <p class="form-note mt-2">Email goes directly to the artist — no middleman.</p>`;
      }
    }
  }
})();
