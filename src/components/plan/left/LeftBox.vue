<template>
  <div id="left-box-container">
    <h3>장소 고르기</h3>
    <div id="menu-container">
      <div id="menu-btn-container">
        <div
          @click="selectMenu(1)"
          :class="{ 'menu-btn': true, selected: selectedMenu === 1 }"
        >
          <p>관광지 검색</p>
        </div>
        <div
          @click="selectMenu(2)"
          :class="{ 'menu-btn': true, selected: selectedMenu === 2 }"
        >
          <p>찜 목록</p>
        </div>
      </div>
      <div id="attraction-search">
        <input
          type="text"
          v-model="searchText"
          :disabled="selectedMenu === 2"
          :style="{
            'border-bottom':
              selectedMenu === 2
                ? '0.0625rem solid #c8c8c8'
                : '0.0625rem solid #000',
          }"
        /><SearchIcon
          class="svg"
          v-if="selectedMenu === 1"
          @click="searchAttraction"
        /><BlockSearchIcon v-else />
      </div>
    </div>

    <AttractionSearchBox v-if="selectedMenu === 1" :attraction="attraction" />
    <LikeBox v-else />
  </div>
</template>

<script setup>
import SearchIcon from "../../../assets/svg/SearchIcon.vue";
import AttractionSearchBox from "./AttractionSearchBox.vue";
import BlockSearchIcon from "../../../assets/svg/BlockSearchIcon.vue";
import LikeBox from "./LikeBox.vue";
import { ref } from "vue";
import axios from "axios";

const selectedMenu = ref(1);
const searchText = ref("");
const attraction = ref([]);

const selectMenu = (menu) => {
  selectedMenu.value = menu;
};

const searchAttraction = () => {
  axios
    .get("http://localhost/attraction/search", {
      params: {
        title: searchText.value,
      },
    })
    .then((response) => {
      attraction.value = response.data;
      searchText.value = "";
    })
    .catch((error) => {
      console.error("Error fetching attraction data:", error);
    });
};
</script>

<style scoped>
p {
  text-align: center;
  margin: 0;
  padding: 0;
}
h3 {
  text-align: center;
  font-size: 1.25rem;
  /* color: #6499e9; */
}
input {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-bottom: 0.0625rem solid #000;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;
  width: 6.1875rem;
  height: 1.25rem;
  background-color: white;
}
#left-box-container {
  display: flex;
  flex-direction: column;
  width: 25.8125rem;
  height: 40.4375rem;
}
#menu-container {
  width: 25.8125rem;
}
#menu-btn-container {
  display: flex;
  justify-content: space-between;
  padding: 0 1.94rem;
}
.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 9.925rem;
  height: 1.4525rem;
  border-radius: 0.75rem;
  font-size: 0.85rem;
  color: #c8c8c8;
  border: 0.5px solid #c8c8c8;
  cursor: pointer;
}

.selected {
  background-color: #f29561;
  border: 0.5px solid #f29561;
  color: white;
}
#attraction-search {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 1.25rem;
  margin: 1.07rem 0 0.7rem 0;
}
.svg {
  cursor: pointer;
}
</style>
