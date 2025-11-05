<template>
  <header class="nav-bar">
    <div class="nav-bar__logo-container">
      <img src="@/assets/images/Logo.svg" alt="logo" class="nav-bar__logo" />
    </div>

    <button class="nav-bar__burger" @click="toggleMenu">
      <img src="@/assets/images/icons/burgerMenu.svg" alt="" />
    </button>

    <nav
      :class="[
        'nav-bar__navigation',
        { 'nav-bar__navigation--open': isMenuOpen },
      ]"
    >
      <ul class="nav-bar__list">
        <li class="nav-bar__item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav-bar__item">
          <router-link to="/catalog">Catalog</router-link>
        </li>
        <li class="nav-bar__item">
          <router-link to="/support">Support</router-link>
        </li>
        <li class="nav-bar__item">
          <router-link to="/subscriptions">Subscriptions</router-link>
        </li>
      </ul>
    </nav>

    <div class="nav-bar__tools">
      <img src="@/assets/images/icons/search.svg" alt="search" />
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  padding-top: 15px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  position: relative;
  z-index: 100;

  &__logo-container {
    width: 199px;
    @media (max-width: 1500px) {
      width: 165px;
    }
    @media (max-width: 600px) {
      width: 116px;
    }
  }

  &__logo {
    width: 100%;
  }

  &__list {
    display: flex;
    align-items: center;
    gap: 30px;
    list-style: none;
    background-color: rgba(15, 15, 15, 1);
    border: 4px solid rgba(31, 31, 31, 1);
    padding: 10px 40px;
    border-radius: 12px;
  }

  &__item {
    font-weight: 500;

    a {
      display: block;
      padding: 14px 24px;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }

    a.router-link-exact-active,
    a.router-link-active {
      background-color: rgba(26, 26, 26, 1);
    }
  }

  &__tools img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  &__burger {
    display: none;
    border-radius: 6px;
    border: 3px solid #262626;
    cursor: pointer;
    padding: 12px;
    background-color: #1a1a1a;

    @media (max-width: 900px) {
      display: block;
    }
  }

  &__navigation {
    @media (max-width: 900px) {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: rgba(15, 15, 15, 1);
      transform: translateY(-200%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      border-top: 2px solid rgba(31, 31, 31, 1);

      &--open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .nav-bar__list {
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        border: none;
        background: none;
      }

      .nav-bar__item {
        width: 100%;
        text-align: center;
      }
    }
  }

  @media (max-width: 900px) {
    .nav-bar__tools {
      display: none;
    }
  }
}
</style>
