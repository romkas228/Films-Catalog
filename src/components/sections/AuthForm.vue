<template>
  <div class="auth-form">
    <div class="auth-form__head">
      <img src="@/assets/images/Logo.svg" alt="Logo" />
    </div>

    <form class="auth-form__body" @submit.prevent="handleSubmit">
      <h2 class="auth-form__title">
        {{ isLogin ? "Sign in" : "Sign up" }}
      </h2>

      <!-- Email -->
      <div class="auth-form__field">
        <label for="email" class="auth-form__label">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          placeholder="Email"
          class="auth-form__input"
          required
        />
      </div>

      <!-- Username (тільки для реєстрації) -->
      <div v-if="!isLogin" class="auth-form__field">
        <label for="username" class="auth-form__label">Name</label>
        <input
          v-model="form.username"
          type="text"
          id="username"
          placeholder="Name"
          class="auth-form__input"
          required
        />
      </div>

      <!-- Password -->
      <div class="auth-form__field">
        <label for="password" class="auth-form__label">Password</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          placeholder="Password"
          class="auth-form__input"
          required
        />
      </div>

      <!-- Confirm password (тільки для реєстрації) -->
      <div v-if="!isLogin" class="auth-form__field">
        <label for="confirm" class="auth-form__label">Confirm password</label>
        <input
          v-model="form.confirmPassword"
          type="password"
          id="confirm"
          placeholder="Confirm password"
          class="auth-form__input"
          required
        />
      </div>

      <!-- Button -->
      <button type="submit" class="auth-form__button">
        {{ isLogin ? "Sign in" : "Register" }}
      </button>

      <!-- Footer -->
      <div class="auth-form__footer">
        <p v-if="isLogin">
          Don't have an account?
          <a
            href="#"
            class="auth-form__link"
            @click.prevent="$emit('switch', 'register')"
          >
            Register
          </a>
        </p>
        <p v-else>
          Do you already have an account?
          <a
            href="#"
            class="auth-form__link"
            @click.prevent="$emit('switch', 'login')"
          >
            Sign in
          </a>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "login", // або "register"
    },
  },
  data() {
    return {
      form: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    isLogin() {
      return this.type === "login";
    },
  },
  methods: {
    handleSubmit() {
      if (!this.isLogin && this.form.password !== this.form.confirmPassword) {
        alert("Паролі не співпадають!");
        return;
      }

      if (this.isLogin) {
        console.log("Логін:", this.form.email, this.form.password);
        // login API call
      } else {
        console.log("Реєстрація:", this.form);
        // register API call
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-form {
  width: 400px;
  background-color: #fff;
  margin: 80px auto;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.25),
    0 0 60px rgba(255, 255, 255, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &__head {
    background-color: #262626;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  &__body {
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    color: #262626;
    margin-bottom: 10px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__label {
    font-size: 14px;
    color: #444;
  }

  &__input {
    padding: 12px 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      border-color: #4b6cb7;
      box-shadow: 0 0 6px rgba(75, 108, 183, 0.3);
    }
  }

  &__button {
    background: linear-gradient(95deg, rgba(229, 0, 0, 1), #5c0000);
    color: #fff;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(75, 108, 183, 0.3);
    }
  }

  &__footer {
    text-align: center;
    font-size: 14px;
    color: #555;

    .auth-form__link {
      color: rgba(229, 0, 0, 1);
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
