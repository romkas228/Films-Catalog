<template>
  <footer class="footer">
    <div class="footer__columns">
      <div class="footer__column">
        <h3 class="footer__title">Home</h3>
        <ul class="footer__list">
          <li class="footer__item">Categories</li>
          <li class="footer__item">Devices</li>
          <li class="footer__item">Pricing</li>
          <li class="footer__item">FAQ</li>
        </ul>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Movies</h3>
        <ul class="footer__list">
          <li class="footer__item">Genres</li>
          <li class="footer__item">Trending</li>
          <li class="footer__item">New Release</li>
          <li class="footer__item">Popular</li>
        </ul>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Shows</h3>
        <ul class="footer__list">
          <li class="footer__item">Genres</li>
          <li class="footer__item">Trending</li>
          <li class="footer__item">New Release</li>
          <li class="footer__item">Popular</li>
        </ul>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Support</h3>
        <ul class="footer__list">
          <li class="footer__item">Contact Us</li>
        </ul>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Subscription</h3>
        <ul class="footer__list">
          <li class="footer__item">Plans</li>
          <li class="footer__item">Features</li>
        </ul>
      </div>

      <div class="footer__column footer__column--social">
        <h3 class="footer__title">Connect With Us</h3>
        <div class="footer__social">
          <a href="#" class="footer__icon">
            <img src="@/assets/images/icons/facebook.svg" alt="facebook icon" />
          </a>
          <a href="#" class="footer__icon">
            <img src="@/assets/images/icons/twitter.svg" alt="twitter icon" />
          </a>
          <a href="#" class="footer__icon">
            <img src="@/assets/images/icons/linkedIn.svg" alt="linkedIn icon" />
          </a>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <p class="footer__copyright">©2023 streamvib, All Rights Reserved</p>

      <div class="footer__policies">
        <a href="#" class="footer__policy">Terms of Use</a>
        <a href="#" class="footer__policy">Privacy Policy</a>
        <a href="#" class="footer__policy">Cookie Policy</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style lang="scss" scoped>
.footer {
  margin-top: auto;
  border-top: 1px solid #999;
  color: #ccc;
  padding: 3rem 2rem;

  &__columns {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
  }

  &__column {
    &--social {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__title {
    color: #fff;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    margin-bottom: 0.6rem;
    font-size: 0.95rem;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }

  &__social {
    display: flex;
    gap: 0.8rem;
    margin-top: 0.5rem;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a1a1a;
    width: 38px;
    height: 38px;
    border-radius: 6px;
    color: #fff;
    font-size: 1rem;
    transition: background 0.3s;

    &:hover {
      background: #2c2c2c;
    }
  }

  &__bottom {
    margin-top: 3rem;
    border-top: 1px solid #222;
    padding-top: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #999;
  }

  &__policies {
    display: flex;
    gap: 1.5rem;
  }

  &__policy {
    color: #999;
    text-decoration: none;

    &:hover {
      color: #fff;
    }
  }
}
</style>
