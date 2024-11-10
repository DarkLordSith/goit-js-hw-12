import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = form.elements.query.value.trim();
  if (query === '') {
    iziToast.warning({
      position: 'topRight',
      message: 'Please enter a search query.',
      messageSize: '16',
      backgroundColor: '#ef4040',
      messageColor: '#fafafb',
      maxWidth: '432px',
      messageLineHeight: '88px',
    });
    return;
  }

  gallery.innerHTML = '';
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query);
    renderGallery(data.hits);
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Try again.',
    });
  } finally {
    loader.classList.add('hidden');
  }
});
