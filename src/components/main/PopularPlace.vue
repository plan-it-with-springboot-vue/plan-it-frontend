<template>
  <div id="popular-place-container">
    <div id="popular-place-title-box">
      <p id="popular-place">인기 여행지</p>
    </div>
    <div id="popular-place-description-box">
      <p id="popular-place-description">
        사람들이 관심있어 하는 인기 여행지로 떠나보세요!
      </p>
    </div>
    <div class="popular-place-cards">
      <div class="popular-place-card" v-for="l in lo" :key="l.contentId">
        <div id="popular-place-img-box" @click="navigateToMap">
          <img v-if="l.firstImage" id="popular-place-img" :src="l.firstImage" />
          <img v-else id="popular-place-no-img" src="@/assets/image/plan-it-logo-background.png" />
        </div>
        <div id="popular-place-address">
          <Location id="popular-place-address-img"/>
          <p id="popular-place-address-text">{{ l.addr1 }}</p>
        </div>
        <div id="popular-place-content-box">
          <p id="popular-place-title">{{ l.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Location from "/src/assets/svg/Location.vue";

const lo = ref([]);
const router = useRouter();

//인기 관광지 가져오기
const getPopularlist = async () => {
  try {
    const response = await axios.get(`http://localhost/attraction/popularlist`);
    lo.value = response.data;
  } catch (error) {
    console.error('인기 관광지 가져오기 오류', error);
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

#popular-place-container {
  width: 66.75rem;
  height: 43.375rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  padding: 18.44rem 11.56rem 0rem 11.56rem;
}

#popular-place-title-box {
  width: 66.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  margin-bottom: 0.87rem;
}

#popular-place {
  color: #000;
  font-size: 2rem;
  font-weight: 700;
  font-size: 2rem;
  font-weight: 700;
}

#popular-place-description-box {
  width: 66.75rem;
  height: 4.5625rem;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-content: center;
}

#popular-place-description {
  color: #000;
  font-size: 1rem;
  font-weight: 400;
}

.popular-place-cards {
  width: 66.875rem;
  height: 39.0625rem;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.popular-place-card {
  width: 15.9375rem;
  height: 16.625rem;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 3.37rem;
  flex-direction: column;
}

#popular-place-img-box {
  width: 15rem;
  height: 12.25rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  background-color: #C8C8C8;
}

#popular-place-img {
  width: 15rem;
  height: 12.25rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  transition: transform 0.3s ease; /* 부드러운 전환 효과 */
  cursor: pointer;
}
#popular-place-no-img {
  width: 15rem;
  height: 12.25rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  transition: transform 0.3s ease; /* 부드러운 전환 효과 */
  cursor: pointer;
}
#popular-place-img:hover, #popular-place-no-img:hover {
  transform: scale(1.05); /* 마우스 오버시 이미지 확대 */
}
#popular-place-content-box {
  width: 15rem;
height: 3.8125rem;
flex-shrink: 0;
display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
#popular-place-title {
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
}

#popular-place-content {
  color: #8c8c8c;
}

#popular-place-address {
  width: 15rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #f29561;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}
#popular-place-address-img {
  width: 0.808rem;
height: 1.05206rem;
flex-shrink: 0;
margin-right: 0.2rem;
}
#popular-place-address-text {
  color: #F29561;
font-size: 0.875rem;
font-weight: 400;
}
#popular-place-title {
  color: #000;
font-size: 1.2rem;
font-style: normal;
font-weight: 600;
line-height: normal;
}
</style>
