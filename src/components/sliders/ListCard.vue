<template>
  <div class="list-card">
    <div
      v-for="(film, index) in filmsData"
      class="list-card__item"
      :key="index"
    >
      <section-card :item="film" />
    </div>
    <div v-if="filmsData.length === 0" class="list-card__empty">
      <p>No films found</p>
    </div>
  </div>
</template>

<script>
import SectionCard from "@/components/cards/SectionCard.vue";

export default {
  components: {
    SectionCard,
  },
  props: {
    filmsData: {
      type: Array,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.list-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}
</style>
