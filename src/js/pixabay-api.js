import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '46873247-b56a65fb4c08f29194ce1856e';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;

  try {
    console.log('Fetching URL:', url); // Лог URL для проверки корректности
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch images');

    const data = await response.json();
    if (data.hits.length === 0) {
      iziToast.info({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageSize: '16',
        backgroundColor: '#ef4040',
        messageColor: '#fafafb',
        maxWidth: '432px',
        messageLineHeight: '88px',
      });
    }
    return data;
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Failed to fetch images from Pixabay API',
      backgroundColor: '#ef4040',
      messageColor: '#fafafb',
    });
    throw error;
  }
}
