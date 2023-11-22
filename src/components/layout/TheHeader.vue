<template>
  <header>
    <nav>
      <div id="logo">
        <img src="@/assets/image/plan-it-logo.png" alt="PLAN IT" @click="navigateTo('/')">
      </div>
      <ul>
        <li :class="{ 'nav-active': activeRoute === '/' }" class="nav-content" @click="navigateTo('/')">홈</li>
        <li :class="{ 'nav-active': activeRoute === '/map' }" class="nav-content" @click="navigateTo('/map')">여행 지도</li>
        <li :class="{ 'nav-active': activeRoute === '/plan' }" class="nav-content" @click="navigateTo('/plan')">계획 세우기
        </li>
        <li :class="{ 'nav-active': activeRoute === '/board' }" class="nav-content" @click="navigateTo('/board')">커뮤니티
        </li>
        <li :class="{ 'nav-active': activeRoute === '/notice' }" class="nav-content" @click="navigateTo('/notice')">공지사항
        </li>
      </ul>
      <ul>
        <li :class="{ 'nav-active': activeRoute === '/login' }" class="nav-content-login" v-if="!userStore.isLogin"
          @click="navigateTo('/login')">로그인</li>
        <li :class="{ 'nav-active': activeRoute === '/signup' }" class="nav-content-sign-up" v-if="!userStore.isLogin"
          @click="navigateTo('/signup')">회원가입</li>
        <li v-else class="dropdown">
          <div id="nav-name-box">
            <label id="nav-name">{{ userStore.userInfo?.userName }}님</label>
          </div>
          <div id="profile-img">
            <img src="@/assets/image/profile.png" alt="profile">
          </div>
          <div class="dropdown-menu">
            <ul>
              <li @click="navigateTo('/mypage')">마이페이지</li>
              <li @click="navigateTo('/mypage/planlist')">여행 일정 관리</li>
              <li @click="navigateTo('/mypage/wishlist')">관심 여행지</li>
              <li @click="logout">로그아웃</li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();

const router = useRouter();
const route = useRoute();
const activeRoute = ref(route.path); // 현재 활성화된 라우트

watch(route, (newRoute) => {
  activeRoute.value = newRoute.path;
});

const navigateTo = (path) => {
  router.push(path);
};

const logout = () => {
  userStore.userLogout(userStore.userInfo.userId);
  router.push("/login");
}

if (sessionStorage.getItem("accessToken")) {
  userStore.isLogin = true;
  userStore.getUserInfo(sessionStorage.getItem("accessToken"));
}
</script>

<style scoped>
header {
  /* background-color: #c8c8c8; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 3.75rem;
  flex-shrink: 0;
  box-shadow: 0 2px 2px -2px #c8c8c8;
  position: fixed;
  background: #fff;
  z-index: 7;
  width: 100%;
  padding: 0 20px;
}

.nav-content,
.nav-content-login,
.nav-content-sign-up {
  margin-right: 3.61rem;
  cursor: pointer;
  transition: color 0.2s;
  /* 부드러운 색상 변경 효과 */
}

.nav-content-login {
  margin-right: 1rem;
}

/* 마우스 오버시 글자 색상과 밑줄 추가 */
.nav-content:hover,
.nav-content-login:hover,
.nav-content-sign-up:hover {
  color: #6499E9;
  text-decoration: underline;
}

.nav-active {
  color: #6499E9;
  text-decoration: underline;
}

#nav-name-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

#nav-name {
  cursor: pointer;
}

#logo {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

#logo img {
  width: 9rem;
  height: auto;
}

#profile-img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
}

#profile-img img {
  width: 1.5rem;
  height: 1.5rem;
}

nav {
  display: flex;
  width: 80rem;
  height: 3.75rem;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
}

nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

nav ul li {
  cursor: pointer;
}

.nav-content {
  margin-right: 3.61rem;
  cursor: pointer;
}

.nav-content-login {
  margin-right: 1rem;
}

nav ul li:hover {
  text-decoration: none;
}

.dropdown {
  height: 3.75rem;
  display: flex;
  position: relative;
  cursor: pointer;

}

.dropdown:hover .dropdown-menu,
.dropdown-menu:hover {
  display: flex;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: calc(100% - 160px);
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(76, 76, 76, 0.2);
  z-index: 1;
  flex-direction: column;
}

.dropdown-menu ul {
  padding: 0;
  margin: 0;
  width: 160px;
  display: flex;
  flex-direction: column;
}

.dropdown-menu ul li {
  width: 128px;
  padding: 12px 16px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown-menu ul li:hover {
  background-color: #f1f1f1;
}

/* 반응형 */
@media screen and (max-width: 768px) {
  nav {
    flex-direction: row;
    align-items: center;
  }

  nav ul {
    flex-direction: row;
    align-items: center;
  }

  .nav-content,
  .nav-content-login,
  .nav-content-sign-up {
    margin-right: 1rem;
  }

  #profile-img {
    margin-left: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
