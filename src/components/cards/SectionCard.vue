<template>
  <div class="section-card" @click="handlerOpenItem(getId)">
    <img class="section-card__img" :src="getPosterUrl" />
    <div class="section-card__content">
      <div class="section-card__rating">
        <img
          class="section-card__star"
          src="@/assets/images/icons/star.svg"
          alt="star"
        />
        <p class="section-card__rating-text">
          {{ getRating }}
        </p>
      </div>
      <h3 class="section-card__title">
        {{ getTitle }}
      </h3>
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
    getRating() {
      const rating = Number(this.item.vote_average || this.item.rating);
      return rating ? rating.toFixed(1) : "-";
    },
    getPosterField() {
      return (
        this.item.poster_path || this.item.backdrop_path || this.item.posterUrl
      );
    },
    getPosterUrl() {
      return this.getPosterField
        ? `https://image.tmdb.org/t/p/original${this.getPosterField}`
        : null;
    },
  },
  methods: {
    handlerOpenItem(id) {
      this.$router.push(`/item/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.section-card {
  height: 410px;
  width: 310px;
  cursor: pointer;
  padding: 20px;
  background-color: rgba(26, 26, 26, 1);
  border: 1px solid rgba(38, 38, 38, 1);
  border-radius: 12px;
  text-align: center;
  position: relative;

  &__img {
    object-fit: cover;
    width: calc(100% - 32px);
    height: calc(100% - 32px);
    border-radius: 12px;
  }
  &__content {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
  }
  &__title {
    font-size: 24px;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__rating {
    display: flex;
    gap: 4px;
    align-items: center;

    &-text {
      font-size: 18px;
      font-weight: 600;
    }
  }
  &__star {
    width: 20px;
    height: 20px;
  }
}
</style>
