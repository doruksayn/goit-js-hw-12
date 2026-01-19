import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '54219478-952de2791b1b40d9ff96d9b02';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 42;

const searchForm = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = null;
let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

searchForm.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearchSubmit(event) {
  event.preventDefault();

  const searchQuery = event.target.elements.searchQuery.value.trim();

  if (!searchQuery) {
    return;
  }

  // Reset for new search
  currentQuery = searchQuery;
  currentPage = 1;
  galleryContainer.innerHTML = '';
  hideLoadMoreBtn();

  await fetchAndRenderImages();
}

async function onLoadMore() {
  currentPage += 1;
  await fetchAndRenderImages();
}

async function fetchAndRenderImages() {
  showLoader();

  try {
    const data = await searchImages(currentQuery, currentPage);

    hideLoader();

    if (data.hits.length === 0) {
      if (currentPage === 1) {
        showErrorNotification(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      return;
    }

    totalHits = data.totalHits;
    renderGallery(data.hits);

    if (lightbox === null) {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      lightbox.refresh();
    }

    const totalLoadedImages = currentPage * PER_PAGE;
    if (totalLoadedImages < totalHits) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
      if (currentPage > 1) {
        showInfoNotification(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }

    if (currentPage > 1) {
      smoothScroll();
    }
  } catch (error) {
    hideLoader();
    console.error('Error fetching images:', error);
    showErrorNotification(
      'An error occurred while fetching images. Please try again!'
    );
  }
}

async function searchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: PER_PAGE,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}

function renderGallery(images) {
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
    <div class="gallery-item">
      <a href="${largeImageURL}" class="gallery-link">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </div>
        <div class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <span>${comments}</span>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <span>${downloads}</span>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function smoothScroll() {
  const { height: cardHeight } =
    galleryContainer.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}

function showErrorNotification(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    timeout: 5000,
  });
}

function showInfoNotification(message) {
  iziToast.info({
    title: 'Info',
    message: message,
    position: 'topRight',
    timeout: 5000,
  });
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}
