<template>
  <div class="nav-bar">
    <div class="nav-bar__logo">
      <img src="@/assets/images/Logo.svg" alt="logo" />
    </div>
    <nav class="nav-bar__navigation">
      <ul class="nav-bar__list">
        <li class="nav-bar__item nav-bar__item--active">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav-bar__item">
          <router-link to="/catalog">Catalog</router-link>
        </li>
        <li class="nav-bar__item">Support</li>
        <li class="nav-bar__item">Subscriptions</li>
      </ul>
    </nav>
    <div class="nav-bar__tools">
      <img src="@/assets/images/icons/search.svg" alt="search" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

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
    padding: 14px 24px;
    border-radius: 8px;
    cursor: pointer;
    &--active {
      background-color: rgba(26, 26, 26, 1);
    }
  }
}
</style>
