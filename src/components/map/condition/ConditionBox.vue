<template>
  <div id="container">
    <div id="search-condition-container">
      <h3>장소 고르기</h3>
      <LocationSelectVue />
      <!-- <KeywordSearchVue /> -->
      <CategorySelectVue />
    </div>
  </div>
  <hr />
</template>

<script setup>
import KeywordSearchVue from "./KeywordSearch.vue";
import LocationSelectVue from "./LocationSelect.vue";
import CategorySelectVue from "./CategorySelect.vue";
</script>

<style scoped>
hr {
  height: 0.03125rem;
  background-color: #c8c8c8;
  border: 0;
  margin: 0;
}
h3 {
  text-align: center;
  font-size: 1.25rem;
  /* color: #6499e9; */
}
#container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 30vh; */
  margin-top: 3.75rem;
  width: 20.8125rem;
  /* height: 12.8125rem; */
  /* width: 100vw; */
}

#search-condition-container {
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  /* width: 20.8125rem; */
  width: 18.4375rem;
  /* height: 8.3125rem; */
  margin: 1.56rem 0;
}
hr {
  width: 20.8125rem;
  height: 0.03125rem;
  background-color: #c8c8c8;
  border: 0;
}
</style>
