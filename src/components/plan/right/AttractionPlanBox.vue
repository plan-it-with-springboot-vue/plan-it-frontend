<template>
  <div class="scrollable-container">
    <hr />
    <div
      v-for="detailItem in currentDatePlanDetail"
      :key="detailItem.attraction.contentId"
    >
      <div class="attraction-card">
        <div>
          <!-- <img
            :src="`/src/assets/image/${attractionItem.first_image}.png`"
            alt=""
          /> -->
          <img :src="`${detailItem.attraction.firstImage}`" alt="" />
        </div>
        <div class="attraction-card-content">
          <div>
            <div
              class="attraction-card-title line"
              @click="showLocation(detailItem.attraction)"
            >
              {{ detailItem.attraction.title }}
            </div>
            <div class="line">
              <span
                v-if="detailItem.attraction.contentTypeId === 12"
                class="attraction-card-category"
                >관광지&nbsp;</span
              >
              <span
                v-else-if="detailItem.attraction.contentTypeId === 14"
                class="attraction-card-category"
                >문화시설&nbsp;</span
              >
              <span
                v-else-if="detailItem.attraction.contentTypeId === 15"
                class="attraction-card-category"
                >축제공연&nbsp;</span
              >
              <span
                v-else-if="detailItem.attraction.contentTypeId === 25"
                class="attraction-card-category"
                >여행코스&nbsp;</span
              >
              <span
                v-else-if="detailItem.attraction.contentTypeId === 28"
                class="attraction-card-category"
                >레포츠&nbsp;</span
              >
              <span
                v-else-if="detailItem.attraction.contentTypeId === 32"
                class="attraction-card-category"
                >숙박&nbsp;</span
              >
              <span
                v-else-if="detailItem.attraction.contentTypeId === 38"
                class="attraction-card-category"
                >쇼핑&nbsp;</span
              >
              <span
                v-else-if="detailItem.attraction.contentTypeId === 39"
                class="attraction-card-category"
                >음식점&nbsp;</span
              ><span class="attraction-card-address">{{
                detailItem.attraction.addr1
              }}</span>
            </div>
          </div>
          <div class="line" id="trash-svg">
            <div @click="deleteAttractionPlanCard(detailItem.attraction)">
              <TrashIconVue />
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import TrashIconVue from "../../../assets/svg/TrashIcon.vue";
import {
  useMapStore,
  usePlanStore,
  useDateStore,
  useLocation,
} from "../../../stores/store";

const currentDatePlanDetail = ref([]);

const locationStore = useLocation();

// 작동 안됨
const showLocation = (attractionItem) => {
  console.log("click");
  locationStore.selectLocation(attractionItem);
};

const mapStore = useMapStore();
mapStore.addAttractionList(currentDatePlanDetail.value);

// 계획 관광지 카드 삭제
const deleteAttractionPlanCard = (attractionItem) => {
  planStore.deletePlanDetail(attractionItem.contentId, dateStore.date);
  mapStore.deleteAttractionItem(attractionItem.contentId);
};

// 계획 추가
const planStore = usePlanStore();
const dateStore = useDateStore();

watch(
  () => planStore.plan,
  (newPlan) => {
    const matchingAttractions = newPlan?.planDetail.filter(
      (detailItem) => detailItem.planDate === dateStore.date
    );

    currentDatePlanDetail.value = matchingAttractions;
    // console.log("attract plan box : ");
    console.log(currentDatePlanDetail.value);
    console.log(planStore.plan);
  },
  // watch는 shallow임!! deep으로 해주기
  { deep: true }
);

watch(
  () => dateStore.date,
  () => {
    if (planStore.plan?.planDetail) {
      const matchingAttractions = planStore.plan.planDetail.filter(
        (detailItem) => detailItem.planDate === dateStore.date
      );
      currentDatePlanDetail.value = matchingAttractions;
      // console.log("attract plan box : ");
      // console.log(currentDatePlanDetail.value);
      // console.log(planStore.plan);
    }
  },
  // watch는 shallow임!! deep으로 해주기
  { deep: true }
);
</script>

<style scoped>
.attraction-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 20.8125rem;
  height: 5.75rem;
  margin: 0.62rem 0rem;
}
.line {
  display: flex;
}
#trash-svg {
  display: flex;
  justify-content: flex-end;
  margin-right: 0.5rem;
  cursor: pointer;
}
.attraction-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  cursor: pointer;
}
.attraction-card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 4.5rem;
  width: 20.8125rem;
}
span {
  font-size: 0.75rem;
}
hr {
  height: 0.03125rem;
  background-color: #c8c8c8;
  border: 0;
  margin: 0;
}
.attraction-card-1 {
  font-size: 1rem;
}
.attraction-card-category {
  color: #6499e9;
}
.attraction-card-address {
  color: #8c8c8c;
}
img {
  width: 4.9rem;
  height: 4.9rem;
  border-radius: 0.625rem;
  margin: 0 1rem;
}
.scrollable-container {
  height: auto;
  overflow-y: auto;
  /* height: 34.5rem; */
  height: 80vw;
  /* width: 20vw; */
  overflow-x: hidden;
}
.scrollable-container::-webkit-scrollbar {
  width: 6px;
}
.scrollable-container::-webkit-scrollbar-track {
  background-color: #e6e6e6;
}

.scrollable-container::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #c2c2c2;
}
</style>
