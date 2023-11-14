<template>
  <header>
    <div id="logo">PLAN IT</div>
    <nav>
      <ul>
        <li>홈</li>
        <li>여행 지도</li>
        <li>계획 세우기</li>
        <li>커뮤니티</li>
      </ul>
      <ul>
        <li>로그인</li>
        <li>회원가입</li>
      </ul>
    </nav>
  </header>
</template>

<script setup></script>

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

#logo {
  /* justify-content: center;
  align-items: center; */
  text-align: center;
  width: 8.86088rem;
  font-size: 1.81rem;
  font-weight: 700;
}

nav {
  display: flex;
  width: 80rem;
  justify-content: space-between;
  font-size: 1rem;
}

nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin-right: 3.61rem;
}
nav ul li {
  cursor: pointer;
}

nav ul li:hover {
  text-decoration: none;
}
</style>
