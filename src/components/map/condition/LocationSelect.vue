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
  { gugunCode: 1, gugunName: "가평군", sidoCode: 31 },
  { gugunCode: 2, gugunName: "고양시", sidoCode: 31 },
  { gugunCode: 3, gugunName: "과천시", sidoCode: 31 },
  { gugunCode: 4, gugunName: "광명시", sidoCode: 31 },
  { gugunCode: 5, gugunName: "광주시", sidoCode: 31 },
  { gugunCode: 6, gugunName: "구리시", sidoCode: 31 },
  { gugunCode: 7, gugunName: "군포시", sidoCode: 31 },
  { gugunCode: 8, gugunName: "김포시", sidoCode: 31 },
  { gugunCode: 9, gugunName: "남양주시", sidoCode: 31 },
  { gugunCode: 10, gugunName: "동두천시", sidoCode: 31 },
  { gugunCode: 11, gugunName: "부천시", sidoCode: 31 },
  { gugunCode: 12, gugunName: "성남시", sidoCode: 31 },
  { gugunCode: 13, gugunName: "수원시", sidoCode: 31 },
  { gugunCode: 14, gugunName: "시흥시", sidoCode: 31 },
  { gugunCode: 15, gugunName: "안산시", sidoCode: 31 },
  { gugunCode: 16, gugunName: "안성시", sidoCode: 31 },
  { gugunCode: 17, gugunName: "안양시", sidoCode: 31 },
  { gugunCode: 18, gugunName: "양주시", sidoCode: 31 },
  { gugunCode: 19, gugunName: "양평군", sidoCode: 31 },
  { gugunCode: 20, gugunName: "여주시", sidoCode: 31 },
  { gugunCode: 21, gugunName: "연천군", sidoCode: 31 },
  { gugunCode: 22, gugunName: "오산시", sidoCode: 31 },
  { gugunCode: 23, gugunName: "용인시", sidoCode: 31 },
  { gugunCode: 24, gugunName: "의왕시", sidoCode: 31 },
  { gugunCode: 25, gugunName: "의정부시", sidoCode: 31 },
  { gugunCode: 26, gugunName: "이천시", sidoCode: 31 },
  { gugunCode: 27, gugunName: "파주시", sidoCode: 31 },
  { gugunCode: 28, gugunName: "평택시", sidoCode: 31 },
  { gugunCode: 29, gugunName: "포천시", sidoCode: 31 },
  { gugunCode: 30, gugunName: "하남시", sidoCode: 31 },
  { gugunCode: 31, gugunName: "화성시", sidoCode: 31 },
  { gugunCode: 1, gugunName: "강릉시", sidoCode: 32 },
  { gugunCode: 2, gugunName: "고성군", sidoCode: 32 },
  { gugunCode: 3, gugunName: "동해시", sidoCode: 32 },
  { gugunCode: 4, gugunName: "삼척시", sidoCode: 32 },
  { gugunCode: 5, gugunName: "속초시", sidoCode: 32 },
  { gugunCode: 6, gugunName: "양구군", sidoCode: 32 },
  { gugunCode: 7, gugunName: "양양군", sidoCode: 32 },
  { gugunCode: 8, gugunName: "영월군", sidoCode: 32 },
  { gugunCode: 9, gugunName: "원주시", sidoCode: 32 },
  { gugunCode: 10, gugunName: "인제군", sidoCode: 32 },
  { gugunCode: 11, gugunName: "정선군", sidoCode: 32 },
  { gugunCode: 12, gugunName: "철원군", sidoCode: 32 },
  { gugunCode: 13, gugunName: "춘천시", sidoCode: 32 },
  { gugunCode: 14, gugunName: "태백시", sidoCode: 32 },
  { gugunCode: 15, gugunName: "평창군", sidoCode: 32 },
  { gugunCode: 16, gugunName: "홍천군", sidoCode: 32 },
  { gugunCode: 17, gugunName: "화천군", sidoCode: 32 },
  { gugunCode: 18, gugunName: "횡성군", sidoCode: 32 },
  { gugunCode: 1, gugunName: "괴산군", sidoCode: 33 },
  { gugunCode: 2, gugunName: "단양군", sidoCode: 33 },
  { gugunCode: 3, gugunName: "보은군", sidoCode: 33 },
  { gugunCode: 4, gugunName: "영동군", sidoCode: 33 },
  { gugunCode: 5, gugunName: "옥천군", sidoCode: 33 },
  { gugunCode: 6, gugunName: "음성군", sidoCode: 33 },
  { gugunCode: 7, gugunName: "제천시", sidoCode: 33 },
  { gugunCode: 8, gugunName: "진천군", sidoCode: 33 },
  { gugunCode: 9, gugunName: "청원군", sidoCode: 33 },
  { gugunCode: 10, gugunName: "청주시", sidoCode: 33 },
  { gugunCode: 11, gugunName: "충주시", sidoCode: 33 },
  { gugunCode: 12, gugunName: "증평군", sidoCode: 33 },
  { gugunCode: 1, gugunName: "공주시", sidoCode: 34 },
  { gugunCode: 2, gugunName: "금산군", sidoCode: 34 },
  { gugunCode: 3, gugunName: "논산시", sidoCode: 34 },
  { gugunCode: 4, gugunName: "당진시", sidoCode: 34 },
  { gugunCode: 5, gugunName: "보령시", sidoCode: 34 },
  { gugunCode: 6, gugunName: "부여군", sidoCode: 34 },
  { gugunCode: 7, gugunName: "서산시", sidoCode: 34 },
  { gugunCode: 8, gugunName: "서천군", sidoCode: 34 },
  { gugunCode: 9, gugunName: "아산시", sidoCode: 34 },
  { gugunCode: 11, gugunName: "예산군", sidoCode: 34 },
  { gugunCode: 12, gugunName: "천안시", sidoCode: 34 },
  { gugunCode: 13, gugunName: "청양군", sidoCode: 34 },
  { gugunCode: 14, gugunName: "태안군", sidoCode: 34 },
  { gugunCode: 15, gugunName: "홍성군", sidoCode: 34 },
  { gugunCode: 16, gugunName: "계룡시", sidoCode: 34 },
  { gugunCode: 1, gugunName: "경산시", sidoCode: 35 },
  { gugunCode: 2, gugunName: "경주시", sidoCode: 35 },
  { gugunCode: 3, gugunName: "고령군", sidoCode: 35 },
  { gugunCode: 4, gugunName: "구미시", sidoCode: 35 },
  { gugunCode: 5, gugunName: "군위군", sidoCode: 35 },
  { gugunCode: 6, gugunName: "김천시", sidoCode: 35 },
  { gugunCode: 7, gugunName: "문경시", sidoCode: 35 },
  { gugunCode: 8, gugunName: "봉화군", sidoCode: 35 },
  { gugunCode: 9, gugunName: "상주시", sidoCode: 35 },
  { gugunCode: 10, gugunName: "성주군", sidoCode: 35 },
  { gugunCode: 11, gugunName: "안동시", sidoCode: 35 },
  { gugunCode: 12, gugunName: "영덕군", sidoCode: 35 },
  { gugunCode: 13, gugunName: "영양군", sidoCode: 35 },
  { gugunCode: 14, gugunName: "영주시", sidoCode: 35 },
  { gugunCode: 15, gugunName: "영천시", sidoCode: 35 },
  { gugunCode: 16, gugunName: "예천군", sidoCode: 35 },
  { gugunCode: 17, gugunName: "울릉군", sidoCode: 35 },
  { gugunCode: 18, gugunName: "울진군", sidoCode: 35 },
  { gugunCode: 19, gugunName: "의성군", sidoCode: 35 },
  { gugunCode: 20, gugunName: "청도군", sidoCode: 35 },
  { gugunCode: 21, gugunName: "청송군", sidoCode: 35 },
  { gugunCode: 22, gugunName: "칠곡군", sidoCode: 35 },
  { gugunCode: 23, gugunName: "포항시", sidoCode: 35 },
  { gugunCode: 1, gugunName: "거제시", sidoCode: 36 },
  { gugunCode: 2, gugunName: "거창군", sidoCode: 36 },
  { gugunCode: 3, gugunName: "고성군", sidoCode: 36 },
  { gugunCode: 4, gugunName: "김해시", sidoCode: 36 },
  { gugunCode: 5, gugunName: "남해군", sidoCode: 36 },
  { gugunCode: 6, gugunName: "마산시", sidoCode: 36 },
  { gugunCode: 7, gugunName: "밀양시", sidoCode: 36 },
  { gugunCode: 8, gugunName: "사천시", sidoCode: 36 },
  { gugunCode: 9, gugunName: "산청군", sidoCode: 36 },
  { gugunCode: 10, gugunName: "양산시", sidoCode: 36 },
  { gugunCode: 12, gugunName: "의령군", sidoCode: 36 },
  { gugunCode: 13, gugunName: "진주시", sidoCode: 36 },
  { gugunCode: 14, gugunName: "진해시", sidoCode: 36 },
  { gugunCode: 15, gugunName: "창녕군", sidoCode: 36 },
  { gugunCode: 16, gugunName: "창원시", sidoCode: 36 },
  { gugunCode: 17, gugunName: "통영시", sidoCode: 36 },
  { gugunCode: 18, gugunName: "하동군", sidoCode: 36 },
  { gugunCode: 19, gugunName: "함안군", sidoCode: 36 },
  { gugunCode: 20, gugunName: "함양군", sidoCode: 36 },
  { gugunCode: 21, gugunName: "합천군", sidoCode: 36 },
  { gugunCode: 1, gugunName: "고창군", sidoCode: 37 },
  { gugunCode: 2, gugunName: "군산시", sidoCode: 37 },
  { gugunCode: 3, gugunName: "김제시", sidoCode: 37 },
  { gugunCode: 4, gugunName: "남원시", sidoCode: 37 },
  { gugunCode: 5, gugunName: "무주군", sidoCode: 37 },
  { gugunCode: 6, gugunName: "부안군", sidoCode: 37 },
  { gugunCode: 7, gugunName: "순창군", sidoCode: 37 },
  { gugunCode: 8, gugunName: "완주군", sidoCode: 37 },
  { gugunCode: 9, gugunName: "익산시", sidoCode: 37 },
  { gugunCode: 10, gugunName: "임실군", sidoCode: 37 },
  { gugunCode: 11, gugunName: "장수군", sidoCode: 37 },
  { gugunCode: 12, gugunName: "전주시", sidoCode: 37 },
  { gugunCode: 13, gugunName: "정읍시", sidoCode: 37 },
  { gugunCode: 14, gugunName: "진안군", sidoCode: 37 },
  { gugunCode: 1, gugunName: "강진군", sidoCode: 38 },
  { gugunCode: 2, gugunName: "고흥군", sidoCode: 38 },
  { gugunCode: 3, gugunName: "곡성군", sidoCode: 38 },
  { gugunCode: 4, gugunName: "광양시", sidoCode: 38 },
  { gugunCode: 5, gugunName: "구례군", sidoCode: 38 },
  { gugunCode: 6, gugunName: "나주시", sidoCode: 38 },
  { gugunCode: 7, gugunName: "담양군", sidoCode: 38 },
  { gugunCode: 8, gugunName: "목포시", sidoCode: 38 },
  { gugunCode: 9, gugunName: "무안군", sidoCode: 38 },
  { gugunCode: 10, gugunName: "보성군", sidoCode: 38 },
  { gugunCode: 11, gugunName: "순천시", sidoCode: 38 },
  { gugunCode: 12, gugunName: "신안군", sidoCode: 38 },
  { gugunCode: 13, gugunName: "여수시", sidoCode: 38 },
  { gugunCode: 16, gugunName: "영광군", sidoCode: 38 },
  { gugunCode: 17, gugunName: "영암군", sidoCode: 38 },
  { gugunCode: 18, gugunName: "완도군", sidoCode: 38 },
  { gugunCode: 19, gugunName: "장성군", sidoCode: 38 },
  { gugunCode: 20, gugunName: "장흥군", sidoCode: 38 },
  { gugunCode: 21, gugunName: "진도군", sidoCode: 38 },
  { gugunCode: 22, gugunName: "함평군", sidoCode: 38 },
  { gugunCode: 23, gugunName: "해남군", sidoCode: 38 },
  { gugunCode: 24, gugunName: "화순군", sidoCode: 38 },
  { gugunCode: 1, gugunName: "남제주군", sidoCode: 39 },
  { gugunCode: 2, gugunName: "북제주군", sidoCode: 39 },
  { gugunCode: 3, gugunName: "서귀포시", sidoCode: 39 },
  { gugunCode: 4, gugunName: "제주시", sidoCode: 39 },
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
