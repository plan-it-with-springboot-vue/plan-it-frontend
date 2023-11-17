<template>
  <div v-for="(commentItem, index) in comment" :key="index">
    <div id="comment-container">
      <div id="profile"><ProfileImg /></div>
      <div>
        <span id="user-id">{{ commentItem.userId }}</span>
        <p>
          {{ commentItem.content }}
        </p>
        <span id="timestamp">{{ commentItem.registerTime }}</span>
      </div>
    </div>
    <hr />
  </div>
</template>

<script setup>
import ProfileImg from "../../../assets/svg/ProfileImg.vue";
import { useAttractionStore } from "../../../stores/store";
import { ref, watch } from "vue";
import axios from "axios";

const attractionStore = useAttractionStore();

const comment = ref();

watch(
  () => attractionStore.selectedAttraction,
  () => {
    axios
      .get(`/attraction/review`, {
        params: {
          contentId: attractionStore.selectedAttraction.contentId,
        },
      })
      .then((response) => {
        console.log(
          "API Response:",
          attractionStore.selectedAttraction.contentId
        );
        comment.value = response.data;
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }
);
</script>

<style scoped>
#comment-container {
  display: flex;
  margin: 1.3rem 0.4rem;
}
span {
  color: #8c8c8c;
  font-size: 1rem;
}
p {
  font-size: 1rem;
  line-height: 170%;
  margin: 0;
}

#profile {
  width: 2rem;
  margin-right: 0.8rem;
}
hr {
  height: 0.03125rem;
  background-color: #c8c8c8;
  border: 0;
  margin: 0;
}

#timestamp {
  margin: 0rem 0.15rem;
}
</style>
