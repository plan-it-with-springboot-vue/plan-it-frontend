<template>
  <header>
    <nav>
      <div id="logo">
        <img src="@/assets/image/plan-it-logo.png" alt="PLAN IT">
      </div>
      <ul>
        <li class="nav-content">홈</li>
        <li class="nav-content">여행 지도</li>
        <li class="nav-content">계획 세우기</li>
        <li class="nav-content">커뮤니티</li>
      </ul>
      <ul>
        <li class="nav-content-login" v-if="!isLoggedIn">로그인</li>
        <li v-if="!isLoggedIn">회원가입</li>
        <li v-else class="dropdown">
          <div id="nav-name-box">
            <label id="nav-name">{{ userName }}님</label>
          </div>
          <div id="profile-img">
            <img src="@/assets/image/profile.png" alt="profile">
          </div>
          <div class="dropdown-menu">
            <ul>
              <li>마이페이지</li>
              <li>내 여행 계획 확인</li>
              <li>좋아요 목록</li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(true); // 로그인 상태 (true 또는 false)
const userName = ref('김싸피'); // 로그인한 사용자의 이름

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
  z-index: 4;
  width: 100%;
  padding: 0 20px;
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
}
#logo img{
  width: 9rem;
  height: auto;
}
#profile-img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
}
#profile-img img{
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
nav ul li{
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
</style>
