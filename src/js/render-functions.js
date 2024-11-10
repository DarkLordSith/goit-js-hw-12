import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(images) {
  const gallery = document.getElementById('gallery');

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <a href="${largeImageURL}" class="gallery-item">
      <img src="${webformatURL}" alt="${tags}" />
      <div class="info">
        <p class="info-text">Likes: ${likes}</p>
        <p class="info-text">Views: ${views}</p>
        <p class="info-text">Comments: ${comments}</p>
        <p class="info-text">Downloads: ${downloads}</p>
      </div>
    </a>
  `
    )
    .join('');

  gallery.innerHTML = markup;

  const lightbox = new SimpleLightbox('.gallery-item');
  lightbox.refresh();
}
