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
      <img
        class="greeting-main-img"
        src="@/assets/image/greeting-main-img.jpg"
      />
    </div>
  </div>
</template>

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
  font-family: Noto Sans;
  font-size: 0.75rem;
  font-style: normal;
  line-height: 0;
}

.greeting-main-text {
  width: 26.375rem;
  height: 7.5rem;
  flex-shrink: 0;
  color: #000;
  font-family: Noto Sans;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.greeting-main-img {
  width: 65rem;
  height: 28rem;
  border-radius: 0.625rem;
  background: lightgray -20.542px 0px / 138.787% 145.802% no-repeat;
  box-shadow: 4px 4px 4px 3px rgba(0, 0, 0, 0.03);
  margin-left: 5rem;
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
    display: none; /* 이미지 숨기기 */
    /* width: 100%;
        height: auto;
        margin-top: 20px; */
  }
}
</style>
