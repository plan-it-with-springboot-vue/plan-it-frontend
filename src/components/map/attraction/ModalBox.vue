<template>
  <div class="black-bg">
    <div class="white-bg" @click.stop>
      <div class="close-button" @click="closeModal"><CloseButton /></div>
      <ModalDetail />
    </div>
  </div>
</template>

<script setup>
import { useAttractionStore, useLocation } from "../../../stores/store";
import CloseButton from "../../../assets/svg/CloseButton.vue";
import ModalDetail from "./ModalDetail.vue";

const attractionStore = useAttractionStore();
const locationStore = useLocation();

const closeModal = () => {
  attractionStore.closeModal();
  locationStore.initLocation();
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
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 77px;
}
</style>
