<template>
  <div class="scrollable-container">
    <hr />
    <div v-for="attractionItem in attraction" :key="attractionItem.content_id">
      <div class="attraction-card">
        <div>
          <!-- <img
            :src="`/src/assets/image/${attractionItem.first_image}.png`"
            alt=""
          /> -->
          <img :src="`${attractionItem.first_image}`" alt="" />
        </div>
        <div class="attraction-card-content">
          <div>
            <div
              class="attraction-card-title line"
              @click="showModal(attractionItem)"
            >
              {{ attractionItem.title }}
            </div>
            <div class="line">
              <span class="attraction-card-category">관광지&nbsp;</span
              ><span class="attraction-card-address">{{
                attractionItem.addr1
              }}</span>
            </div>
          </div>
          <div class="line">
            <LikeVue
              class="like-svg"
              v-if="!attractionItem.isLike"
              @click="toggleLike(attractionItem)"
            />
            <LikeRedVue
              class="like-svg"
              v-else
              @click="toggleLike(attractionItem)"
            />
            <span class="like-number">{{ attractionItem.like }}</span>
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import LikeVue from "../../../assets/svg/Like.vue";
import LikeRedVue from "../../../assets/svg/LikeRed.vue";
import {
  useAttractionStore,
  useCategoryStore,
  useMapStore,
} from "../../../stores/store";

const attraction = ref([
  {
    content_id: 125266,
    content_type_id: 12,
    title: "국립 청태산자연휴양림",
    addr1: "강원도 횡성군 둔내면",
    first_image:
      "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
    latitude: 38.51112664,
    longitude: 128.4191502,
    like: 12,
    isLike: false, // 로그인된 정보로 동작하게 바꿔야함
  },
  {
    content_id: 125677,
    content_type_id: 12,
    title: "무릉계곡",
    addr1: "강원도 동해시 삼화로 538",
    first_image:
      "http://tong.visitkorea.or.kr/cms/resource/88/1955788_image2_1.jpg",
    latitude: 38.47884469,
    longitude: 128.4391216,
    like: 8,
    isLike: false,
  },
  {
    content_id: 125782,
    content_type_id: 12,
    title: "고석정국민관광지",
    addr1: "강원도 철원군",
    first_image:
      "http://tong.visitkorea.or.kr/cms/resource/62/219162_image2_1.jpg",
    latitude: 38.44084943,
    longitude: 128.4547464,
    like: 5,
    isLike: false,
  },
  {
    content_id: 125266,
    content_type_id: 12,
    title: "국립 청태산자연휴양림",
    addr1: "강원도 횡성군 둔내면",
    first_image:
      "http://tong.visitkorea.or.kr/cms/resource/83/1070183_image2_1.jpg",
    latitude: 38.34028704,
    longitude: 128.4999566,
    like: 22,
    isLike: false,
  },
  {
    content_id: 125266,
    content_type_id: 12,
    title: "국립 청태산자연휴양림",
    addr1: "강원도 횡성군 둔내면",
    first_image:
      "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
    latitude: 38.51112664,
    longitude: 128.4191502,
    like: 12,
    isLike: false, // 로그인된 정보로 동작하게 바꿔야함
  },
  {
    content_id: 125677,
    content_type_id: 12,
    title: "무릉계곡",
    addr1: "강원도 동해시 삼화로 538",
    first_image:
      "http://tong.visitkorea.or.kr/cms/resource/88/1955788_image2_1.jpg",
    latitude: 38.47884469,
    longitude: 128.4391216,
    like: 8,
    isLike: false,
  },
  {
    content_id: 125782,
    content_type_id: 12,
    title: "고석정국민관광지",
    addr1: "강원도 철원군",
    first_image:
      "http://tong.visitkorea.or.kr/cms/resource/62/219162_image2_1.jpg",
    latitude: 38.44084943,
    longitude: 128.4547464,
    like: 5,
    isLike: false,
  },
  {
    content_id: 125266,
    content_type_id: 12,
    title: "국립 청태산자연휴양림",
    addr1: "강원도 횡성군 둔내면",
    first_image:
      "http://tong.visitkorea.or.kr/cms/resource/83/1070183_image2_1.jpg",
    latitude: 38.34028704,
    longitude: 128.4999566,
    like: 22,
    isLike: false,
  },
]);

const attractionStore = useAttractionStore();

const showModal = (attractionItem) => {
  console.log("click");
  attractionStore.showModal(attractionItem);
};

const toggleLike = (attractionItem) => {
  attractionItem.isLike = !attractionItem.isLike;

  if (attractionItem.isLike) {
    attractionItem.like++;
  } else {
    attractionItem.like--;
  }
};

const mapStore = useMapStore();
mapStore.addAttractionList(attraction.value);

const categoryStore = useCategoryStore();
watch(
  () => categoryStore.selectedCategory,
  (newVal) => {
    console.log("Selected Category changed:", newVal);
  }
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
  align-items: center;
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
