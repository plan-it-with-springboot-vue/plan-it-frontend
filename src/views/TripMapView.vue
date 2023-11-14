<template>
  <TheHeaderVue />
  <div id="trip-map-view-container">
    <div id="left-container">
      <ConditionBoxVue />
      <CardBoxVue />
    </div>
    <div id="right-container">
      <KakaoMapVue />
    </div>
    <ModalBoxVue v-if="attractionStore.modalVisible" />
  </div>
</template>

<script setup>
import { useAttractionStore } from "../stores/store";

import ConditionBoxVue from "../components/map/condition/ConditionBox.vue";
import CardBoxVue from "../components/map/attraction/CardBox.vue";
import KakaoMapVue from "../components/map/KakaoMap.vue";
import ModalBoxVue from "../components/map/attraction/ModalBox.vue";
import TheHeaderVue from "../components/layout/TheHeader.vue";

const attractionStore = useAttractionStore();
</script>

<style scoped>
#left-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* padding-top: 3.75rem; */
  width: 20vw;
  height: 100vh;
}
#right-container {
  height: 100vh;
  width: 80vw;
}
#trip-map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 3.75rem;
  width: 20vw;
  height: 100vh; /* 부모 요소의 높이를 100%로 설정 */
}

#trip-map-view-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
