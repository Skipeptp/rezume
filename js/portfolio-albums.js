(function(){

  // --- 1. Обложки карточек: img1 любого формата ----------------------------
  function setupAlbumCovers(){
    var cards = document.querySelectorAll('.project-card[data-album]');
    var defaultExts = ['jpg','jpeg','png','webp'];

    cards.forEach(function(card){
      var slug     = card.getAttribute('data-album');
      var coverImg = card.querySelector('.project-thumb img');
      if (!slug || !coverImg) return;

      // расширения и папка из глобального конфига
      var exts   = defaultExts;
      var folder = 'albums/' + slug;
      if (window.ALBUMS && Array.isArray(window.ALBUMS)){
        var cfg = window.ALBUMS.find(function(a){ return a.slug === slug; });
        if (cfg){
          if (Array.isArray(cfg.extensions) && cfg.extensions.length) exts = cfg.extensions;
          if (cfg.folder) folder = cfg.folder;
        }
      }

      var found = false;
      exts.forEach(function(ext){
        if (found) return;
        var test = new Image();
        var src  = folder + '/img1.' + ext;
        test.onload = function(){
          if (found) return;
          found = true;
          coverImg.src = src;
        };
        test.src = src;
      });
    });
  }

  // --- 2. Клик по карточке -> переход в альбом -----------------------------
  function setupAlbumLinks(){
    var cards = document.querySelectorAll('.project-card[data-album]');
    cards.forEach(function(card){
      card.style.cursor = 'pointer';
      card.addEventListener('click', function(e){
        if (e.target.closest('a')) return;
        var slug = card.getAttribute('data-album');
        if (!slug) return;
        window.location.href = 'album.html?album=' + encodeURIComponent(slug);
      });
    });
  }

  setupAlbumCovers();
  setupAlbumLinks();

})();