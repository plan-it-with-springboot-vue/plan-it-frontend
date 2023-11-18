import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import FindIdView from "../views/FindIdView.vue";
import FindPassView from "../views/FindPassView.vue";
import FindIdResultView from "../views/FindIdResultView.vue";
import FindPassResultView from "../views/FindPassResultView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/findid",
      name: "findid",
      component: FindIdView,
    },
    {
      path: "/findpass",
      name: "findpass",
      component: FindPassView,
    },
    {
      path: "/findid/result",
      name: "findidresult",
      component: FindIdResultView,
    },
    {
      path: "/findpass/result",
      name: "findpassresult",
      component: FindPassResultView,
    },
    {
      path: "/map",
      name: "map",
      component: () => import("../views/TripMapView.vue"),
    },
    {
      path: "/plan",
      name: "plan",
      component: () => import("../views/PlanView.vue"),
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
