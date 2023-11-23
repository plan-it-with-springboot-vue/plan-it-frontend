<template>
  <div class="black-bg">
    <div class="white-bg" @click.stop>
      <ModalDetail />
    </div>
    <div class="close-button" @click="closeModal"><CloseButton /></div>
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
  width: 28.8125rem;
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
  background-color: white;
  padding: 0.4rem;
  border-radius: 0 0.5rem 0.5rem 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 5;
  width: 3rem;
  height: 3rem;
}
</style>
