<template>
  <main>
    <GreetingMainVue />
    <PopularPlaceVue />
    <RecommendPlaceVue />
  </main>
</template>

<script setup>
import GreetingMainVue from "./GreetingMain.vue";
import PopularPlaceVue from "./PopularPlace.vue";
import RecommendPlaceVue from "./RecommendPlace.vue";
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 3.75rem;
}
</style>
