<template>
  <TheHeaderVue />
  <div class="flex-box">
    <div id="plan-container">
      <LeftBox />
      <div id="map-container"><PlanKakaoMap /></div>
      <RightBox />
    </div>
    <div id="btn"><button @click="sendPlan">완료</button></div>
    <div id="plan-preview-title"><h2>계획 미리보기</h2></div>
    <hr />
    <div id="plan-preview-container"><PlanPreview /></div>
  </div>
</template>

<script setup>
import axios from "axios";
import TheHeaderVue from "../components/layout/TheHeader.vue";
import LeftBox from "../components/plan/left/LeftBox.vue";
import PlanKakaoMap from "../components/plan/PlanKakaoMap.vue";
import RightBox from "../components/plan/right/RightBox.vue";
import { useDateStore, useLocation, usePlanStore } from "../stores/store";
import PlanPreview from "../components/plan/PlanPreview.vue";

const planStore = usePlanStore();
const dateStore = useDateStore();
const locationStore = useLocation();

locationStore.location = null;

const sendPlan = () => {
  if (planStore.plan?.planDetail) {
    axios
      .post("http://localhost/plan/make", planStore.plan)
      .then((response) => {
        console.log("Plan sent successfully!", response.data);
        planStore.plan = null;
        planStore.sequence = 0;
        dateStore.date = "";
      })
      .catch((error) => {
        console.error("Error sending plan:", error);
      });
    // 마이페이지로 이동
  } else {
    alert("계획을 만들어 주세요!!");
  }
};
</script>

<style scoped>
hr {
  width: 80%;
  margin: 0;
  color: #c8c8c8;
}
#plan-preview-container {
  margin: 0 0 2rem 0;
}
#plan-preview-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  margin-top: 2rem;
}
#btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80%;
  margin: 1rem 0 0rem 0;
}
button {
  background-color: #6499e9;
  border: none;
  color: white;
  width: 9rem;
  height: 2.5rem;
  border-radius: 0.35rem;
  font-size: 1.25rem;
}
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

  border-radius: 0.3125rem;
  border: 1.8px solid #c7c7c7;
  /* width: 108.375rem; */
  width: 80%;
  /* box-shadow: 2px 2px 2px #c8c8c8; */
}
#map-container {
  /* width: 42.4375rem; */
  width: 100%;
  height: 40.4375rem;
}
</style>
