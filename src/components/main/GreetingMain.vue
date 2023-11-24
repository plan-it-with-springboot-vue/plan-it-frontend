<template>
  <div class="greeting-main-background">
    <div class="greeting-main-container">
      <div class="greeting-main-text-container">
        <div class="greeting-main-speech-bubble">
          <p class="greeting-main-speech-bubble-text">여행 계획 서비스</p>
        </div>
        <p class="greeting-main-text">
          세상을 발견하는<br />가장 쉬운 방법,<br />당신만의 여행을 계획하세요.
        </p>
      </div>
      <div class="greeting-img-container">
        <img class="greeting-main-img" :src="currentImageUrl" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const images = ref([
  '/greeting_img_1.jpg',
  '/greeting_img_2.jpg',
  '/greeting_img_3.jpg',
  '/greeting_img_4.jpg',
  '/greeting_img_5.jpg',
]);
const currentImageIndex = ref(0);
const currentImageUrl = ref(images.value[0]); // 현재 이미지 URL

const updateImage = () => {
  currentImageUrl.value = images.value[currentImageIndex.value];
};

onMounted(() => {
  setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
    updateImage(); // 이미지 URL 업데이트
  }, 2000); // 2초마다 이미지 변경
});
</script>

<style scoped>
.greeting-main-background {
  display: flex;
  flex-direction: column;
  height: 24.1875rem;
  background-color: rgba(100, 153, 233, 0.13);
  width: 100%;
}

.greeting-main-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 2% 18%;
}

.greeting-main-text-container {
  display: flex;
  flex-direction: column;
  margin-top: -6rem;
}

.greeting-main-speech-bubble {
  width: 6.74419rem;
  height: 1.5625rem;
  flex-shrink: 0;
  border-radius: 0.625rem 0.9375rem 0.9375rem 0rem;
  background: #000;
  align-items: center;
  justify-content: center;
}

.greeting-main-speech-bubble-text {
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  /* font-family: Noto Sans; */
  font-size: 0.75rem;
  font-style: normal;
  line-height: 0;
}

.greeting-main-text {
  width: 26.375rem;
  height: 7.5rem;
  flex-shrink: 0;
  color: #000;
  /* font-family: Noto Sans; */
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.greeting-img-container {
  width: 45.9375rem;
  height: 28rem;
  flex-shrink: 0;
}

.greeting-main-img {
  width: 100%;
  /* 컨테이너의 폭에 맞게 */
  height: 100%;
  /* 컨테이너의 높이에 맞게 */
  object-fit: cover;
  /* 이미지 비율을 유지하면서 컨테이너를 완전히 채움 */
  border-radius: 0.3em;
  box-shadow: 4px 4px 4px 3px rgba(0, 0, 0, 0.03);
}

@media (max-width: 1024px) {
  .greeting-main-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .greeting-main-text-container {
    margin-top: 5rem;
  }

  .greeting-main-img {
    display: none;
    /* 이미지 숨기기 */
    /* width: 100%;
        height: auto;
        margin-top: 20px; */
  }
}
</style>
