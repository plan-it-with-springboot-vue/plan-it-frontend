<template>
  <div id="popular-place-container">
    <h2 id="popular-place">인기 여행지</h2>
    <p id="popular-place-description">
      사람들이 관심있어 하는 인기 여행지로 떠나보세요!
    </p>
    <div class="popular-place-cards">
      <div class="popular-place-card" v-for="l in lo" :key="l.location">
        <img id="popular-place-img" :src="`src/assets/image/${l.img}.png`" />
        <div id="popular-place-address">
          <Location />
          <span>{{ l.location }}</span>
        </div>
        <p id="popular-place-title">{{ l.title }}</p>
        <p id="popular-place-content">{{ l.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Location from "/src/assets/svg/Location.vue";
const lo = [
  {
    location: "서울시, 강남구",
    title: "알프스 산맥",
    content: "보기만 해도 시원한 알프스 산맥",
    img: "pp_1",
  },
  {
    location: "부산 광역시, 해운대구",
    title: "타이페이 항구",
    content: "노을이 멋진 타이페이 항구",
    img: "pp_2",
  },
  {
    location: "전라남도, 담양군 ",
    title: "담양 담풍길",
    content: "알록달록 단풍나무",
    img: "pp_3",
  },
  {
    location: "충청북도, 충주시",
    title: "중앙 탑공원",
    content: "중앙 탑공원, 7층 석탑",
    img: "pp_4",
  },
  {
    location: "서울시, 강남구",
    title: "알프스 산맥",
    content: "보기만 해도 시원한 알프스 산맥",
    img: "pp_1",
  },
  {
    location: "부산 광역시, 해운대구",
    title: "타이페이 항구",
    content: "노을이 멋진 타이페이 항구",
    img: "pp_2",
  },
  {
    location: "전라남도, 담양군 ",
    title: "담양 담풍길",
    content: "알록달록 단풍나무",
    img: "pp_3",
  },
  {
    location: "충청북도, 충주시",
    title: "중앙 탑공원",
    content: "중앙 탑공원, 7층 석탑",
    img: "pp_4",
  },
];
</script>

<style scoped>
p {
  margin: 0;
  font-size: 1rem;
}

#popular-place-container {
  display: flex;
  flex-direction: column;
  padding: 18.44rem 11.56rem 0rem 11.56rem;
  width: 66.875rem;
}

#popular-place {
  font-size: 2rem;
  margin-bottom: 0.88rem;
  font-weight: 700;
}

#popular-place-description {
  margin-bottom: 2.88rem;
}

.popular-place-cards {
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;
}

.popular-place-card {
  margin-bottom: 3.37rem;
}

#popular-place-img {
  width: 15rem;
  height: 12.25rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background-color: aliceblue;
  margin: 0.5rem 0;
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #f29561;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

span {
  padding: 0 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
}
</style>
