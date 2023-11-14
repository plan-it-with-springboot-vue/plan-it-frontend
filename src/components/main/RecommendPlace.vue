<template>
  <div id="recommend-place-container">
    <h2 id="recommend-place">추천 여행지</h2>
    <p id="recommend-place-description">
      아름다운 가을, 래니가 추천 해주는 여행지로 떠나보세요!
    </p>
    <div>
      <div class="recommend-place-cards">
        <LeftArrowVue />
        <div class="recommend-place-card" v-for="l in lo" :key="l.location">
          <img
            id="recommend-place-img"
            :src="`src/assets/image/${l.img}.png`"
          />
          <p id="recommend-place-title">{{ l.title }}</p>
        </div>
        <RightArrowVue />
      </div>
    </div>
  </div>
</template>

<script setup>
import LeftArrowVue from "../../assets/svg/LeftArrow.vue";
import RightArrowVue from "../../assets/svg/RightArrow.vue";

const lo = [
  {
    location: "서울시, 강남구",
    title: "알프스 산맥",
    content: "보기만 해도 시원한 알프스 산맥",
    img: "rp_1",
  },
  {
    location: "부산 광역시, 해운대구",
    title: "타이페이 항구",
    content: "노을이 멋진 타이페이 항구",
    img: "rp_2",
  },
  {
    location: "전라남도, 담양군 ",
    title: "담양 담풍길",
    content: "알록달록 단풍나무",
    img: "rp_3",
  },
  {
    location: "충청북도, 충주시",
    title: "중앙 탑공원",
    content: "중앙 탑공원, 7층 석탑",
    img: "rp_4",
  },
];
</script>

<style scoped>
p {
  margin: 0;
  font-size: 1rem;
}

#recommend-place-container {
  display: flex;
  flex-direction: column;
  margin: 4.44rem 11.56rem 18.19rem 11.56rem;
  width: 66.875rem;
}

#recommend-place {
  font-size: 2rem;
  margin-bottom: 0.88rem;
  font-weight: 700;
}

#recommend-place-description {
  margin-bottom: 2.88rem;
}

.recommend-place-cards {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recommend-place-card {
  text-align: center;
  font-size: 1rem;
}

img {
  width: 13.75rem;
  height: 18.75rem;
  border-radius: 0.3125rem;
}
</style>
