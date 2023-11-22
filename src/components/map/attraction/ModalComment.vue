<template>
  <div id="comment-input-container">
    <textarea v-model="commentInput" type="text"></textarea>
    <button @click="submitComment"><p>등록</p></button>
  </div>
  <div v-if="attractionStore.selectedAttractionReview.length === 0">
    방문 후기가 없습니다
  </div>
  <div
    v-else
    v-for="(commentItem, index) in attractionStore.selectedAttractionReview"
    :key="index"
  >
    <div id="comment-container">
      <div id="profile"><ProfileImg /></div>
      <div id="ex-profile">
        <div id="user-delete-container">
          <span id="user-id">{{ commentItem.userId }}</span>
          <div v-if="userStore.userInfo.userId === commentItem.userId">
            <span @click="deleteComment(commentItem)">삭제</span>
          </div>
        </div>
        <p>
          {{ commentItem.content }}
        </p>
        <span id="timestamp">{{ commentItem.registerTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileImg from "../../../assets/svg/ProfileImg.vue";
import { useAttractionStore } from "../../../stores/store";
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "../../../stores/user";

const attractionStore = useAttractionStore();
const userStore = useUserStore();
const commentInput = ref("");

const submitComment = () => {
  if (userStore.isLogin) {
    if (commentInput.value === "") {
      alert("내용 작성 부탁");
    } else {
      axios
        .post("http://localhost/attraction/review/write", {
          content: commentInput.value,
          userId: userStore.userInfo.userId,
          contentId: attractionStore.selectedAttraction.contentId,
        })
        .then(() => {
          let reviewCnt = attractionStore.selectedAttractionReview.reduce(
            (maxId, currentObj) => {
              return currentObj.reviewId > maxId ? currentObj.reviewId : maxId;
            },
            attractionStore.selectedAttractionReview[0].reviewId
          );

          attractionStore.selectedAttractionReview.push({
            content: commentInput.value,
            userId: userStore.userInfo.userId,
            contentId: attractionStore.selectedAttraction.contentId,
            registerTime: Date(Date.now()),
            reviewId: ++reviewCnt,
          });

          commentInput.value = "";
        })
        .catch((error) => {
          console.error("Error submitting comment:", error);
        });
    }
  } else {
    alert("로그인 후 이용해라");
  }
};

const deleteComment = (commentItem) => {
  if (commentItem.userId !== userStore.userInfo?.userId) {
    alert("본인 댓글만 삭제 가능");
  } else {
    axios
      .delete(`http://localhost/attraction/review/delete`, {
        params: {
          reviewId: commentItem.reviewId,
        },
      })
      .then(() => {
        const indexToDelete =
          attractionStore.selectedAttractionReview.findIndex(
            (comment) => comment.reviewId === commentItem.reviewId
          );
        if (indexToDelete !== -1) {
          attractionStore.selectedAttractionReview.splice(indexToDelete, 1);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }
};
</script>

<style scoped>
#ex-profile {
  display: flex;
  flex-direction: column;
  width: 100%;
}
#user-delete-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
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
  padding: 0.5rem;
}
span {
  color: #8c8c8c;
  font-size: 1rem;
  cursor: pointer;
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
