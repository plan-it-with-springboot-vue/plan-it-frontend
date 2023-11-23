<template>
  <div class="black-bg">
    <div class="white-bg" @click.stop>
      <div class="close-button" @click="closeModal"><CloseButton /></div>
      <ModalDetail />
    </div>
  </div>
</template>

<script setup>
import { useAttractionStore } from "../../../stores/store";
import CloseButton from "../../../assets/svg/CloseButton.vue";
import ModalDetail from "./ModalDetail.vue";

const attractionStore = useAttractionStore();

const closeModal = () => {
  console.log("click");
  attractionStore.closeModal();
};
</script>

<style scoped>
div {
  box-sizing: border-box;
}
.black-bg {
  display: flex;
  /* width: 100%; */
  height: 100%;
  /* background: rgba(0, 0, 0, 0.5); */
  position: fixed;
  z-index: 6;
  padding-top: 3.75rem;
}
.white-bg {
  width: 25.8125rem;
  background-color: white;
  z-index: 6;
}

.close-button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: fixed;
  right: calc(50% + 7.1rem);
  top: 60px;
  background-color: white;
  padding: 0.4rem;
  border-radius: 0 0.5rem 0.5rem 0; /* 오른쪽 상단과 하단에만 border radius 적용 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* 그림자 추가 */
}
</style>
