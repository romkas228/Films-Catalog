<template>
  <div class="nav-pagination">
    <button
      class="nav-pagination__button"
      :disabled="currentPage === 1"
      @click="handlePageClick(currentPage - 1)"
    >
      <img src="@/assets/images/icons/arrow-left.svg" alt="left" />
    </button>
    <ul class="nav-pagination__list">
      <li
        class="nav-pagination__item"
        v-for="(page, index) in visiblePages"
        :key="index"
        :class="{ 'nav-pagination__item--active': page === currentPage }"
        @click="handlePageClick(page)"
      >
        {{ page }}
      </li>
    </ul>
    <button
      class="nav-pagination__button"
      :disabled="currentPage === totalPages"
      @click="handlePageClick(currentPage + 1)"
    >
      <img src="@/assets/images/icons/arrow-right.svg" alt="right" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    visiblePages() {
      const pages = [];

      pages.push(1);

      if (this.currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(this.totalPages - 1, this.currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (this.currentPage < this.totalPages - 2) {
        pages.push("...");
      }

      if (this.totalPages > 1) {
        pages.push(this.totalPages);
      }

      return pages;
    },
  },
  methods: {
    handlePageClick(page) {
      if (page !== "...") {
        this.$emit("page-change", page);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-pagination {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 12px;

  &__button {
    background-color: rgb(26, 26, 26);
    border: 1px solid rgb(31, 31, 31);
    border-radius: 8px;
    padding: 10px 16px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background-color: rgba(38, 38, 38, 1);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    img {
      display: block;
      width: 20px;
      height: 20px;
    }
  }

  &__list {
    display: flex;
    gap: 8px;
    list-style: none;
    justify-content: center;
  }

  &__item {
    padding: 10px 16px;
    background-color: rgb(26, 26, 26);
    border: 1px solid rgb(31, 31, 31);
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    min-width: 44px;
    text-align: center;
    transition: all 0.2s;

    &--active {
      background-color: rgba(229, 0, 0, 1);
      color: white;
      border-color: rgba(229, 0, 0, 1);
    }

    &:hover:not(&--active) {
      background-color: rgba(38, 38, 38, 1);
    }
  }
}
</style>
