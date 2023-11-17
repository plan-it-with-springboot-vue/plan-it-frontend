<template>
  <div class="black-bg" v-if="attractionStore.modalVisible" @click="closeModal">
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
  /* padding: 20px; */
  z-index: 6;
  padding-top: 3.75rem;
}
.white-bg {
  width: 28.8125rem;
  /* height: 56rem; */
  /* background: white; */
  /* border-radius: 8px; */
  /* padding: 1rem; */
  /* position: relative; */
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
