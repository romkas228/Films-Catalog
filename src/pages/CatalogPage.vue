<template>
  <div class="catalog-page page__container">
    <nav-bar />
    <main class="catalog-page__wrapper">
      <h2 class="catalog-page__title">Catalog Films</h2>
      <div class="catalog-page__box">
        <div class="catalog-page__filters">
          <div class="catalog-page__filters-wrapper">
            <label class="catalog-page__filters-label" for="select-sort">
              Sort
              <div class="catalog-page__filters-box">
                <select
                  class="catalog-page__select"
                  v-model="filtersConfig.sort_by"
                  name="select-sort"
                  id="select-sort"
                >
                  <option class="catalog-page__option" value="original_title.asc">
                    Name A-Z
                  </option>
                  <option
                    class="catalog-page__option"
                    value="original_title.desc"
                  >
                    Name Z-A
                  </option>
                  <option class="catalog-page__option" value="popularity.desc">
                    Most Popular
                  </option>
                  <option class="catalog-page__option" value="popularity.asc">
                    Least Popular
                  </option>
                  <option class="catalog-page__option" value="revenue.desc">
                    Box Office High
                  </option>
                  <option class="catalog-page__option" value="revenue.asc">
                    Box Office Low
                  </option>
                </select>
              </div>
            </label>
            <label
              class="catalog-page__filters-label select-date"
              for="select-date"
            >
              Date Release
              <div class="catalog-page__filters-box">
                <input
                  class="catalog-page__input"
                  v-model="filtersConfig['release_date.gte']"
                  type="date"
                />
                <input
                  class="catalog-page__input"
                  v-model="filtersConfig['release_date.lte']"
                  type="date"
                />
              </div>
            </label>
            <label
              class="catalog-page__filters-label select-rating"
              for="select-date"
            >
              Rating
              <div class="catalog-page__filters-box">
                <input
                  class="catalog-page__input"
                  v-model="filtersConfig['vote_average.gte']"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                />
                <input
                  class="catalog-page__input"
                  v-model="filtersConfig['vote_average.lte']"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                />
              </div>
            </label>
            <label
              class="catalog-page__filters-label catalog-page__filters-label--checkbox"
              for="select-without__photos"
            >
              Show unsorted without photos
              <input
                class="catalog-page__filters-checkbox"
                type="checkbox"
                v-model="enableFilter"
                name="select-without__photos"
              />
            </label>
          </div>
          <label
            for="catalog-page__query-input"
            class="catalog-page__filters-label catalog-page__filters-label--query"
          >
            Search
            <input
              type="text"
              name="catalog-page__query-input"
              v-model="searchQuery"
              class="catalog-page__input"
              placeholder="Search..."
            />
          </label>
        </div>

        <div class="catalog-page__content">
          <list-card :filmsData="catalogFilms" />
        </div>
        <nav-pagination
          v-if="totalResults"
          :totalPages="totalPages"
          :currentPage="filtersConfig.page"
          @page-change="handlerPageChange"
        />
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/sections/NavBar.vue";
import NavPagination from "@/components/sections/NavPagination.vue";

import ListCard from "@/components/sliders/ListCard.vue";

import { getDiscoverMovies, searchMovies } from "@/api/movieApi";

export default {
  components: {
    NavBar,
    NavPagination,
    ListCard,
  },
  data() {
    return {
      catalogFilms: [],
      enableFilter: true,
      searchQuery: "",
      filtersConfig: {
        sort_by: "popularity.desc",
        page: parseInt(this.$route.query.page) || 1,
        "vote_average.gte": "",
        "vote_average.lte": "",
        "release_date.gte": "",
        "release_date.lte": "",
      },
      totalPages: 0,
      totalResults: 0,
    };
  },
  mounted() {
    this.loadCatalogFilms();
  },
  watch: {
    filtersConfig: {
      handler() {
        this.loadCatalogFilms();
      },
      deep: true,
    },
    enableFilter: {
      handler() {
        this.loadCatalogFilms();
      },
    },
    searchQuery: {
      handler() {
        this.loadCatalogFilms();
      },
      immediate: false,
    },
    "$route.query.page"(newPage) {
      this.filtersConfig.page = parseInt(newPage) || 1;
    },
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

    handlerPageChange(page) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page: page },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    async loadCatalogFilms() {
      try {
        let result;
        if (this.searchQuery.trim()) {
          result = await searchMovies(
            this.searchQuery,
            this.filtersConfig.page
          );
        } else {
          result = await getDiscoverMovies(this.filtersConfig);
        }

        const movies = result?.response || result?.results || [];
        const filteredMovies = this.enableFilter
          ? this.filterValidMovies(movies)
          : result.response;

        this.catalogFilms = filteredMovies;
        this.totalPages = result.total_pages < 300 ? result.total_pages : 300;
        this.totalResults = result.total_results;
        console.log("this.totalResults", result);
      } catch (error) {
        console.error("Error loading catalog films:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.catalog-page {
  &__title {
    font-size: 38px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  &__filters {
    display: flex;
    flex-direction: column;
    gap: 18px;
    background-color: rgb(26, 26, 26);
    border: 1px solid rgb(38, 38, 38);
    margin-bottom: 32px;
    padding: 24px 18px;
    border-radius: 12px;
    &-wrapper {
      display: flex;
      gap: 18px;
      @media (max-width: 800px) {
        flex-direction: column;
      }
    }
    &-label {
      font-size: 22px;

      &--checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      &--query {
        display: flex;
        gap: 8px;
        flex-direction: column;
      }

      input[type="checkbox"] {
        width: 20px;
        height: 20px;
        cursor: pointer;
        accent-color: rgba(229, 0, 0, 1);
      }
    }
  }
  &__select,
  &__input {
    background-color: rgba(20, 20, 20, 1);
    color: #fff;
    border: 1px solid rgba(38, 38, 38, 1);
    padding: 18px 15px;
    border-radius: 18px;
    font-size: 25px;
    outline: none;
  }

}
</style>
