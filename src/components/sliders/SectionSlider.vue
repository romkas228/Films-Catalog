<template>
  <div class="section__slider">
    <div class="section__slider-top">
      <h2 class="section__slider-title" v-if="sectionTitle">
        {{ sectionTitle }}
      </h2>
    </div>
    <swiper
      :modules="modules"
      :slides-per-view="getSlidesPerView"
      :space-between="20"
      :loop="false"
      :pagination="{ el: '.swiper-steps', clickable: true }"
      :scrollbar="{ draggable: true }"
      class="section__slider-inner"
      :navigation="{
        nextEl: '.swiper-button-left',
        prevEl: '.swiper-button-right',
      }"
    >
      <swiper-slide v-for="(item, index) in filmsData" :key="index">
        <section-card :item="item" />
      </swiper-slide>

      <div class="swiper-control">
        <div class="swiper-button swiper-button-right">
          <button-right />
        </div>
        <div class="swiper-steps"></div>
        <div class="swiper-button swiper-button-left">
          <button-left />
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

import buttonLeft from "@/components/ui/buttonRight.vue";
import buttonRight from "@/components/ui/buttonLeft.vue";
import SectionCard from "@/components/cards/SectionCard.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    buttonLeft,
    buttonRight,
    SectionCard,
  },

  props: {
    filmsData: {
      type: Array,
      default: () => [],
    },
    sectionTitle: {
      type: String,
    },
  },

  data() {
    return {
      windowWidth: window.innerWidth,
      modules: [Navigation, Pagination, Scrollbar, Autoplay, A11y],
    };
  },

  computed: {
    getSlidesPerView() {
      return this.windowWidth >= 1480
        ? 4
        : this.windowWidth > 1150
        ? 3
        : this.windowWidth > 850
        ? 2
        : 1;
    },
  },

  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },

  mounted() {
    window.addEventListener("resize", this.updateWindowWidth);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth);
  },
};
</script>

<style scoped lang="scss">
.section__slider {
  margin-bottom: 102px;
  &-top {
    margin-bottom: 16px;
  }
  &-title {
    font-size: 38px;
    font-weight: 700;
  }
}
.swiper {
  &-control {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: start;
    background-color: rgba(15, 15, 15, 1);
    padding: 16px;
    width: max-content;
    border: 1px solid rgba(31, 31, 31, 1);
    border-radius: 8px;
  }
  &-steps {
    max-width: max-content;
  }
  &-button {
    width: 56px;
    height: 56px;
    background-color: rgba(26, 26, 26, 1);
    border: 1px solid rgba(31, 31, 31, 1);
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius: 8px;
  }
}
</style>
