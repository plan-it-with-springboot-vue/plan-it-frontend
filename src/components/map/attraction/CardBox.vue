<template>
  <div v-if="attraction.length === 0">
    <p>검색 결과 없음</p>
  </div>
  <div v-else class="scrollable-container">
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
              @click="showModal(attractionItem)"
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
              >
              <span class="attraction-card-address">{{
                attractionItem.addr1
              }}</span>
            </div>
          </div>
          <div class="line">
            <div
              v-if="!favoritesStore || favoritesStore.favorites.length === 0"
            >
              <LikeVue
                class="like-svg"
                @click="likeAttraction(attractionItem)"
              />
            </div>
            <template v-else>
              <div
                v-if="
                  favoritesStore.favorites.find(
                    (item) => item.contentId === attractionItem.contentId
                  )
                "
              >
                <LikeRedVue
                  class="like-svg"
                  @click="deleteLike(attractionItem)"
                />
              </div>
              <div v-else>
                <LikeVue
                  class="like-svg"
                  @click="likeAttraction(attractionItem)"
                />
              </div>
            </template>
            <!-- <span class="like-number">{{ attractionItem.like }}</span> -->
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
import axios from "axios";
import {
  useAttractionStore,
  useCategoryStore,
  useFavoriteStores,
  useLocation,
  useMapStore,
} from "../../../stores/store";

const attraction = ref([]);

const attractionStore = useAttractionStore();

const locationStore = useLocation();

const showModal = (attractionItem) => {
  locationStore.selectLocation(attractionItem);
  attractionStore.showModal(attractionItem);

  console.log(attractionStore.selectedAttraction);
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

    const { contentTypeId, sidoCode, gugunCode } = newVal;

    // Axios를 사용하여 API 호출
    // const BASE_URL = process.env.VUE_APP_BASE_URL;
    axios
      .get(`/attraction/list`, {
        params: {
          sidoCode: sidoCode,
          gugunCode: gugunCode,
          contentTypeId: contentTypeId.join(","),
        },
      })
      .then((response) => {
        // console.log("API Response:", response.data);
        if (Array.isArray(response.data) && response.data.length === 0) {
          attraction.value = [];
        } else {
          attraction.value = response.data;
        }
        mapStore.addAttractionList(attraction.value);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }
);

const favoritesStore = useFavoriteStores();

const likeAttraction = async (attractionItem) => {
  try {
    const response = await axios.post("http://localhost/attraction/like", {
      userId: "ssafy",
      contentId: attractionItem.contentId,
    });

    favoritesStore.favorites.push({
      userId: "ssafy",
      contentId: attractionItem.contentId,
    });
    // console.log(favoritesStore.favorites);
  } catch (error) {
    console.error("Error while liking the attraction:", error);
  }
};

const deleteLike = async (attractionItem) => {
  try {
    const response = await axios
      .delete(`http://localhost/attraction/like`, {
        params: {
          userId: "ssafy",
          contentId: attractionItem.contentId,
        },
      })
      .then((response) => {
        favoritesStore.favorites = favoritesStore.favorites.filter(
          (item) => item.contentId !== attractionItem.contentId
        );

        // console.log(favoritesStore.favorites);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  } catch (error) {
    console.error("Error while liking the attraction:", error);
  }
};
</script>

<style scoped>
.attraction-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* width: 20.8125rem; */
  width: 100%;
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
  /* height: 80vw; */
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
