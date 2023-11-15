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
      // planDate가 없으면 새로운 객체 생성
      const existingDetailIndex = this.plan.planDetail.findIndex(
        (detailItem) => detailItem.planDate === planDate
      );

      if (existingDetailIndex !== -1) {
        this.plan.planDetail[existingDetailIndex].contentId = contentId;
      } else {
        this.plan.planDetail.push({
          contentId,
          planDate,
          time: time,
        });
      }
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
  usePlanStore,
  useDate,
};
