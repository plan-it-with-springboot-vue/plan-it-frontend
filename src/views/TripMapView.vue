<template>
  <TheHeaderVue />
  <div id="trip-map-view-container">
    <div id="left-container">
      <div id="left-first">
        <ConditionBoxVue />
        <CardBoxVue />
      </div>
      <div id="left-second" v-if="attractionStore.modalVisible">
        <ModalBoxVue />
      </div>
    </div>
    <div id="right-container">
      <KakaoMapVue />
    </div>
    <!-- <ModalBoxVue v-if="attractionStore.modalVisible" /> -->
  </div>
</template>

<script setup>
import { useAttractionStore, useFavoriteStores } from "../stores/store";

import ConditionBoxVue from "../components/map/condition/ConditionBox.vue";
import CardBoxVue from "../components/map/attraction/CardBox.vue";
import KakaoMapVue from "../components/map/KakaoMap.vue";
import ModalBoxVue from "../components/map/attraction/ModalBox.vue";
import TheHeaderVue from "../components/layout/TheHeader.vue";
import axios from "axios";

const attractionStore = useAttractionStore();
const favoritesStore = useFavoriteStores();

axios
  .get(`${BASE_URL}/attraction/like`, {
    params: {
      userId: "ssafy",
    },
  })
  .then((response) => {
    // console.log("API Response:", response.data);
    favoritesStore.favorites = response.data;
    console.log(favoritesStore.favorites);
  })
  .catch((error) => {
    console.error("API Error:", error);
  });
</script>

<style scoped>
#left-container {
  display: flex;
  /* padding-top: 3.75rem; */
  width: 20.8125rem;
  height: 100vh;
  /* width: 20vw; */
  background-color: gray;
}
#left-first {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  z-index: 6;
  background-color: white;
}
#left-second {
  display: flex;
  /* width: 20vw; */
  height: 100%;
}
#right-container {
  height: 100vh;
  width: 83vw;
}
#trip-map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 3.75rem;
  width: 100vw;
  height: 100vh;
}

#trip-map-view-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
}
</style>
