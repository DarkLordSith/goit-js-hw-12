import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const loaderMoreBtn = document.getElementById('load-more-btn');

let page = 1;
let query = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = form.elements.query.value.trim();
  page = 1;

  if (!query) {
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
  loaderMoreBtn.classList.add('hidden');
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page);
    renderGallery(data.hits);
    if (data.hits.length === 15) {
      loaderMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Error loading more images:', error);
    iziToast.error({
      position: 'topRight',
      message: 'Failed to load images. Try again.',
      messageSize: '16',
      backgroundColor: '#ef4040',
      messageColor: '#fafafb',
      maxWidth: '432px',
      messageLineHeight: '88px',
    });
  } finally {
    loader.classList.add('hidden');
  }
});

loaderMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.classList.remove('hidden');
  document.querySelector('.loader').style.top = '96%';
  loaderMoreBtn.classList.add('hidden');

  try {
    const data = await fetchImages(query, page);
    renderGallery(data.hits);

    if (data.hits.length < 15) {
      loaderMoreBtn.classList.add('hidden');
      iziToast.info({
        position: 'topRight',
        message: 'No more images to load.',
        messageSize: '16',
        backgroundColor: '#ef4040',
        messageColor: '#fafafb',
        maxWidth: '432px',
        messageLineHeight: '88px',
      });
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Failed to load images. Try again.',
      messageSize: '16',
      backgroundColor: '#ef4040',
      messageColor: '#fafafb',
      maxWidth: '432px',
      messageLineHeight: '88px',
    });
  } finally {
    loader.classList.add('hidden');
    loaderMoreBtn.classList.remove('hidden');
  }
});
