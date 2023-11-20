<template>
  <TheHeaderVue />
  <div class="flex-box">
    <div id="plan-container">
      <LeftBox />
      <div id="map-container"><PlanKakaoMap /></div>
      <RightBox />
    </div>
    <button @click="sendPlan">완료</button>
  </div>
</template>

<script setup>
import axios from "axios";
import TheHeaderVue from "../components/layout/TheHeader.vue";
import LeftBox from "../components/plan/left/LeftBox.vue";
import PlanKakaoMap from "../components/plan/PlanKakaoMap.vue";
import RightBox from "../components/plan/right/RightBox.vue";
import { useDateStore, usePlanStore } from "../stores/store";

const planStore = usePlanStore();
const dateStore = useDateStore();

const sendPlan = () => {
  if (planStore.plan?.planDetail) {
    axios
      .post("http://localhost/plan/make", planStore.plan)
      .then((response) => {
        console.log("Plan sent successfully!", response.data);
        planStore.plan = null;
        dateStore.date = "";
      })
      .catch((error) => {
        console.error("Error sending plan:", error);
      });
  } else {
    alert("계획을 만들어 주세요!!");
  }
};
</script>

<style scoped>
.flex-box {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5.8rem;
  flex-direction: column;
}
#plan-container {
  display: flex;

  border-radius: 0.9125rem;
  border: 1.8px solid #eeeeee;
  /* width: 108.375rem; */
  width: 95%;
  box-shadow: 2px 2px 2px #c8c8c8;
}
#map-container {
  /* width: 42.4375rem; */
  width: 100%;
  height: 40.4375rem;
}
</style>
