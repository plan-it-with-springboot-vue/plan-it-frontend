import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import FindIdView from "../views/FindIdView.vue";
import FindPassView from "../views/FindPassView.vue";
import FindIdResultView from "../views/FindIdResultView.vue";
import FindPassResultView from "../views/FindPassResultView.vue";
import BoardView from "../views/BoardView.vue";
import BoardDetailView from "../views/BoardDetailView.vue";
import BoardRegisterView from "../views/BoardRegisterView.vue";
import BoardModifyView from "../views/BoardModifyView.vue";
import NoticeView from "../views/NoticeView.vue";
import NoticeDetailView from "../views/NoticeDetailView.vue";
import NoticeRegisterView from "../views/NoticeRegisterView.vue";
import NoticeModifyView from "../views/NoticeModifyView.vue";
import MyPageView from "../views/MyPageView.vue";
import PlanListView from "../views/PlanListView.vue";
import WishListView from "../views/WishListView.vue";

const onlyAuthUser = async (to, from, next) => {
  const userStore = useUserStore();
  const { userInfo, isValidToken } = storeToRefs(userStore);
  const { getUserInfo } = userStore;

  let token = sessionStorage.getItem("accessToken");

  if (userInfo.value != null && token) {
    await getUserInfo(token);
  }
  if (!isValidToken.value || userInfo.value === null) {
    next({ name: "login" });
  } else {
    next();
  }
};
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
      name: "findidResult",
      component: FindIdResultView,
    },
    {
      path: "/findpass/result",
      name: "findpassResult",
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
    {
      path: "/board",
      name: "board",
      beforeEnter: onlyAuthUser,
      component: BoardView,
    },
    {
      path: "/board/:boardId",
      name: "BoardDetailView",
      component: BoardDetailView,
    },
    {
      path: "/board/register",
      name: "BoardRegisterView",
      component: BoardRegisterView,
    },
    {
      path: "/board/modify/:boardId",
      name: "BoardModifyView",
      component: BoardModifyView,
    },
    {
      path: "/notice",
      name: "NoticeView",
      component: NoticeView,
    },
    {
      path: "/notice/:noticeId",
      name: "NoticeDetailView",
      component: NoticeDetailView,
    },
    {
      path: "/notice/register",
      name: "NoticeRegisterView",
      component: NoticeRegisterView,
    },
    {
      path: "/notice/modify/:noticeId",
      name: "NoticeModifyView",
      component: NoticeModifyView,
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MyPageView,
    },
    {
      path: "/mypage/planlist",
      name: "PlanListView",
      component: PlanListView,
    },
    {
      path: "/mypage/wishlist",
      name: "WishListView",
      component: WishListView,
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
