<template>
  <div id="container">
    <div id="des-container">
      <div id="title-addr1">
        <h3>{{ attractionStore.selectedAttraction.title }}</h3>
        <span>{{ attractionStore.selectedAttraction.addr1 }}</span>
      </div>

      <!-- <p>content_id: {{ attractionStore.selectedAttraction.content_id }}</p> -->
      <div id="img-des">
        <img
          :src="`${attractionStore.selectedAttraction.first_image}`"
          alt=""
        />
        <div class="scrollable-container">
          <div id="des">
            <p>{{ description.overview }}</p>
          </div>
        </div>
      </div>
    </div>

    <p id="review">방문 후기</p>
    <div class="scrollable-container" id="comment">
      <ModalComment />
    </div>
  </div>
</template>

<script setup>
import { useAttractionStore } from "../../../stores/store";
import ModalComment from "./ModalComment.vue";
import { ref } from "vue";

const attractionStore = useAttractionStore();
const description = ref({
  content_id: 125266,
  overview:
    "바탕으로 한 국유림 경영 시범단지로서 숲속에는 온갖 야생 동식물이 고루 서식하고 있어 자연박물관을 찾은 기분을 느낄 수 있다. 영동고속도로 신갈기점 강릉방향 128km 지점에 위치하고 있어 여름철 동해안 피서객들이 잠시 쉬었다 가기에 편리하고, 청소년의 심신수련을 위한 숲속교실도 설치되어 있으며 울창한 잣나무 숲속의 산림욕장은 한번왔다간 사람은 누구나 매료되어 찾는 곳이기도 하다.,",
});
</script>

<style scoped>
h3 {
  font-size: 1.25rem;
}
span {
  color: #8c8c8c;
  font-size: 1rem;
  margin-left: 1rem;
}
p {
  font-size: 1rem;
  line-height: 170%;
  margin: 0;
}
img {
  margin-right: 2rem;
  border-radius: 1rem;
  width: 22rem;
}
#container {
  padding: 2rem;
}

#des-container {
  display: flex;
  flex-direction: column;
  width: rem;
}
#title-addr1 {
  display: flex;
  align-items: center;
}
#img-des {
  display: flex;
  height: 15rem;
}
#des {
  /* background-color: #6499e916; */
  /* padding: 1rem 1rem; */
}

#user-id {
  margin: 0rem 0.15rem;
  font-weight: 700;
  color: black;
}

#review {
  margin-top: 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #6499e9;
}

#comment {
  height: 25rem;
}

.scrollable-container {
  overflow-y: auto;
  overflow-x: hidden;
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
