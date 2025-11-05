<template>
  <div class="login-page-wrapper">
    <AuthForm :type="'login'"/>
  </div>
</template>

<script>
import AuthForm from '@/components/sections/AuthForm.vue';



export default {
  components: {
    AuthForm,
  },
};
</script>

<style lang="scss" scoped>
</style>
