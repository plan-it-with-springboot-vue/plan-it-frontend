<template>
  <div id="recommend-place-container">
    <div id="recommend-place-title-box">
      <p id="recommend-place">추천 여행지</p>
    </div>
    <div id="recommend-place-description-box">
      <p id="recommend-place-description">
        랜덤으로 추천 해주는 여행지로 떠나보세요!
      </p>
    </div>
    <div>
      <div class="recommend-place-cards">
      <LeftArrowVue class="button" @click="previousImage" />
      <div class="recommend-place-card" v-for="n in 4" :key="n">
        <div v-if="getImage(currentStartIndex + n - 1)">
          <div id="recommend-place-img-box">
            <!-- 이미지가 있을 경우 -->
            <img v-if="getImage(currentStartIndex + n - 1).firstImage"
                 :src="getImage(currentStartIndex + n - 1).firstImage"
                 :alt="getImage(currentStartIndex + n - 1).title"
                 id="recommend-place-img">
            <!-- 이미지가 없을 경우 -->
            <img v-else
                 src="@/assets/image/plan-it-logo-background.png"
                 alt="이미지 없음"
                 id="recommend-place-img-no">
          </div>
          <div id="recommend-place-content-box">
            <p id="recommend-place-title">{{ getImage(currentStartIndex + n - 1).title }}</p>
          </div>
        </div>
      </div>
      <RightArrowVue class="button" @click="nextImage" />
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import LeftArrowVue from "../../assets/svg/LeftArrow.vue";
import RightArrowVue from "../../assets/svg/RightArrow.vue";

const lo = ref([]);
// const router = useRouter();
const currentStartIndex = ref(0);

const getImage = (index) => {
  return lo.value[index % lo.value.length]; // 순환 로직
};

// 이전 이미지로 이동
const previousImage = () => {
  currentStartIndex.value = (currentStartIndex.value - 1 + lo.value.length) % lo.value.length;
};

// 다음 이미지로 이동
const nextImage = () => {
  currentStartIndex.value = (currentStartIndex.value + 1) % lo.value.length;
};

//추천 관광지 가져오기
const getPopularlist = async () => {
  try {
    const response = await axios.get(`http://localhost/attraction/recommendlist`);
    lo.value = response.data;
  } catch (error) {
    console.error('추천 관광지 가져오기 오류', error);
  }
};
const navigateToMap = () => {
  router.push('/map'); // /map 페이지로 이동
};
onMounted(getPopularlist);

</script>

<style scoped>
p {
  margin: 0;
  font-size: 1rem;
}

#recommend-place-container {
  width: 66.75rem;
  height: 24.9375rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  padding: 18.44rem 11.56rem 0rem 11.56rem;
  margin-bottom: 10rem;
}

#recommend-place-title-box {
  width: 66.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  margin-bottom: 0.87rem;
}

#recommend-place {
  color: #000;
  font-size: 2rem;
  font-weight: 700;
  font-size: 2rem;
  font-weight: 700;
}

#recommend-place-description-box {
  width: 66.75rem;
  height: 4.5625rem;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-content: center;
}

#recommend-place-description {
  color: #000;
  font-size: 1rem;
  font-weight: 400;
}

.recommend-place-cards {
  width: 65.375rem;
  height: 20.375rem;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.recommend-place-card {
  width: 13.625rem;
  height: 20.375rem;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 3.37rem;
  flex-direction: column;
}

#recommend-place-content-box {
  width: 13.75rem;
  height: 1.375rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#recommend-place-title {
  color: #000;
  font-size: 1.1rem;
  font-weight: 500;
}

.button {
  cursor: pointer;
}

#recommend-place-img-box {
  width: 13.75rem;
  height: 18.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  background-color: #C8C8C8;
}

#recommend-place-img {
  width: 13.75rem;
  height: 18.75rem;
  border-radius: 0.3125rem;
  transition: transform 0.3s ease;
}

#recommend-place-img:hover, #recommend-place-img-no:hover{
  transform: scale(1.05); /* 마우스 오버시 이미지 확대 */
}

#recommend-place-img-no {
  width: 13.75rem;
  height: 18.75rem;
  border-radius: 0.3125rem;
  transition: transform 0.3s ease;
  cursor: pointer;
}
</style>
