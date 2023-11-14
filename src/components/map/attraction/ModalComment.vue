<template>
  <div v-for="(commentItem, index) in comment" :key="index">
    <div id="comment-container">
      <div id="profile"><ProfileImg /></div>
      <div>
        <span id="user-id">{{ commentItem.user_id }}</span>
        <p>
          {{ commentItem.content }}
        </p>
        <span id="timestamp">{{ commentItem.register_time }}</span>
      </div>
    </div>
    <hr />
  </div>
</template>

<script setup>
import ProfileImg from "../../../assets/svg/ProfileImg.vue";
import { useAttractionStore } from "../../../stores/store";
import { ref } from "vue";

const attractionStore = useAttractionStore();

const comment = ref([
  {
    content_id: 125266, // attractionStore.selectedAttraction.content_id
    content:
      "무창포항에서 출항하는 주꾸미 배타고 주꾸미 잡으러 다녀왔어요. 집에서 가깝기도 하고 배타고 멀리나가지않고 가까운데서 잡으니 멀미도 없고 좋더라구요. 싱싱한 주꾸미도 많이 잡았답니다",
    register_time: "2023.11.14",
    user_id: "ssafy",
  },
  {
    content_id: 125266, // attractionStore.selectedAttraction.content_id
    content: "하기싫다",
    register_time: "2023.11.12",
    user_id: "muun123",
  },
  {
    content_id: 125266, // attractionStore.selectedAttraction.content_id
    content: "싸피입니다",
    register_time: "2023.10.12",
    user_id: "kkokoo",
  },
  {
    content_id: 125266, // attractionStore.selectedAttraction.content_id
    content: "국립 청태산자연휴양림",
    register_time: "2023.10.12",
    user_id: "kkko",
  },
]);
</script>

<style scoped>
#comment-container {
  display: flex;
  margin: 1.5rem 0.4rem;
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
