<template>
  <TheHeaderVue />
  <div class="flex-box">
    <div id="plan-container">
      <LeftBox />
      <!-- <div id="map"><PlanKakaoMap /></div> -->
      <RightBox />
    </div>
  </div>
  <CalTest />
</template>

<script setup>
import TheHeaderVue from "../components/layout/TheHeader.vue";
import LeftBox from "../components/plan/left/LeftBox.vue";
import PlanKakaoMap from "../components/plan/PlanKakaoMap.vue";
import RightBox from "../components/plan/right/RightBox.vue";
import CalTest from "../components/plan/right/CalTest.vue";
</script>

<style scoped>
.flex-box {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5.8rem;
}
#plan-container {
  display: flex;

  border-radius: 0.9125rem;
  border: 1.8px solid #eeeeee;
  width: 87.375rem;
  box-shadow: 2px 2px 2px #c8c8c8;
}
#map {
  /* width: 42.4375rem; */
  width: 100%;
  height: 40.4375rem;
}
</style>
