const auth = "563492ad6f91700001000001147ce8fb19c64565a7093a3656e6d517";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

searchInput.addEventListener('input',updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

function updateInput(e){
  searchValue = e.target.value; 
}

async function fetchApi(url){
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth,
    }
  });
  const data = await dataFetch.json();
  return data;
}

function generatePhoto(data) {
  data.photos.forEach(photo => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('.gallery-img');
    galleryImg.innerHTML =  `
    <div class='gallery-info'>
      <p>${photo.photographer}</p>
      <a href='${photo.src.original}'>Download</a>
    </div>
    <img src=${photo.src.large}></img>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhoto() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1"
  const data = await fetchApi(fetchLink );
  generatePhoto(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
  const data = await fetchApi(fetchLink);
  generatePhoto(data);
}

function clear(){
  gallery.innerHTML = '';
  searchInput.value = '';
}

async function loadMore(){
  page++;
  if(currentSearch){
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePhoto(data);
}

curatedPhoto();

