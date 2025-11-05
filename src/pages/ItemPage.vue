<template>
  <div class="item-page page__container">
    <nav-bar />
    <div v-if="itemData" class="item-page__content">
      <div
        class="item-page__head"
        :style="{
          backgroundImage: getBackgroundPath
            ? `url(${getBackgroundPath})`
            : 'none',
        }"
      >
        <img
          v-if="getPosterUrl"
          :src="getPosterUrl"
          alt="Poster"
          class="item-page__poster"
        />

        <div class="item-page__data">
          <div class="item-page__top-info">
            <p class="item-page__release-year">{{ getReleaseYear }}</p>
            <div class="item-page__countries">
              <span
                v-for="country in getProductionCountries"
                :key="country.name"
                class="item-page__country"
              >
                {{ country.name }}
              </span>
            </div>
          </div>

          <h2 class="item-page__title">{{ getTitle }}</h2>

          <div class="item-page__genres">
            <span
              v-for="genre in getGenres"
              :key="genre.id"
              class="item-page__genre"
            >
              {{ genre.name }}
            </span>
          </div>

          <div class="item-page__rating">
            <div class="item-page__rating-score">
              <img src="@/assets/images/icons/star.svg" class="" />
              {{ getRating }} / 10
            </div>
            <span class="item-page__rating-votes">
              ({{ getVoteCount }} votes)
            </span>
          </div>

          <div class="item-page__extra">
            <p><strong>Runtime:</strong> {{ getRuntime }}</p>
            <p><strong>Status:</strong> {{ getStatus }}</p>
            <p v-if="itemData.budget">
              <strong>Budget:</strong> ${{ formatNumber(itemData.budget) }}
            </p>
            <p v-if="itemData.revenue">
              <strong>Box office:</strong> ${{ formatNumber(itemData.revenue) }}
            </p>
          </div>

          <p class="item-page__description">
            {{ getDescription }}
          </p>
        </div>
      </div>
    </div>
    <SectionSlider :films-data="similarMovies" section-title="Similar" />
    <app-footer />
  </div>
</template>

<script>
import NavBar from "@/components/sections/NavBar.vue";
import AppFooter from "@/components/sections/AppFooter.vue";
import { getDetailsMovies, getDiscoverMovies } from "@/api/movieApi";
import SectionSlider from "@/components/sliders/SectionSlider.vue";

export default {
  components: { NavBar, AppFooter, SectionSlider },
  data() {
    return { itemData: null, similarMovies: [] };
  },
  mounted() {
    this.loadItemDetails();
    console.log();
  },
  watch: {
    "$route.params.id"() {
      this.loadItemDetails();
    },
  },
  computed: {
    getProductionCountries() {
      return this.itemData?.production_countries || [];
    },
    getGenres() {
      return this.itemData?.genres || [];
    },
    getReleaseYear() {
      return this.itemData?.release_date?.slice(0, 4) || "N/A";
    },
    getPosterField() {
      return (
        this.itemData?.poster_path ||
        this.itemData?.backdrop_path ||
        this.itemData?.posterUrl
      );
    },
    getPosterUrl() {
      return this.getPosterField
        ? `https://image.tmdb.org/t/p/original${this.getPosterField}`
        : null;
    },
    getBackgroundPath() {
      const path =
        this.itemData?.backdrop_path || this.itemData?.poster_path || null;
      return path ? `https://image.tmdb.org/t/p/original${path}` : null;
    },
    getTitle() {
      return (
        this.itemData?.title ||
        this.itemData?.original_title ||
        this.itemData?.name ||
        "Untitled"
      );
    },
    getDescription() {
      return this.itemData?.overview || "No description available.";
    },
    getRating() {
      return this.itemData?.vote_average?.toFixed(1);
    },
    getVoteCount() {
      return this.itemData?.vote_count || 0;
    },
    getRuntime() {
      const min = this.itemData?.runtime;
      return min && `${Math.floor(min / 60)} hour ${min % 60} min`;
    },
    getStatus() {
      return this.itemData?.status;
    },
  },
  methods: {
    async loadSimilarMovies() {
      try {
        const genresIds = this.itemData?.genres?.map((genre) => genre.id);
        if (!genresIds?.length) return;

        const { response } = await getDiscoverMovies({
          with_genres: genresIds.join(','),
          page: 1,
        });

        this.similarMovies = response.filter(
          (movie) => movie.id !== this.itemData.id
        );
      } catch (error) {
        console.error(error);
      }
    },
    async loadItemDetails() {
      try {
        const movieId = this.$route.params.id;
        const response = await getDetailsMovies(movieId);
        console.log("API response:", response);
        this.itemData = response;
        await this.loadSimilarMovies();
      } catch (error) {
        console.error("Error loading movie details:", error);
      }
    },
    formatNumber(num) {
      return num.toLocaleString("en-US");
    },
  },
};
</script>

<style lang="scss" scoped>
.item-page {
  &__head {
    background-size: cover;
    background-position: center;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    display: flex;
    gap: 30px;
    padding: 25px;
    margin-bottom: 120px;
    @media (max-width: 1000px) {
      flex-direction: column;
      align-items: center;
    }

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2));
      z-index: 1;
    }
  }

  &__release-year {
    margin-bottom: 12px;
  }

  &__poster {
    position: relative;
    z-index: 2;
    border-radius: 12px;
    max-height: 700px;
    @media (max-width: 600px) {
      max-height: 450px;
    }
  }

  &__data {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    z-index: 2;
    color: #fff;
  }

  &__title {
    font-size: 64px;
    font-weight: 700;
    line-height: 1.1;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 22px;
    color: #ffd700;
    font-weight: 600;

    &-score {
      display: flex;
      gap: 10px;
      & img {
        width: 20px;
      }
    }

    &-votes {
      font-size: 16px;
      color: #ddd;
    }
  }

  &__extra {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 18px;
    color: #ddd;

    strong {
      color: #fff;
      font-weight: 500;
    }
  }

  &__genres,
  &__countries {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 18px;
    align-items: center;

    & span:not(:last-child)::after {
      content: "•";
      margin-left: 10px;
      color: #fff;
      opacity: 0.8;
    }
  }

  &__description {
    font-size: 18px;
    font-weight: 300;
    margin-right: 10%;
    line-height: 1.6;
    color: #f3f3f3;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  }
}
</style>
