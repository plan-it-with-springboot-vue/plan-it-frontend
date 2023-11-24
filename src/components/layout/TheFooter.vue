<template>
  <div id="footer-container">
    <div id="footer-1">
      <p id="logo">PLAN IT</p>
      <p>&copy; PLAN IT All Right Reserved.</p>
    </div>

    <p id="footer-2">이용 약관 | 개인정보처리방침</p>
  </div>
</template>

<script setup></script>

<style scoped>
p {
  font-size: 1rem;
}
#logo {
  margin-right: 2.39rem;
}

#footer-1 {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  margin-left: 8.06rem;
}

#footer-2 {
  margin-right: 8.06rem;
}

#footer-container {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  text-align: center;
  height: 3.75rem;
  background-color: #c8c8c831;
  width: 100%;
}
</style>
