<template>
  <div id="select-local-container">
    <div>
      <select v-model="selectedSido" @change="updateSidoOptions">
        <option disabled value="">시도</option>
        <option v-for="sido in sidos" :key="sido.sidoCode" :value="sido">
          {{ sido.sidoName }}
        </option>
      </select>
    </div>
    <div>
      <select v-model="selectedGugun" @change="updateGugunOptions">
        <option value="" disabled>구군</option>
        <option
          v-for="gugun in filteredGuguns"
          :key="gugun.gugunCode"
          :value="gugun"
        >
          {{ gugun.gugunName }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCategoryStore } from "../../../stores/store";

const sidos = [
  { sidoCode: 0, sidoName: "전체" },
  { sidoCode: 1, sidoName: "서울" },
  { sidoCode: 2, sidoName: "인천" },
  { sidoCode: 3, sidoName: "대전" },
  { sidoCode: 4, sidoName: "대구" },
];

const guguns = [
  { gugunCode: 0, gugunName: "전체", sidoCode: 0 },
  { gugunCode: 1, gugunName: "강남구", sidoCode: 1 },
  { gugunCode: 2, gugunName: "강동구", sidoCode: 1 },
  { gugunCode: 1, gugunName: "강화군", sidoCode: 2 },
  { gugunCode: 2, gugunName: "계양구", sidoCode: 2 },
  { gugunCode: 3, gugunName: "미추홀구", sidoCode: 2 },
];

const selectedSido = ref("");
const selectedGugun = ref("");

const filteredGuguns = computed(() => {
  if (selectedSido.value) {
    return guguns.filter(
      (gugun) => gugun.sidoCode === selectedSido.value.sidoCode
    );
  }
  return [];
});

const categoryStore = useCategoryStore();

const updateSidoOptions = () => {
  // 선택한 시도에 해당하는 구군 목록으로 필터링
  selectedGugun.value = ""; // 선택된 구군 초기화

  categoryStore.addCategoryCondition(
    categoryStore.selectedCategory.contentTypeId,
    selectedSido.value.sidoCode,
    selectedGugun.value.gugunCode
  );
};

const updateGugunOptions = () => {
  categoryStore.addCategoryCondition(
    categoryStore.selectedCategory.contentTypeId,
    selectedSido.value.sidoCode,
    selectedGugun.value.gugunCode
  );
};
</script>

<style scoped>
select {
  width: 7.25rem;
  height: 1.5125rem;
  font-size: 0.75rem;
  border-radius: 0.125rem;
  border: 0.5px solid #8c8c8c;
  background: #fff;
  margin-right: 0.62rem;
}
#select-local-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.62rem;
}
</style>
