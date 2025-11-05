<template>
  <div class="home-page page__container">
    <nav-bar />
    <main class="home-page__content">
      <HeroSlider :filmsData="releaseFilms" />
    </main>
    <Footer />
  </div>
</template>

<script>
import { getUpcomingMovies } from '@/api/movieApi';
import Footer from '@/components/sections/Footer.vue';


import NavBar from "@/components/sections/NavBar.vue";
import HeroSlider from "@/components/sliders/HeroSlider.vue";

export default {
  components: {
    NavBar,
    HeroSlider,
    Footer,
  },
  data() {
    return {
      releaseFilms: [],
    }
  },
  mounted() {
    this.loadReleaseFilms();
  },
  methods: {
    filterValidMovies(movies) {
      return movies.filter((movie) => {
        const hasImage = movie.backdrop_path;
        const hasTitle = movie.original_title || movie.original_name;
        const hasDescription = movie.overview;
        return hasImage && hasTitle && hasDescription;
      });
    },

    async loadReleaseFilms() {
      try {
        const response = await getUpcomingMovies();
        if (!response || !Array.isArray(response)) {
          console.error("Invalid data from API");
          return;
        }
        const filtered = this.filterValidMovies(response);
        this.releaseFilms = filtered.slice(0, 10);
      } catch (error) {
        console.error("Error loading upcoming movies:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
