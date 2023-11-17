<template>
  <div id="container">
    <div id="des-container">
      <div id="title-addr1">
        <h3>{{ attractionStore.selectedAttraction.title }}</h3>
        <span>{{ attractionStore.selectedAttraction.addr1 }}</span>
      </div>

      <!-- <p>content_id: {{ attractionStore.selectedAttraction.content_id }}</p> -->
      <div id="img-des">
        <img :src="`${attractionStore.selectedAttraction.firstImage}`" alt="" />
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
import { ref, watch } from "vue";
import axios from "axios";

const attractionStore = useAttractionStore();
const description = ref({
  content_id: 0,
  overview: "",
});
watch(
  () => attractionStore.selectedAttraction,
  () => {
    axios
      .get(`http://localhost/attraction/view`, {
        params: {
          contentId: attractionStore.selectedAttraction.contentId,
        },
      })
      .then((response) => {
        description.value = response.data;
        // console.log(description);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  { deep: true }
);
</script>

<style scoped>
h3 {
  font-size: 1.25rem;
  margin: 1.5rem 0rem 0.5rem 0rem;
}
span {
  color: #8c8c8c;
  font-size: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
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
  width: 20.8125rem;
  max-height: 15rem;
}
#container {
  /* padding: 1rem; */
}

#des-container {
  display: flex;
  flex-direction: column;
  /* width: rem; */
}
#title-addr1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#img-des {
  display: flex;
  flex-direction: column;
  height: 24rem;
  justify-content: center;
  align-content: center;
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
