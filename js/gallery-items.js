import images from './images.js';

const refs = {
    galleryContainer: document.querySelector('.js-gallery'),
    galleryLightbox: document.querySelector('.lightbox'),
    btnCloseModal: document.querySelector('[data-action="close-lightbox"]'),
    closeModalOverlay: document.querySelector('.lightbox__overlay'),
};
const galleryMarkup = createGallery(images);

refs.galleryContainer.addEventListener('click', onGalleryContainerClick);
refs.btnCloseModal.addEventListener('click', onCloseModal);
refs.closeModalOverlay.addEventListener('click', onOverlayClick);
refs.galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createGallery(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>
    `;
    })
    .join("");
}

function onGalleryContainerClick(event) {
    window.addEventListener('keydown', onEscKeydown);
    event.preventDefault();
    if (event.target.nodeName === 'IMG') {
        refs.galleryLightbox.classList.add('is-open');
        refs.galleryLightbox.querySelector('.lightbox__image').src =
            event.target.dataset.source;
        refs.galleryLightbox.querySelector('.lightbox__image').alt =
            event.target.dataset.alt;
    }
}

function onRemoveClassList() {
    refs.galleryLightbox.classList.remove('is-open');
    refs.galleryLightbox.querySelector('.lightbox__image').removeAttribute('src');
    refs.galleryLightbox.querySelector('.lightbox__image').removeAttribute('alt');
}

function onCloseModal(event) {
    window.removeEventListener('keydown', onEscKeydown);
    if (event.target.nodeName === 'I' || event.target.nodeName === 'BUTTON') {
        onRemoveClassList();
    }
}

function onOverlayClick(event) {
    if (event.currentTarget === event.target) {
       onRemoveClassList()
    }
}

function onEscKeydown(event) {
    if (event.code === 'Escape') {
       onRemoveClassList()
    }
}