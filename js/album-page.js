const max = album.maxImages || 200;
const basePath = (album.folder || '').replace(/\/+$/, '');
const extensions = Array.isArray(album.extensions) && album.extensions.length
  ? album.extensions
  : ['jpg','jpeg','png','webp'];

let loadedCount = 0;
let anyLoaded = false;

if (gridEl && basePath) {
  for (let i = 1; i <= max; i++) {
    (function(index){
      let foundForIndex = false;
      extensions.forEach(function(ext){
        const testImg = new Image();
        const src = basePath + '/img' + index + '.' + ext;
        testImg.src = src;
        testImg.loading = 'lazy';
        testImg.addEventListener('load', function(){
          if (foundForIndex) return; // уже добавили этот номер
          foundForIndex = true;
          anyLoaded = true;
          loadedCount++;
          // создаём карточку
          const figure = document.createElement('figure');
          figure.className = 'album-item';
          const img = document.createElement('img');
          img.src = src;
          img.loading = 'lazy';
          img.alt = album.title + ' · фото ' + index;
          img.dataset.index = String(index);
          figure.appendChild(img);
          gridEl.appendChild(figure);
        });
        testImg.addEventListener('error', function(){});
      });
    })(i);
  }

  setTimeout(function(){
    if (!anyLoaded && gridEl.childElementCount === 0) {
      const p = document.createElement('p');
      p.className = 'album-empty';
      p.textContent =
        'В этой папке пока нет файлов img1, img2… (jpg, jpeg, png, webp). Добавь изображения, и они появятся здесь автоматически.';
      gridEl.appendChild(p);
    }
  }, 1500);
}