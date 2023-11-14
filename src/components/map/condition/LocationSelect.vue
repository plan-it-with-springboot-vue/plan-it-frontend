<template>
  <div id="select-local-container">
    <div>
      <select v-model="selectedSido" @change="updateSidoOptions">
        <option disabled value="">시도</option>
        <option v-for="sido in sidos" :key="sido.sido_code" :value="sido">
          {{ sido.sido_name }}
        </option>
      </select>
    </div>
    <div>
      <select v-model="selectedGugun" @change="updateGugunOptions">
        <option value="" disabled>구군</option>
        <option
          v-for="gugun in filteredGuguns"
          :key="gugun.gugun_code"
          :value="gugun"
        >
          {{ gugun.gugun_name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCategoryStore } from "../../../stores/store";

const sidos = [
  { sido_code: 0, sido_name: "전체" },
  { sido_code: 1, sido_name: "서울" },
  { sido_code: 2, sido_name: "인천" },
  { sido_code: 3, sido_name: "대전" },
  { sido_code: 4, sido_name: "대구" },
];

const guguns = [
  { gugun_code: 0, gugun_name: "전체", sido_code: 0 },
  { gugun_code: 1, gugun_name: "강남구", sido_code: 1 },
  { gugun_code: 2, gugun_name: "강동구", sido_code: 1 },
  { gugun_code: 1, gugun_name: "강화군", sido_code: 2 },
  { gugun_code: 2, gugun_name: "계양구", sido_code: 2 },
  { gugun_code: 3, gugun_name: "미추홀구", sido_code: 2 },
];

const selectedSido = ref("");
const selectedGugun = ref("");

const filteredGuguns = computed(() => {
  if (selectedSido.value) {
    return guguns.filter(
      (gugun) => gugun.sido_code === selectedSido.value.sido_code
    );
  }
  return [];
});

const categoryStore = useCategoryStore();

const updateSidoOptions = () => {
  // 선택한 시도에 해당하는 구군 목록으로 필터링
  selectedGugun.value = ""; // 선택된 구군 초기화

  categoryStore.addCategoryCondition(
    categoryStore.selectedCategory.content_type_id,
    selectedSido.value.sido_code,
    selectedGugun.value.gugun_code
  );
};

const updateGugunOptions = () => {
  categoryStore.addCategoryCondition(
    categoryStore.selectedCategory.content_type_id,
    selectedSido.value.sido_code,
    selectedGugun.value.gugun_code
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
