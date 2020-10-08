import images from './images.js';

const refs = {
    galleryContainer: document.querySelector('.js-gallery'),
    galleryLightbox: document.querySelector('.lightbox'),
    btnCloseModal: document.querySelector('[data-action="close-lightbox"]'),
    closeModalOverlay: document.querySelector('.lightbox__overlay'),
};
const createImg = (item, parent) => {
    const { preview, original, description } = item;
    const imgEl = document.createElement('img');
    imgEl.classList.add('gallery__image');
    imgEl.src = preview;
    imgEl.dataset.source = original;
    imgEl.alt = description;

    parent.appendChild(imgEl);
};

const createLink = (item, parent) => {
    const { original } = item;
    const linkEl = document.createElement('a');
    linkEl.classList.add('gallery__link');
    linkEl.href = original;

    createImg(item, linkEl);

    parent.appendChild(linkEl);
};

const createLi = item => {
    const liEl = document.createElement('li');
    liEl.classList.add('gallery__item');
    createLink(item, liEl);
    return liEl;
};

const renderGalleryMarkUp = arrey => {
    const items = arrey.map(item => createLi(item));

    refs.galleryContainer.append(...items);
};
renderGalleryMarkUp(images);

refs.galleryContainer.addEventListener('click', onGalleryContainerClick);
refs.btnCloseModal.addEventListener('click', onCloseModal);
refs.closeModalOverlay.addEventListener('click', onOverlayClick);

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

function clearGalleryLightbox() {
    refs.galleryLightbox.removeAttribute('src');
    refs.galleryLightbox.removeAttribute('alt');
}
function onRemoveClassList() {
    refs.galleryLightbox.classList.remove('is-open');
    clearGalleryLightbox();
}

function onCloseModal(event) {
    window.removeEventListener('keydown', onEscKeydown);
    if (event.target.nodeName === 'I' || event.target.nodeName === 'BUTTON') {
        onRemoveClassList();
    }
}

function onOverlayClick(event) {
    if (event.currentTarget === event.target) {
        refs.galleryLightbox.classList.remove('is-open');
    }
}

function onEscKeydown(event) {
    console.log(event.code);
    if (event.code === 'Escape') {
        refs.galleryLightbox.classList.remove('is-open');
    }
}
