<template>
  <div class="home-page page__container">
    <nav-bar />
    <main class="home-page__content">
      <HeroSlider :filmsData="releaseFilms" />

      <SectionSlider :filmsData="popularFilms" sectionTitle="Popular Films"/>

      <SectionSlider :filmsData="popularSeries" sectionTitle="Popular Series"/>

      <trial-banner />
    </main>
    <app-footer />
  </div>
</template>

<script>
import {
  getUpcomingMovies,
  getPopularMovies,
  getPopularSeries,
} from "@/api/movieApi";
import AppFooter from "@/components/sections/AppFooter.vue";
import NavBar from "@/components/sections/NavBar.vue";
import TrialBanner from "@/components/sections/TrialBanner.vue";
import HeroSlider from "@/components/sliders/HeroSlider.vue";
import SectionSlider from "@/components/sliders/SectionSlider.vue";

export default {
  components: {
    NavBar,
    HeroSlider,
    SectionSlider,
    AppFooter,
    TrialBanner,
  },
  data() {
    return {
      releaseFilms: [],
      popularFilms: [],
      popularSeries: [],
    };
  },
  mounted() {
    this.loadReleaseFilms();
    this.loadPopularFilms();
    this.loadPopularSeries();
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

    async loadPopularFilms() {
      try {
        const response = await getPopularMovies();
        if (!response || !Array.isArray(response)) {
          console.error("Invalid data from API");
          return;
        }
        const filtered = this.filterValidMovies(response);
        this.popularFilms = filtered.slice(0, 10);
      } catch (error) {
        console.error("Error loading popular movies:", error);
      }
    },

    async loadPopularSeries() {
      try {
        const response = await getPopularSeries();
        if (!response || !Array.isArray(response)) {
          console.error("Invalid data from API");
          return;
        }
        const filtered = this.filterValidMovies(response);
        this.popularSeries = filtered.slice(0, 10);
      } catch (error) {
        console.error("Error loading popular series:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
