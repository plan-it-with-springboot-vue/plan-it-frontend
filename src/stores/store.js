import { defineStore } from "pinia";

const useAttractionStore = defineStore("attraction", {
  state: () => ({
    modalVisible: false,
    selectedAttraction: null,
  }),
  actions: {
    showModal(attractionItem) {
      this.modalVisible = true;
      this.selectedAttraction = attractionItem;
    },
    closeModal() {
      this.modalVisible = false;
      this.selectedAttraction = null;
    },
  },
});

const useMapStore = defineStore("map", {
  state: () => ({
    selectedLocation: [],
  }),
  actions: {
    addAttractionList(attractionList) {
      const locations = attractionList.map((attractionItem) => ({
        title: attractionItem.title,
        addr1: attractionItem.addr1,
        latitude: attractionItem.latitude,
        longitude: attractionItem.longitude,
      }));

      this.selectedLocation = locations;
    },
  },
});

const useCategoryStore = defineStore("category", {
  state: () => ({
    selectedCategory: {
      content_type_id: [12, 14, 15, 25, 28, 32, 38, 39],
      sido_code: 0,
      gugun_code: 0,
    },
  }), // 0은 전체를 뜻함 // 12: 관광지, 14: 문화시설, 15: 축제공연행사, 25: 여행코스, 28: 레포츠, 32: 숙박, 38: 쇼핑, 39: 음식점
  actions: {
    addCategoryCondition(types, sido, gugun) {
      this.selectedCategory = {
        content_type_id: types,
        sido_code: sido || 0,
        gugun_code: gugun || 0,
      };
    },
  },
});

const usePlan = defineStore("plan", {
  state: () => ({
    plan: [],
  }),
  actions: {
    addPlanDetail(plans) {
      this.plan = plans.map((planItem) => ({
        title: planItem.title,
        startSchedule: planItem.start_schedule,
        endSchedule: planItem.end_schedule,
        userId: planItem.user_id,
        planDetail: planItem.plan_detail.map((detailItem) => ({
          contentId: detailItem.content_id,
          planDate: detailItem.plan_date,
          sequence: detailItem.sequence,
        })),
      }));
    },
  },
});

const useDate = defineStore("date", {
  state: () => ({
    date: "",
  }),
  actions: {
    selectedDate(date) {
      this.date = date;
    },
  },
});

export {
  useAttractionStore,
  useMapStore,
  useCategoryStore,
  usePlan,
  usePlanDetail,
  useDate,
};
