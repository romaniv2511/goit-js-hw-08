// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryRef = document.querySelector('.gallery');

const markupGallery = createMarkup(galleryItems);

function createMarkup(set) {
    const newGalleryList = set.map(img => {
        return `<div class="gallery__item">
                    <a class="gallery__link" href="${img.original}">
                        <img
                        class="gallery__image"
                        src="${img.preview}"
                        data-source="${img.original}"
                        alt="${img.description}"
                        />
                    </a>
                </div>`
    }).join('');

    galleryRef.insertAdjacentHTML('beforeend', newGalleryList);
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionsType: "alt",
    captionDelay: 250,
    captionPosiotion: "bottom",
});

