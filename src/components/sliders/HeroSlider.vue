<template>
  <swiper
    :modules="modules"
    :slides-per-view="getSlidesPerView"
    :space-between="20"
    :loop="false"
    :pagination="false"
    :scrollbar="{ draggable: true }"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
    class="hero__slider-inner"
  >
    <!-- :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }" -->
    <swiper-slide v-for="(item, index) in filmsData" :key="item.id || index">
      <hero-card :item="item" />
    </swiper-slide>

    <!-- <div class="swiper-button-next !w-[40px] !h-[40px]">
      <button-next />
    </div>
    <div class="swiper-button-prev !w-[40px] !h-[40px]">
      <button-prev />
    </div> -->
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Scrollbar, Autoplay, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";

import HeroCard from "../cards/HeroCard.vue";
// import buttonPrev from "@/components/UI/buttonPrev";
// import buttonNext from "@/components/UI/buttonNext";

export default {
  components: {
    Swiper,
    SwiperSlide,
    // buttonPrev,
    // buttonNext,
    HeroCard,
  },

  props: {
    filmsData: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      windowWidth: window.innerWidth,
      modules: [Navigation, Scrollbar, Autoplay, A11y],
    };
  },

  computed: {
    getSlidesPerView() {
      return this.windowWidth > 768 ? 2 : 1;
    },
  },

  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },

  mounted() {
    console.log('filmsData', this.filmsData);
    
    window.addEventListener("resize", this.updateWindowWidth);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth);
  },
};
</script>

<style scoped>
.hero__slider-inner {
  margin-bottom: 78px;
  margin-top: 20px;
}
</style>
