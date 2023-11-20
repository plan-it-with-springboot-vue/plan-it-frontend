<template>
  <div class="scrollable-container">
    <hr />
    <div v-for="attractionItem in attraction" :key="attractionItem.contentId">
      <div class="attraction-card">
        <div>
          <!-- <img
            :src="`/src/assets/image/${attractionItem.first_image}.png`"
            alt=""
          /> -->
          <img :src="`${attractionItem.firstImage}`" alt="" />
        </div>
        <div class="attraction-card-content">
          <div>
            <div
              class="attraction-card-title line"
              @click="showLocation(attractionItem)"
            >
              {{ attractionItem.title }}
            </div>
            <div class="line">
              <span
                v-if="attractionItem.contentTypeId === 12"
                class="attraction-card-category"
                >관광지&nbsp;</span
              >
              <span
                v-else-if="attractionItem.contentTypeId === 14"
                class="attraction-card-category"
                >문화시설&nbsp;</span
              >
              <span
                v-else-if="attractionItem.contentTypeId === 15"
                class="attraction-card-category"
                >축제공연&nbsp;</span
              >
              <span
                v-else-if="attractionItem.contentTypeId === 25"
                class="attraction-card-category"
                >여행코스&nbsp;</span
              >
              <span
                v-else-if="attractionItem.contentTypeId === 28"
                class="attraction-card-category"
                >레포츠&nbsp;</span
              >
              <span
                v-else-if="attractionItem.contentTypeId === 32"
                class="attraction-card-category"
                >숙박&nbsp;</span
              >
              <span
                v-else-if="attractionItem.contentTypeId === 38"
                class="attraction-card-category"
                >쇼핑&nbsp;</span
              >
              <span
                v-else-if="attractionItem.contentTypeId === 39"
                class="attraction-card-category"
                >음식점&nbsp;</span
              ><span class="attraction-card-address">{{
                attractionItem.addr1
              }}</span>
            </div>
          </div>
          <div v-if="!hasPlan" class="line" id="plus-svg">
            <BlockPlusIcon />
          </div>
          <div
            v-else
            class="line"
            id="plus-svg"
            @click="clickPlusIcon(attractionItem)"
          >
            <div><PlusIconVue /></div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, ref } from "vue";
import PlusIconVue from "../../../assets/svg/PlusIcon.vue";
import BlockPlusIcon from "../../../assets/svg/BlockPlusIcon.vue";
import {
  useDateStore,
  useMapStore,
  usePlanStore,
  useLocation,
  useFavoriteStores,
} from "../../../stores/store";

const attraction = ref([]);

const mapStore = useMapStore();
const locationStore = useLocation();

const showLocation = (attractionItem) => {
  locationStore.selectLocation(attractionItem);
};

// 계획
const planStore = usePlanStore();
const dateStore = useDateStore();

const clickPlusIcon = (attractionItem) => {
  const planDate = dateStore.date;
  const time = null;

  planStore.addPlanDetail(attractionItem, planDate, time);

  // 지도 마커를 위해 저장
  mapStore.addAttractionList([...mapStore.selectedLocation, attractionItem]);

  console.log(attractionItem);
};

const favoritesStore = useFavoriteStores();

axios
  .get(`http://localhost/attraction/like`, {
    params: {
      userId: "ssafy",
    },
  })
  .then((response) => {
    // console.log("API Response:", response.data);
    favoritesStore.favorites = response.data;
    attraction.value = response.data;
    // console.log(response.data);
  })
  .catch((error) => {
    console.error("API Error:", error);
  });

const hasPlan = computed(() => {
  const plan = planStore.plan;
  return plan ? Object.keys(plan).length > 0 : false;
});
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
#plus-svg {
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
.like-svg {
  margin-right: 0.25rem;
  cursor: pointer;
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
