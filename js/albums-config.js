// albums-config.js
//
// Каждый объект - один альбом.
//   slug        - уникальный id (используется в URL ?album=<slug>
//                 и в data-album на карточках главной)
//   title       - заголовок на странице альбома
//   description - подзаголовок
//   folder      - путь к папке с картинками (относительно корня сайта)
//   extensions  - список форматов, которые скрипт пробует для каждого imgN
//                 первый найденный используется, остальные игнорируются
//   maxImages   - до какого номера искать (img1 ... imgN)
//
// Чтобы добавить новый альбом:
//   1. Допиши объект сюда
//   2. Создай папку albums/<slug>/
//   3. Положи туда файлы img1.*, img2.*, img3.* и т.д.
//   4. Добавь карточку в resume-final.html с data-album="<slug>"

window.ALBUMS = [
  {
    slug:        'logo',
    title:       'Логотипы',
    description: 'Подборка логотипов и знаков.',
    folder:      'albums/logo',
    extensions:  ['png', 'jpg', 'jpeg', 'webp'],
    maxImages:   200
  },
  {
    slug:        'infographic',
    title:       'Инфографика',
    description: 'Инфографика, схемы и визуализации.',
    folder:      'albums/infographic',
    extensions:  ['jpg', 'jpeg', 'png', 'webp'],
    maxImages:   200
  },
  {
    slug:        'business',
    title:       'Бизнес-кейсы',
    description: 'Презентации и материалы для бизнеса.',
    folder:      'albums/business',
    extensions:  ['jpg', 'jpeg', 'png', 'webp'],
    maxImages:   200
  },
  {
    slug:        'logo2',
    title:       'Логотипы · серия 2',
    description: 'Дополнительная подборка логотипов.',
    folder:      'albums/logo2',
    extensions:  ['jpg', 'jpeg', 'png', 'webp'],
    maxImages:   200
  }
];