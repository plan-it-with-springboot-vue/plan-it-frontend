import { createApp } from "vue";
import { createPinia } from "pinia";
import { useUserStore } from "./stores/user";
import "./assets/style.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

// 사용자 상태 초기화 함수
async function initializeUserState() {
  const userStore = useUserStore();
  const token = sessionStorage.getItem("accessToken");

  if (token) {
    try {
      // 토큰을 사용하여 사용자 정보 가져오기
      await userStore.getUserInfo(token);
      userStore.isLogin = true;
      userStore.isValidToken = true;
    } catch (error) {
      console.error("Error during user state initialization:", error);
      userStore.isLogin = false;
      userStore.isValidToken = false;
    }
  }
}

// 사용자 상태 초기화 실행
initializeUserState();
