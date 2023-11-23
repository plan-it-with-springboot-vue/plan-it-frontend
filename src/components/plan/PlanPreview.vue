<template>
  <div id="preview-container">
    <div v-for="(detail, index) in filteredDetails" :key="index" class="card">
      <div class="card-header">{{ detail.planDate }}</div>
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
/* 카드 스타일 */
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 20rem;
}

.card-header {
  background-color: #f0f0f0;
  padding: 5px;
  font-weight: bold;
}

.card-body {
  padding: 10px;
}

.attraction {
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 5px;
}
#preview-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
