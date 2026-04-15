(function(){
  const cards = document.querySelectorAll('.project-card[data-album]');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const slug = card.getAttribute('data-album');
      if (!slug) return;
      const url = 'album.html?album=' + encodeURIComponent(slug);
      window.location.href = url;
    });
  });
})();