import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('.gallery');

const galleryItemList = makeGalleryList(galleryItems);
gallery.insertAdjacentHTML('beforeend', galleryItemList);

function makeGalleryList(images) {
  return images
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`,
    )
    .join('');
}

gallery.addEventListener('click', onMakeOriginalImage);
function onMakeOriginalImage(event) {
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  resetDefualtSettings(event);

  const originSizezImages = event.target.dataset.source;
  createLightBoxEl(originSizezImages);
}

function resetDefualtSettings(event) {
  event.preventDefault();
}

function createLightBoxEl(image) {
  const instance = basicLightbox.create(
    `
      <img src= "${image}" width = '800' heigth = "600"/>`,
  );

  instance.show();
  window.addEventListener('keydown', closeModal);

  function closeModal(event) {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeModal);
    }
  }
}
