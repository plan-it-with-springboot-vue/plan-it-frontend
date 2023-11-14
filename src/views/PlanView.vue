<template>
  <TheHeaderVue />
  <div id="plan-container">
    <CalenderDurationVue />
    <div id="map"><PlanKakaoMap /></div>
  </div>
</template>

<script setup>
import TheHeaderVue from "../components/layout/TheHeader.vue";
import CalenderDurationVue from "../components/plan/CalenderDuration.vue";
import PlanKakaoMap from "../components/plan/PlanKakaoMap.vue";
</script>

<style scoped>
#plan-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 3.75rem;
}
#map {
  height: 500px;
  width: 800px;
}
</style>
