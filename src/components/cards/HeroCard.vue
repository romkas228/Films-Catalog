<template>
  <div
    class="hero-card"
    :style="{
      backgroundImage: getBackgroundPath ? `url(${getBackgroundPath})` : 'none',
    }"
  >
    <div class="hero-card__overlay">
      <div class="hero-card__content">
        <h2 class="hero-card__title">
          {{ getTitle }}
        </h2>
        <p class="hero-card__description">
          {{ getDescription }}
        </p>
        <button class="hero-card__play-button" @click="handlerOpenItem(getId)">
          <img src="@/assets/images/icons/play.svg" alt="" />
          Play Now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getId() {
      return this.item.id || this.item.movieId;
    },
    getTitle() {
      return (
        this.item.original_title ||
        this.item.original_name ||
        this.item.title ||
        "Untitled"
      );
    },
    getBackgroundPath() {
      const path = this.item.backdrop_path || this.item.poster_path || null;
      return path ? `https://image.tmdb.org/t/p/original${path}` : null;
    },
    getDescription() {
      return this.item.overview || "No description available.";
    },
  },
  methods: {
    handlerOpenItem(id) {
      const type =
        this.item.first_air_date || this.item.original_name ? "tv" : "movie";
      this.$router.push({ path: `/item/${id}`, query: { type } });
    },
  },
};
</script>

<style lang="scss" scoped>
.hero-card {
  position: relative;
  width: 100%;
  height: 800px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  @media (max-width: 400px) {
    height: 460px;
  }

  &__overlay {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.8) 100%
    );
    display: flex;
    align-items: flex-end;
  }

  &__content {
    z-index: 2;
    width: 100%;
    padding: 30px;
    padding-bottom: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 400px) {
      padding-bottom: 30px;
    }
  }

  &__title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  &__description {
    text-align: center;
    font-size: 16px;
    color: #c2c2c2;
    max-width: 700px;
    margin-bottom: 12px;

    @media (max-width: 400px) {
      display: none;
    }
  }

  &__play-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    background-color: #e50000;
    border: 0;
    border-radius: 8px;
    color: #fff;
    padding: 14px 20px;
    transition-duration: 200ms;
    cursor: pointer;
    &:hover {
      background-color: #fd4747;
    }
    @media (max-width: 400px) {
      width: 100%;
    }
  }
}
</style>
