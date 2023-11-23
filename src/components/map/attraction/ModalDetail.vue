<template>
  <div id="container">
    <div id="des-container">
      <div class="img-container">
        <img
          v-if="attractionStore.selectedAttraction?.firstImage"
          :src="`${attractionStore.selectedAttraction?.firstImage}`"
          alt=""
        />
        <img
          v-else
          :src="`/src/assets/image/plan-it-white-logo.png`"
          alt=""
          style="background-color: lightgray"
        />
      </div>

      <div id="title-addr1">
        <div id="title-like-container">
          <h3>{{ attractionStore.selectedAttraction?.title }}</h3>
          <div v-if="!favoritesStore || favoritesStore.favorites.length === 0">
            <LikeBig
              class="like-svg"
              @click="likeAttraction(attractionStore.selectedAttraction)"
            />
          </div>
          <div v-else>
            <div
              v-if="
                favoritesStore.favorites.find(
                  (item) =>
                    item.contentId ===
                    attractionStore.selectedAttraction.contentId
                )
              "
            >
              <LikeRedBig
                class="like-svg"
                @click="deleteLike(attractionStore.selectedAttraction)"
              />
            </div>
            <div v-else>
              <LikeBig
                class="like-svg"
                @click="likeAttraction(attractionStore.selectedAttraction)"
              />
            </div>
          </div>
        </div>

        <span>{{ attractionStore.selectedAttraction?.addr1 }}</span>
      </div>
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
import { useAttractionStore, useFavoriteStores } from "../../../stores/store";
import ModalComment from "./ModalComment.vue";
import LikeBig from "../../../assets/svg/LikeBig.vue";
import LikeRedBig from "../../../assets/svg/LikeRedBig.vue";
import axios from "axios";
import { useUserStore } from "../../../stores/user";

const attractionStore = useAttractionStore();
const favoritesStore = useFavoriteStores();
const userStore = useUserStore();

const likeAttraction = async (attractionItem) => {
  if (userStore.isLogin) {
    try {
      axios.post("http://localhost/attraction/like", {
        userId: userStore.userInfo.userId,
        contentId: attractionItem.contentId,
      });

      favoritesStore.favorites.push({
        userId: userStore.userInfo.userId,
        contentId: attractionItem.contentId,
      });
    } catch (error) {
      console.error("Error while liking the attraction:", error);
    }
  } else {
    alert("로그인 해라");
  }
};

const deleteLike = async (attractionItem) => {
  if (userStore.isLogin) {
    try {
      axios
        .delete(`http://localhost/attraction/like`, {
          params: {
            userId: userStore.userInfo.userId,
            contentId: attractionItem.contentId,
          },
        })
        .then(() => {
          favoritesStore.favorites = favoritesStore.favorites.filter(
            (item) => item.contentId !== attractionItem.contentId
          );
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    } catch (error) {
      console.error("Error while liking the attraction:", error);
    }
  } else {
    alert("로그인 해라");
  }
};
</script>

<style scoped>
.like-svg {
  margin-right: 0.25rem;
  cursor: pointer;
}
h3 {
  font-size: 1.25rem;
  margin: 0.2rem 0rem 0.2rem 0rem;
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
img {
  display: flex;
  margin-right: 2rem;
  /* border-radius: 0.31rem; */
  width: 100%;
  height: 14.42rem;
}
#container {
  /* padding: 1rem; */
}

#title-like-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.img-container {
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
  padding: 0.9rem 1.2rem;
}
#img-des {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
#des {
  /* background-color: #6499e916; */
  height: 9rem;
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
  margin: 1.2rem 0 0.5rem 0;
  padding: 0rem 1.2rem;
}

#review {
  height: 23.62rem;
}

#comment {
  /* height: 25rem; */
}

.scrollable-container {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  padding: 0 1.2rem;
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
