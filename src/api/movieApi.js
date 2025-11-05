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

function buildURL(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  const defaultParams = { language: "en-US", page: 1 };
  
  Object.entries({ ...defaultParams, ...params }).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
}

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

export async function getUpcomingMovies() {
  const data = await apiRequest("movie/upcoming");
  return data.results;
}

export async function getPopularMovies() {
  const data = await apiRequest("movie/popular");
  return data.results;
}

export async function getPopularSeries() {
  const data = await apiRequest("tv/popular");
  return data.results;
}

export async function getGenreMovies() {
  const data = await apiRequest("genre/movie/list");
  return data.genres;
}

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

export async function getDetailsMovies(movie_id) {
  return await apiRequest(`movie/${movie_id}`);
}

export async function searchMovies(query) {
  return await apiRequest("search/movie", { query });
}