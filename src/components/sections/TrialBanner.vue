<template>
  <div class="trial-banner">
    <div class="trial-banner__content">
      <div class="trial-banner__text">
        <h1 class="trial-banner__title">Start your free trial today!</h1>
        <p class="trial-banner__description">
          This is a clear and concise call to action that encourages users to
          sign up for a free trial of StreamVibe.
        </p>
      </div>
      <div class="trial-banner__buttons">
        <button class="trial-banner__button">Start a Free Trial</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.trial-banner {
  background-image: url("@/assets/images/FilmsBackground.png");
  background-position: center;
  padding: 100px 80px;
  border-radius: 12px;
  margin-bottom: 120px;
  
  @media (max-width: 1000px) {
    padding: 80px 60px;
  }
  @media (max-width: 600px) {
    padding: 50px 30px;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    @media (max-width: 600px) {
      flex-direction: column;
      
    }
  }

  &__title {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 14px;

    @media (max-width: 600px) {
     font-size: 24px;
     text-align: center;
    }
  }

  &__description {
    font-size: 18px;
    color: #999999;
    @media (max-width: 600px) {
     
     text-align: center;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    background-color: #e50000;
    border: 0;
    border-radius: 8px;
    color: #fff;
    padding: 18px 24px;
    font-size: 18px;
    transition-duration: 200ms;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      background-color: #fd4747;
    }
  }
}
</style>
