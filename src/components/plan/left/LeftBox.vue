<template>
  <div id="left-box-container">
    <h3>계획 세우기</h3>
    <div id="menu-btn-container">
      <div class="menu-btn"><p>관광지 검색</p></div>
      <div class="menu-btn"><p>찜 목록</p></div>
    </div>
    <div id="attraction-search">
      <input type="text" /><SearchIcon class="svg" />
    </div>
    <AttractionSearchBox />
  </div>
</template>

<script setup>
import SearchIcon from "../../../assets/svg/SearchIcon.vue";
import AttractionSearchBox from "./AttractionSearchBox.vue";
</script>

<style scoped>
p {
  text-align: center;
  margin: 0;
  padding: 0;
}
h3 {
  text-align: center;
  font-size: 1.25rem;
  color: #6499e9;
}
input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-bottom: 0.0625rem solid #000;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;
  width: 7.1875rem;
  height: 1.25rem;
}
#left-box-container {
  display: flex;
  flex-direction: column;
  width: 21.75rem;
  height: 40.4375rem;
  margin-left: 1.19rem;
  /* border-radius: 0.3125rem;
  border: 1px solid #c8c8c8; */
}
#menu-btn-container {
  display: flex;
  justify-content: space-between;
}
.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 8.125rem;
  height: 1.3125rem;
  border-radius: 0.75rem;
  background-color: #c8c8c8;
  font-size: 0.75rem;
  color: white;
  border: 0.5px solid #c8c8c8;
  cursor: pointer;
}
#attraction-search {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 1.25rem;
}
.svg {
  cursor: pointer;
}
</style>
