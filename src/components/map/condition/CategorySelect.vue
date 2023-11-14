<template>
  <div id="categories-container">
    <div
      v-for="category in types"
      :key="category.code"
      @click="toggleCategory(category)"
      :class="{
        'category-item': true,
        'selected-category': isSelectedCategory(category),
      }"
    >
      <p>
        {{ category.name }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useCategoryStore } from "../../../stores/store";

const types = [
  { code: 12, name: "관광지" },
  { code: 14, name: "문화시설" },
  { code: 25, name: "여행코스" },
  { code: 38, name: "쇼핑" },
  { code: 28, name: "레포츠" },
  { code: 32, name: "숙박" },
  { code: 15, name: "축제공연행사" },
  { code: 39, name: "음식점" },
];

const selectedCategories = ref(new Set(types));

// Convert Set to Array using computed
const selectedCategoriesArray = computed(() => {
  return Array.from(selectedCategories.value);
});

const categoryStore = useCategoryStore();

const toggleCategory = (category) => {
  if (isSelectedCategory(category)) {
    selectedCategories.value.delete(category);
  } else {
    selectedCategories.value.add(category);
  }

  // categoryStore.addCategoryCondition(
  //   selectedCategoriesArray(),
  //   categoryStore.selectedCategory.sido_code,
  //   categoryStore.selectedCategory.gugun_code
  // );
};

const isSelectedCategory = (category) => {
  return selectedCategories.value.has(category);
};

// Watch for changes in the selectedCategoriesArray
watch(
  () => selectedCategoriesArray.value,
  (newVal) => {
    categoryStore.addCategoryCondition(
      newVal.map((cat) => cat.code),
      categoryStore.selectedCategory.sido_code,
      categoryStore.selectedCategory.gugun_code
    );
  }
);
</script>

<style scoped>
#categories-container {
  display: flex;
  flex-wrap: wrap;
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.3125rem;
  border-radius: 0.95rem;
  border: 0.5px solid #c8c8c8;
  background-color: #fff;
  padding: 0.15rem 0.6rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  color: #c8c8c8;
}

.category-item.selected-category {
  background-color: #f29561;
  color: #fff;
  border: 0.5px solid #f29561;
}

p {
  text-align: center;
  font-size: 0.75rem;
  margin: 0;
}
</style>
