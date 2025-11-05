const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_TMDB_KEY;

// Базова конфігурація запиту
const requestConfig = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

// Функція для побудови URL з параметрами
function buildURL(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  const defaultParams = { language: "en-US", page: 1 };
  
  Object.entries({ ...defaultParams, ...params }).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
}

// Загальна функція для API запитів
async function apiRequest(endpoint, params = {}) {
  const url = buildURL(endpoint, params);
  
  try {
    const response = await fetch(url, requestConfig);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Request failed [${endpoint}]:`, error);
    throw error;
  }
}

// Отримання списку фільмів які скоро вийдуть
export async function getUpcomingMovies() {
  const data = await apiRequest("movie/upcoming");
  return data.results;
}

// Отримання популярних фільмів
export async function getPopularMovies() {
  const data = await apiRequest("movie/popular");
  return data.results;
}

// Отримання популярних серіалів
export async function getPopularSeries() {
  const data = await apiRequest("tv/popular");
  return data.results;
}

// Список жанрів
export async function getGenreMovies() {
  const data = await apiRequest("genre/movie/list");
  return data.genres;
}

// Пошук фільмів з фільтрацією
export async function getDiscoverMovies(filters = {}) {
  const defaultFilters = {
    include_adult: false,
    include_video: false,
    sort_by: "popularity.desc",
  };
  
  const data = await apiRequest("discover/movie", {
    ...defaultFilters,
    ...filters,
  });
  
  return {
    response: data.results,
    total_pages: data.total_pages,
    total_results: data.total_results,
  };
}

// Детальна інформація про фільм
export async function getDetailsMovies(movie_id) {
  return await apiRequest(`movie/${movie_id}`);
}

// Пошук фільмів за назвою
export async function searchMovies(query) {
  return await apiRequest("search/movie", { query });
}