<template>
  <div id="container">
    <div id="search-condition-container">
      <LocationSelectVue />
      <KeywordSearchVue />
      <CategorySelectVue />
    </div>
  </div>
</template>

<script setup>
import KeywordSearchVue from "./KeywordSearch.vue";
import LocationSelectVue from "./LocationSelect.vue";
import CategorySelectVue from "./CategorySelect.vue";
</script>

<style scoped>
#container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vh;
  margin-top: 3.75rem;
  /* height: 12.8125rem; */
  /* width: 100vw; */
}

#search-condition-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* width: 20.8125rem; */
  width: 18.4375rem;
  height: 8.3125rem;
  margin: 2.56rem 0;
}
hr {
  width: 20.8125rem;
  height: 0.03125rem;
  background-color: #c8c8c8;
  border: 0;
}
</style>
