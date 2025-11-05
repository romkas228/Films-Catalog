<template>
  <div class="hero-slider">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="20"
      :loop="false"
      :pagination="{ el: '.swiper-steps', clickable: true }"
      :scrollbar="{ draggable: true }"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      class="hero-slider__inner"
      :navigation="{
        nextEl: '.swiper-button-rigth',
        prevEl: '.swiper-button-left',
      }"
    >
      <swiper-slide v-for="(item, index) in filmsData" :key="item.id || index">
        <hero-card :item="item" />
      </swiper-slide>

      <div class="swiper-control">
        <div class="swiper-button swiper-button-left">
          <button-left />
        </div>
        <div class="swiper-steps"></div>
        <div class="swiper-button swiper-button-rigth">
          <button-right />
        </div>
      </div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

import HeroCard from "@/components/cards/HeroCard.vue";
import buttonLeft from "@/components/ui/buttonLeft.vue";
import buttonRight from "@/components/ui/buttonRight.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    HeroCard,
    buttonLeft,
    buttonRight,
  },
  props: {
    filmsData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      modules: [Navigation, Pagination, Scrollbar, Autoplay, A11y],
    };
  },
};
</script>

<style scoped lang="scss">
.hero-slider {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 70px;

  &__inner {
    position: relative;
  }
}

.swiper {
  &-control {
    position: absolute;
    bottom: 40px;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center; 
    gap: 16px;
    z-index: 10;

    @media (max-width: 400px) {
      display: none;
    }
  }

  &-steps {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 56px;
    height: 56px;
    background-color: rgba(26, 26, 26, 0.8);
    border: 1px solid rgba(31, 31, 31, 1);
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
    z-index: 20;

    &:hover {
      background-color: rgba(40, 40, 40, 1);
    }

    &-left {
      left: 40px; 
    }

    &-rigth {
      right: 40px; 
    }
  }
}
</style>
