<template>
  <div id="comment-input-container">
    <textarea v-model="commentInput" type="text"></textarea>
    <button @click="submitComment"><p>등록</p></button>
  </div>
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
    <!-- <hr /> -->
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
      .get(`http://localhost/attraction/review`, {
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

const commentInput = ref("");
const submitComment = () => {
  axios
    .post("http://localhost/attraction/review/write", {
      content: commentInput.value,
      userId: "ssafy",
      contentId: attractionStore.selectedAttraction.contentId,
    })
    .then((response) => {
      comment.value.push({
        content: commentInput.value,
        userId: "ssafy",
        contentId: attractionStore.selectedAttraction.contentId,
        registerTime: Date(Date.now()),
      });

      commentInput.value = "";
    })
    .catch((error) => {
      console.error("Error submitting comment:", error);
    });
};
</script>

<style scoped>
#comment-input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 7.25rem;
  padding: 0 0.7rem;
}
textarea {
  width: 100%;
  height: 100%;
  resize: none;
  margin-bottom: 0.4rem;
  box-sizing: border-box;
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.0125rem;
  height: 1.5125rem;
  border-radius: 0.125rem;
  background-color: #6499e9;
  border: 0.5px solid #6499e9;
  cursor: pointer;
  color: white;
}
#comment-container {
  display: flex;
  margin: 1.3rem 0.4rem;
  /* background-color: #6499e917; */
  background-color: #f3f3f3;
  border-radius: 0.5rem;
  padding: 0.4rem;
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
