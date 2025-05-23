const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9f68d563d5c04a0454de02560c7386d2";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=9f68d563d5c04a0454de02560c7386d2&query=";

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

// Get Movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results)
  console.log(data.results);
}

function displayMovies(movies) {
  main.innerHTML = '';
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const moviesElement = document.createElement('div');
    moviesElement.classList.add('movie');
    moviesElement.innerHTML = `
      <img src="${IMAGE_PATH + poster_path}" alt="${title}" >
      <div class='movie-info'>
        <h3>${title}</h3>
        <span class="${getClassesByRating(vote_average)}"> ${vote_average}</span>
        <div class='overview'>
          <h3>Overview</h3>
          ${overview}
        </div>
      </div>
    `
    main.appendChild(moviesElement)
  })
}

function getClassesByRating(rating) {
  if (rating >= 8) {
    return 'green'
  } else if (rating >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchValue = search.value.trim(); // Trim to remove extra spaces
  if (searchValue && searchValue !== '') {
    const url = SEARCH_URL + searchValue;
    try {
      const res = await fetch(url);
      const data = await res.json();
      displayMovies(data.results);
      search.value = ''; // Clear search input after displaying results
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  } else {
    // Reload the page or show an error message
    window.location.reload();
  }
});