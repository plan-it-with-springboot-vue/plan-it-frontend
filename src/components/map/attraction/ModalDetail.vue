<template>
  <div id="container">
    <div id="des-container">
      <div class="img-container">
        <img
          :src="`${attractionStore.selectedAttraction?.firstImage}`"
          alt=""
        />
      </div>

      <div id="title-addr1">
        <h3>{{ attractionStore.selectedAttraction?.title }}</h3>
        <span>{{ attractionStore.selectedAttraction?.addr1 }}</span>
      </div>

      <!-- <p>content_id: {{ attractionStore.selectedAttraction.content_id }}</p> -->
      <div id="des">
        <div class="scrollable-container">
          <p>{{ attractionStore.selectedAttractionDes?.overview }}</p>
        </div>
      </div>
    </div>

    <p id="review-p">방문 후기</p>
    <div id="review">
      <div class="scrollable-container" id="comment">
        <ModalComment />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAttractionStore } from "../../../stores/store";
import ModalComment from "./ModalComment.vue";

const attractionStore = useAttractionStore();
</script>

<style scoped>
h3 {
  font-size: 1.25rem;
  margin: 0.2rem 0rem 0.2rem 0rem;
}
span {
  color: #8c8c8c;
  font-size: 1rem;
  /* margin-left: 1rem; */
  /* margin-bottom: 1rem; */
}
p {
  font-size: 1rem;
  line-height: 170%;
  margin: 0;
}
img {
  display: flex;
  margin-right: 2rem;
  border-radius: 1rem;
  /* width: 20.8125rem; */
  width: 100%;
  max-height: 15rem;
}
#container {
  /* padding: 1rem; */
}

.img-container {
  padding: 0.8rem;
}

#des-container {
  display: flex;
  flex-direction: column;
  /* width: rem; */
}
#title-addr1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.8rem;
}
#img-des {
  display: flex;
  flex-direction: column;
  /* height: 22.9rem; */
  justify-content: center;
  align-content: center;
}
#des {
  /* background-color: #6499e916; */
  /* padding: 1rem 1rem; */
  height: 6.9rem;
}

#user-id {
  margin: 0rem 0.15rem;
  font-weight: 700;
  color: black;
}

#review-p {
  font-size: 1.25rem;
  font-weight: 700;
  color: #6499e9;
  margin-top: 2rem;
  padding: 0rem 0.8rem;
}

#review {
  height: 21.82rem;
}

#comment {
  /* height: 25rem; */
}

.scrollable-container {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  padding: 0.8rem;
}
.scrollable-container::-webkit-scrollbar {
  width: 6px;
}
.scrollable-container::-webkit-scrollbar-track {
  background-color: #e6e6e6;
}

.scrollable-container::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #c2c2c2;
}
</style>
