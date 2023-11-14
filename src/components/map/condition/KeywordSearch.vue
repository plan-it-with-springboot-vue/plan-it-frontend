<template>
  <div id="search-container">
    <input type="text" />
    <button><p>검색</p></button>
  </div>
</template>

<script setup></script>

<style scoped>
input {
  width: 15.125rem;
  height: 1.5125rem;
  border-radius: 0.125rem;
  border: 0.5px solid #8c8c8c;
  background: #fff;
  box-sizing: border-box;
  margin-right: 0.5rem;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.0125rem;
  height: 1.5125rem;
  border-radius: 0.125rem;
  background-color: #6499e9;
  border: 0.5px solid #6499e9;
  cursor: pointer;
}

p {
  color: #fff;
  text-align: center;
  font-size: 0.75rem;
}

#search-container {
  display: flex;
  margin-bottom: 1.81rem;
}
</style>
