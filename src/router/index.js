import HomePage from "@/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
import CatalogPage from "../pages/CatalogPage.vue";
import ItemPage from "../pages/ItemPage.vue";
import AuthorizationLoginPage from "../pages/AuthorizationLoginPage.vue";
import AuthorizationRegistrationPage from "../pages/AuthorizationRegistrationPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/catalog",
    component: CatalogPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/item/:id",
    component: ItemPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "AuthorizationLogin",
    component: AuthorizationLoginPage,
  },
  {
    path: "/register",
    name: "AuthorizationRegistration",
    component: AuthorizationRegistrationPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem("auth_token");
  if (
    to.matched.some((record) => record.meta && record.meta.requiresAuth) &&
    !token
  ) {
    return next({ name: "AuthorizationLogin" });
  }
  next();
});

export default router;
