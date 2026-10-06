import { galleryItems } from "./app.js";

const galleryContainer = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeLightboxBtn = document.querySelector(".lightbox__button");
const lightboxOverlay = document.querySelector(".lightbox__overlay");

const createGalleryMarkup = (items) => {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
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
};

galleryContainer.innerHTML = createGalleryMarkup(galleryItems);

galleryContainer.addEventListener("click", onGalleryClick);

const onGalleryClick = (event) => {
  event.preventDefault();

  const largeImageUrl = event.target.dataset.source;
  const imageAlt = event.target.alt;

  openLightbox(largeImageUrl, imageAlt);
};

const openLightbox = (url, alt) => {
  lightbox.classList.add("is-open");
  lightboxImage.src = url;
  lightboxImage.alt = alt;

  lightboxOverlay.addEventListener("keydown", onEscKeyPress);
  lightboxOverlay.addEventListener("click", closeLightbox);
  closeLightboxBtn.addEventListener("click", closeLightbox);
};

const closeLightbox = () => {
  lightboxOverlay.classList.remove("is-open");

  lightboxImage.src = "";
  lightboxImage.alt = ""; 

  lightboxOverlay.removeEventListener("keydown", onEscKeyPress);
  lightboxOverlay.removeEventListener("click", closeLightbox);
  closeLightboxBtn.removeEventListener("click", closeLightbox);
};

const onEscKeyPress = (event) => {
  if (event.code === "Escape") {
    closeLightbox();
  }
};
