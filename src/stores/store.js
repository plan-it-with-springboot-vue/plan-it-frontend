import { defineStore } from "pinia";

const useAttractionStore = defineStore("attraction", {
  state: () => ({
    modalVisible: false,
    selectedAttraction: [],
    selectedAttractionDes: {},
    selectedAttractionReview: [],
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
    selectedLocationList: [],
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

      this.selectedLocationList = locations;
    },

    deleteAttractionItem(contentId) {
      const index = this.selectedLocationList.findIndex(
        (item) => item.contentId === contentId
      );
      if (index !== -1) {
        this.selectedLocationList.splice(index, 1);
      }
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
      sidoCode: null,
      gugunCode: null,
    },
  }), // 12: 관광지, 14: 문화시설, 15: 축제공연행사, 25: 여행코스, 28: 레포츠, 32: 숙박, 38: 쇼핑, 39: 음식점
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
    plan: null,
    sequence: 0,
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
      this.plan.planDetail.push({
        attraction: attractionItem,
        planDate: planDate,
        time: time,
        sequence: this.sequence++,
      });
    },

    deletePlanDetail(contentId, planDate) {
      const indexToRemove = this.plan.planDetail.findIndex(
        (detailItem) =>
          detailItem.planDate === planDate &&
          detailItem.attraction.contentId === contentId
      );

      if (indexToRemove !== -1) {
        this.plan.planDetail.splice(indexToRemove, 1);
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
