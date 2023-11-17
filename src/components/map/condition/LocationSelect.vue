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
  { sidoCode: 1, sidoName: "서울" },
  { sidoCode: 2, sidoName: "인천" },
  { sidoCode: 3, sidoName: "대전" },
  { sidoCode: 4, sidoName: "대구" },
  { sidoCode: 5, sidoName: "광주" },
  { sidoCode: 6, sidoName: "부산" },
  { sidoCode: 7, sidoName: "울산" },
  { sidoCode: 8, sidoName: "세종특별자치시" },
  { sidoCode: 31, sidoName: "경기도" },
  { sidoCode: 32, sidoName: "강원도" },
  { sidoCode: 33, sidoName: "충청북도" },
  { sidoCode: 34, sidoName: "충청남도" },
  { sidoCode: 35, sidoName: "경상북도" },
  { sidoCode: 36, sidoName: "경상남도" },
  { sidoCode: 37, sidoName: "전라북도" },
  { sidoCode: 38, sidoName: "전라남도" },
  { sidoCode: 39, sidoName: "제주도" },
];

const guguns = [
  { gugunCode: 0, gugunName: "전체", sidoCode: 0 },
  { gugunCode: 1, gugunName: "강남구", sidoCode: 1 },
  { gugunCode: 2, gugunName: "강동구", sidoCode: 1 },
  { gugunCode: 3, gugunName: "강북구", sidoCode: 1 },
  { gugunCode: 4, gugunName: "강서구", sidoCode: 1 },
  { gugunCode: 5, gugunName: "관악구", sidoCode: 1 },
  { gugunCode: 6, gugunName: "광진구", sidoCode: 1 },
  { gugunCode: 7, gugunName: "구로구", sidoCode: 1 },
  { gugunCode: 8, gugunName: "금천구", sidoCode: 1 },
  { gugunCode: 9, gugunName: "노원구", sidoCode: 1 },
  { gugunCode: 10, gugunName: "도봉구", sidoCode: 1 },
  { gugunCode: 11, gugunName: "동대문구", sidoCode: 1 },
  { gugunCode: 12, gugunName: "동작구", sidoCode: 1 },
  { gugunCode: 13, gugunName: "마포구", sidoCode: 1 },
  { gugunCode: 14, gugunName: "서대문구", sidoCode: 1 },
  { gugunCode: 15, gugunName: "서초구", sidoCode: 1 },
  { gugunCode: 16, gugunName: "성동구", sidoCode: 1 },
  { gugunCode: 17, gugunName: "성북구", sidoCode: 1 },
  { gugunCode: 18, gugunName: "송파구", sidoCode: 1 },
  { gugunCode: 19, gugunName: "양천구", sidoCode: 1 },
  { gugunCode: 20, gugunName: "영등포구", sidoCode: 1 },
  { gugunCode: 21, gugunName: "용산구", sidoCode: 1 },
  { gugunCode: 22, gugunName: "은평구", sidoCode: 1 },
  { gugunCode: 23, gugunName: "종로구", sidoCode: 1 },
  { gugunCode: 24, gugunName: "중구", sidoCode: 1 },
  { gugunCode: 25, gugunName: "중랑구", sidoCode: 1 },
  { gugunCode: 1, gugunName: "강화군", sidoCode: 2 },
  { gugunCode: 2, gugunName: "계양구", sidoCode: 2 },
  { gugunCode: 3, gugunName: "미추홀구", sidoCode: 2 },
  { gugunCode: 4, gugunName: "남동구", sidoCode: 2 },
  { gugunCode: 5, gugunName: "동구", sidoCode: 2 },
  { gugunCode: 6, gugunName: "부평구", sidoCode: 2 },
  { gugunCode: 7, gugunName: "서구", sidoCode: 2 },
  { gugunCode: 8, gugunName: "연수구", sidoCode: 2 },
  { gugunCode: 9, gugunName: "옹진군", sidoCode: 2 },
  { gugunCode: 10, gugunName: "중구", sidoCode: 2 },
  { gugunCode: 1, gugunName: "대덕구", sidoCode: 3 },
  { gugunCode: 2, gugunName: "동구", sidoCode: 3 },
  { gugunCode: 3, gugunName: "서구", sidoCode: 3 },
  { gugunCode: 4, gugunName: "유성구", sidoCode: 3 },
  { gugunCode: 5, gugunName: "중구", sidoCode: 3 },
  { gugunCode: 1, gugunName: "남구", sidoCode: 4 },
  { gugunCode: 2, gugunName: "달서구", sidoCode: 4 },
  { gugunCode: 3, gugunName: "달성군", sidoCode: 4 },
  { gugunCode: 4, gugunName: "동구", sidoCode: 4 },
  { gugunCode: 5, gugunName: "북구", sidoCode: 4 },
  { gugunCode: 6, gugunName: "서구", sidoCode: 4 },
  { gugunCode: 7, gugunName: "수성구", sidoCode: 4 },
  { gugunCode: 8, gugunName: "중구", sidoCode: 4 },
  { gugunCode: 1, gugunName: "광산구", sidoCode: 5 },
  { gugunCode: 2, gugunName: "남구", sidoCode: 5 },
  { gugunCode: 3, gugunName: "동구", sidoCode: 5 },
  { gugunCode: 4, gugunName: "북구", sidoCode: 5 },
  { gugunCode: 5, gugunName: "서구", sidoCode: 5 },
  { gugunCode: 1, gugunName: "강서구", sidoCode: 6 },
  { gugunCode: 2, gugunName: "금정구", sidoCode: 6 },
  { gugunCode: 3, gugunName: "기장군", sidoCode: 6 },
  { gugunCode: 4, gugunName: "남구", sidoCode: 6 },
  { gugunCode: 5, gugunName: "동구", sidoCode: 6 },
  { gugunCode: 6, gugunName: "동래구", sidoCode: 6 },
  { gugunCode: 7, gugunName: "부산진구", sidoCode: 6 },
  { gugunCode: 8, gugunName: "북구", sidoCode: 6 },
  { gugunCode: 9, gugunName: "사상구", sidoCode: 6 },
  { gugunCode: 10, gugunName: "사하구", sidoCode: 6 },
  { gugunCode: 11, gugunName: "서구", sidoCode: 6 },
  { gugunCode: 12, gugunName: "수영구", sidoCode: 6 },
  { gugunCode: 13, gugunName: "연제구", sidoCode: 6 },
  { gugunCode: 14, gugunName: "영도구", sidoCode: 6 },
  { gugunCode: 15, gugunName: "중구", sidoCode: 6 },
  { gugunCode: 16, gugunName: "해운대구", sidoCode: 6 },
  { gugunCode: 1, gugunName: "중구", sidoCode: 7 },
  { gugunCode: 2, gugunName: "남구", sidoCode: 7 },
  { gugunCode: 3, gugunName: "동구", sidoCode: 7 },
  { gugunCode: 4, gugunName: "북구", sidoCode: 7 },
  { gugunCode: 5, gugunName: "울주군", sidoCode: 7 },
  { gugunCode: 1, gugunName: "세종특별자치시", sidoCode: 8 },
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
