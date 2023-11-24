<template>
  <div class="scrollable-container">
    <div v-if="filteredDetails.length === 0">
      <p>관광지를 추가해주세요</p>
    </div>
    <div v-else id="preview-container">
      <div v-for="(detail, index) in filteredDetails" :key="index" class="card">
        <div class="card-header">
          <h2>{{ detail.planDate }}</h2>
        </div>
        <div class="scrollable-container-col">
          <div id="card-container">
            <div class="card-body">
              <div
                v-for="attraction in detail.attraction"
                :key="attraction.attraction.contentId"
                class="attraction"
              >
                <h3>{{ attraction.attraction.title }}</h3>
                <p>{{ attraction.attraction.addr1 }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { usePlanStore } from "../../stores/store";

const planStore = usePlanStore();

const filteredDetails = ref([]);

const updateFilteredDetails = () => {
  if (planStore.plan) {
    const groupedDetails = planStore.plan.planDetail.reduce((acc, curr) => {
      const date = curr.planDate;

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(curr);

      return acc;
    }, {});

    const sortedDetails = Object.entries(groupedDetails)
      .map(([date, attraction]) => ({
        planDate: date,
        attraction,
      }))
      .sort((a, b) => new Date(a.planDate) - new Date(b.planDate)); // 날짜로 정렬

    filteredDetails.value = sortedDetails;
  }
};

watch(
  () => planStore.plan?.planDetail,
  () => {
    if (Array.isArray(planStore.plan?.planDetail)) {
      updateFilteredDetails();
    }
  },
  { deep: true }
);
</script>

<style scoped>
h2 {
  margin: 0;
  font-size: 1rem;
  margin: 0.8rem 0.8rem;
}
h3 {
  margin: 0;
  margin: 0.6rem 0;
}
#card-container {
  height: 30rem;
  width: 21rem;
}
p {
  margin: 0;
  padding: 0;
  margin: 0.6rem 0;
  /* margin: 0.84rem; */
  font-size: 1rem;
}
.card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 0.8rem;
  /* margin-bottom: 10px; */
  width: 22rem;
  margin: 0.7rem;
}

.card-header {
  background-color: #f0f0f0;
  /* padding: 0.7rem; */
  width: 22rem;
  font-weight: bold;
  border-radius: 0.8rem 0.8rem 0 0;
}

.card-body {
  padding: 0.7rem;
}

.attraction {
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 5px;
}
#preview-container {
  display: flex;
  align-items: center;
  width: 97.7rem;
}
.scrollable-container {
  white-space: nowrap; /* 모든 요소들을 한 줄에 나열 */
  overflow-x: auto; /* 가로 스크롤을 허용하는 설정 */
  overflow-y: hidden; /* 세로 스크롤 비활성화 */
}

.scrollable-container::-webkit-scrollbar {
  height: 0.6rem;
}

.scrollable-container::-webkit-scrollbar-track {
  background-color: #e6e6e6;
}

.scrollable-container::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #c2c2c2;
}

.scrollable-container-col {
  overflow-y: auto;
  overflow-x: hidden;
  height: 30rem;
}

.scrollable-container-col::-webkit-scrollbar {
  width: 0.4rem;
}

.scrollable-container-col::-webkit-scrollbar-track {
  background-color: #e6e6e6;
}

.scrollable-container-col::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #c2c2c2;
}
</style>
