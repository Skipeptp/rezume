(function(){

  // --- Анимация появления секций -------------------------------------------
  var sectionObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-section]').forEach(function(sec){
    sectionObserver.observe(sec);
  });

  // --- Параметры из URL ----------------------------------------------------
  var params = new URLSearchParams(window.location.search);
  var slug   = params.get('album');
  var albums = window.ALBUMS || [];
  var album  = albums.find(function(a){ return a.slug === slug; });
  if (!album && albums.length){ album = albums[0]; }

  // --- DOM ------------------------------------------------------------------
  var titleEl      = document.querySelector('[data-album-title]');
  var descEl       = document.querySelector('[data-album-description]');
  var metaCountEl  = document.querySelector('[data-album-meta-count]');
  var gridEl       = document.querySelector('[data-album-grid]');

  // --- Альбом не найден -----------------------------------------------------
  if (!album){
    if (titleEl)      titleEl.textContent = 'Альбом не найден';
    if (descEl)       descEl.textContent  = 'Проверь ссылку или вернись к портфолио.';
    if (metaCountEl)  metaCountEl.textContent = '';
    document.title = 'Альбом не найден · Karpushin Gleb';
    return;
  }

  // --- Заголовок ------------------------------------------------------------
  document.title = album.title + ' · Альбом · Karpushin Gleb';
  if (titleEl)      titleEl.textContent = album.title;
  if (descEl && album.description) descEl.textContent = album.description;

  // --- Настройки загрузки ---------------------------------------------------
  var max    = album.maxImages || 200;
  var folder = (album.folder || '').replace(/\/+$/, '');
  var exts   = (Array.isArray(album.extensions) && album.extensions.length)
                 ? album.extensions
                 : ['jpg','jpeg','png','webp'];

  var loadedCount = 0;
  var anyLoaded   = false;

  function updateMeta(){
    if (metaCountEl) metaCountEl.textContent = 'Фотографий: ' + loadedCount;
  }

  // --- Добавить карточку в сетку (без подписей) -----------------------------
  function addCard(src, index){
    if (!gridEl) return;

    var isGif = src.toLowerCase().endsWith('.gif');

    var card = document.createElement('article');
    card.className = 'album-card';

    var inner = document.createElement('div');
    inner.className = 'album-card-inner';

    var media = document.createElement('div');
    media.className = 'album-card-media';

    var img = document.createElement('img');
    img.src      = src;
    img.alt      = album.title + ' · ' + index;

    // для GIF — никакого lazy-loading и async decoding,
    // иначе браузер может заморозить анимацию до скролла
    if (!isGif) {
      img.loading  = 'lazy';
      img.decoding = 'async';
    }

    var overlay = document.createElement('div');
    overlay.className = 'album-card-overlay';

    media.appendChild(img);
    media.appendChild(overlay);

    inner.appendChild(media);
    card.appendChild(inner);

    gridEl.appendChild(card);
  }

  // --- Загрузка всех картинок -----------------------------------------------
  if (gridEl && folder){
    for (var i = 1; i <= max; i++){
      (function(index){
        var found = false;
        exts.forEach(function(ext){
          var test = new Image();
          var src  = folder + '/img' + index + '.' + ext;
          test.src = src;
          test.onload = function(){
            if (found) return;
            found       = true;
            anyLoaded   = true;
            loadedCount++;
            updateMeta();
            addCard(src, index);
          };
          test.onerror = function(){};
        });
      })(i);
    }

    // Заглушка если папка пустая
    setTimeout(function(){
      if (!anyLoaded && gridEl.childElementCount === 0){
        var p       = document.createElement('p');
        p.className = 'album-empty';
        p.textContent = 'В этой папке пока нет файлов img1, img2… (jpg, jpeg, png, webp). '
                      + 'Добавь изображения, и они появятся здесь автоматически.';
        gridEl.appendChild(p);
      }
    }, 2000);
  }

  // --- Лайтбокс ------------------------------------------------------------
  var lightbox    = document.querySelector('[data-lightbox]');
  var lightboxImg = lightbox ? lightbox.querySelector('[data-lightbox-image]') : null;

  function openLightbox(src, alt){
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    if (!lightbox || !lightboxImg) return;
    lightbox.setAttribute('hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  // кликаем по всей карточке, а не только по img
  if (gridEl){
    gridEl.addEventListener('click', function(e){
      var card = e.target.closest('.album-card');
      if (!card) return;
      var img = card.querySelector('img');
      if (!img) return;
      openLightbox(img.src, img.alt);
    });
  }

  if (lightbox){
    lightbox.addEventListener('click', function(e){
      if (e.target.hasAttribute('data-lightbox-close') || e.target === lightbox){
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeLightbox();
  });

})();