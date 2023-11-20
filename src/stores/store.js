import { defineStore } from "pinia";

const useAttractionStore = defineStore("attraction", {
  state: () => ({
    modalVisible: false,
    selectedAttraction: [],
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

const useFavoriteStores = defineStore("favorites", {
  state: () => ({
    favorites: [],
  }),
  actions: {
    addFavorites(favorites) {
      this.favorites = favorites;
    },
  },
});

const useMapStore = defineStore("map", {
  state: () => ({
    selectedLocation: [
      {
        contentId: 125266,
        contentTypeId: 12,
        title: "",
        addr1: "",
        firstImage: "",
        latitude: 38.51112664,
        longitude: 128.4191502,
      },
    ],
  }),
  actions: {
    addAttractionList(attractionList) {
      const locations = attractionList.map((attractionItem) => ({
        contentId: attractionItem.contentId,
        contentTypeId: attractionItem.contentTypeId,
        title: attractionItem.title,
        addr1: attractionItem.addr1,
        firstImage: attractionItem.firstImage,
        latitude: attractionItem.latitude,
        longitude: attractionItem.longitude,
      }));

      this.selectedLocation = locations;
    },
  },
});

const useLocation = defineStore("location", {
  state: () => ({
    location: {
      contentId: 125266,
      contentTypeId: 12,
      title: "",
      addr1: "",
      firstImage: "",
      latitude: 37.540705,
      longitude: 126.956764,
    },
  }),
  actions: {
    selectLocation(attraction) {
      this.location = {
        contentId: attraction.contentId,
        contentTypeId: attraction.contentTypeId,
        title: attraction.title,
        addr1: attraction.addr1,
        firstImage: attraction.firstImage,
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
      sidoCode: 1,
      gugunCode: 1,
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
          attraction: detailItem.attractionItem,
          planDate: detailItem.planDate,
          time: detailItem.time,
          sequence: detailItem.sequence,
        })),
      };
    },

    addPlanDetail(attractionItem, planDate, time) {
      // plan의 planDetail에서 planDate를 찾아서 planDetail에 contentId 추가
      this.plan.planDetail.push({
        attraction: attractionItem,
        planDate: planDate,
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
  useFavoriteStores,
};
