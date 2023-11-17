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
    selectedLocation: [
      {
        title: "임시 데이터",
        addr1: "임시 주소",
        latitude: 36.87884469,
        longitude: 128.4391216,
      },
    ],
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

const useLocation = defineStore("location", {
  state: () => ({
    location: null,
  }),
  actions: {
    selectLocation(attraction) {
      this.location = {
        title: attraction.title,
        addr1: attraction.addr1,
        latitude: attraction.latitude,
        longitude: attraction.longitude,
      };
    },
  },
});

const useCategoryStore = defineStore("category", {
  state: () => ({
    selectedCategory: {
      contentTypeId: [12, 14, 15, 25, 28, 32, 38, 39],
      sidoCode: 0,
      gugunCode: 0,
    },
  }), // 0은 전체를 뜻함 // 12: 관광지, 14: 문화시설, 15: 축제공연행사, 25: 여행코스, 28: 레포츠, 32: 숙박, 38: 쇼핑, 39: 음식점
  actions: {
    addCategoryCondition(types, sido, gugun) {
      this.selectedCategory = {
        contentTypeId: types,
        sidoCode: sido || 0,
        gugunCode: gugun || 0,
      };
    },
  },
});

const usePlanStore = defineStore("plan", {
  state: () => ({
    plan: {
      title: "",
      startSchedule: "",
      endSchedule: "",
      userId: "",
      planDetail: [],
    },
  }),
  actions: {
    addPlan(plan) {
      this.plan = {
        title: plan.title,
        startSchedule: plan.startSchedule,
        endSchedule: plan.endSchedule,
        userId: plan.userId,
        planDetail: plan.planDetail.map((detailItem) => ({
          contentId: detailItem.contentId,
          planDate: detailItem.planDate,
          time: detailItem.time,
        })),
      };
    },

    addPlanDetail(contentId, planDate, time) {
      // plan의 planDetail에서 planDate를 찾아서 planDetail에 contentId 추가
      this.plan.planDetail.push({
        contentId,
        planDate,
        time: time,
      });
    },

    deletePlanDetail(contentId, planDate) {
      // plan의 planDetail에서 planDate를 찾아서 plandDetail에 contentId 삭제
      const existingDetailIndex = this.plan.planDetail.findIndex(
        (detailItem) => detailItem.planDate === planDate
      );

      if (existingDetailIndex !== -1) {
        this.plan.planDetail.splice(existingDetailIndex, 1);
      }
    },
  },
});

const useDateStore = defineStore("date", {
  state: () => ({
    date: "",
  }),
  actions: {
    selectDate(date) {
      this.date = date;
    },
  },
});

export {
  useAttractionStore,
  useMapStore,
  useCategoryStore,
  usePlanStore,
  useDateStore,
  useLocation,
};
