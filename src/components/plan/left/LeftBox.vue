<template>
  <div id="left-box-container">
    <h3>장소 고르기</h3>
    <div id="menu-container">
      <div id="menu-btn-container">
        <div class="menu-btn"><p>관광지 검색</p></div>
        <div class="menu-btn"><p>찜 목록</p></div>
      </div>
      <div id="attraction-search">
        <input type="text" /><SearchIcon class="svg" />
      </div>
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
  padding: 0.8rem;
  border: none;
  border-bottom: 0.0625rem solid #000;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;
  width: 6.1875rem;
  height: 1.25rem;
}
#left-box-container {
  display: flex;
  flex-direction: column;
  width: 21.75rem;
  height: 40.4375rem;
}
#menu-container {
  padding: 0 1.44rem;
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
  width: 7.925rem;
  height: 1.4525rem;
  border-radius: 0.75rem;
  background-color: #f29561;
  font-size: 0.75rem;
  color: white;
  border: 0.5px solid #f29561;
  cursor: pointer;
}
#attraction-search {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 1.25rem;
  margin: 1.07rem 0 0.7rem 0;
}
.svg {
  cursor: pointer;
}
</style>
