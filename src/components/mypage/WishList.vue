<template>
    <div id="wish-list-box-container">
        <div>
            <div class="wish-list-flex">
                <label id="wish-list-label">관심 여행지</label>
            </div>
            <hr />
            <div id="wish-list-card-box">
                <div class="wish-list-card" v-for="wish in wishlist" :key="wish.favoritesId" @click="openModal(wish)">
                    <div id="wish-list-img-box">
                        <img v-if="wish.firstImage" id="wish-list-img" :src="wish.firstImage">
                        <img v-else id="wish-list-no-img" src="@/assets/image/plan-it-white-logo.png">
                    </div>
                    <div id="wish-list-content-box">
                        <div id="wish-list-title-box">
                            <div>
                                <label id="wish-list-title-label">{{ wish.title }}</label>
                                <label class="wish-list-type-label" v-if="wish.contentTypeId === 12">
                                    관광지
                                </label>
                                <label class="wish-list-type-label" v-if="wish.contentTypeId === 14">
                                    문화시설
                                </label>
                                <label class="wish-list-type-label" v-if="wish.contentTypeId === 15">
                                    축제공연
                                </label>
                                <label class="wish-list-type-label" v-if="wish.contentTypeId === 25">
                                    여행코스
                                </label>
                                <label class="wish-list-type-label" v-if="wish.contentTypeId === 28">
                                    레포츠
                                </label>
                                <label class="wish-list-type-label" v-if="wish.contentTypeId === 32">
                                    숙박
                                </label>
                                <label class="wish-list-type-label" v-if="wish.contentTypeId === 38">
                                    쇼핑
                                </label>
                                <label class="wish-list-type-label" v-if="wish.contentTypeId === 39">
                                    음식점
                                </label>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" @click.stop="deleteWish(userStore.userInfo?.userId, wish.contentId)">
                                    <path
                                        d="M3 6H21M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6M10 11V17M14 11V17"
                                        stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div id="wish-list-addr-box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                                <path
                                    d="M4.99995 0C2.09745 0 0 2.3475 0 5.25C0 9.1875 4.99995 15 4.99995 15C4.99995 15 10 9.1875 10 5.25C10 2.3475 7.90245 0 4.99995 0ZM1 5.25C1 3.18 2.92995 0.75 4.99995 0.75C7.06995 0.75 9 3.18 9 5.25C9 7.41 6.58995 11.4825 4.99995 13.5C3.43995 11.4975 1 7.3875 1 5.25Z"
                                    fill="black" />
                                <path
                                    d="M4.99995 7.125C6.03548 7.125 6.87495 6.28553 6.87495 5.25C6.87495 4.21447 6.03548 3.375 4.99995 3.375C3.96441 3.375 3.12495 4.21447 3.12495 5.25C3.12495 6.28553 3.96441 7.125 4.99995 7.125Z"
                                    fill="black" />
                            </svg>
                            <label id="wish-list-addr-label">{{ wish.addr1 }}</label>
                        </div>
                    </div>
                </div>
                <ModalComponent :show="showModal" :onClose="closeModal" :selectedWish="selectedWish" :selectedWishDescription="selectedWishDescription"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useUserStore } from "../../stores/user";
import ModalComponent from "./ModalComponent.vue"

const userStore = useUserStore();
const wishlist = ref([]);
const selectedWish = ref({}); // 선택된 관광지 정보
const selectedWishDescription = ref({});
const showModal = ref(false);

const openModal = (wish) => {
    axios.get(`http://localhost/attraction/view?contentId=${wish.contentId}`, {})
        .then((response) => {
                selectedWishDescription.value = response.data;
            }).catch((error) => {
                console.error("관광지 설명 조회 에러", error);
            });
    selectedWish.value = wish;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

//관심 여행지 목록 데이터 가져오기
const getWishlist = async (userId) => {
    try {
        const response = await axios.get(`http://localhost/attraction/like?userId=${userId}`);
        wishlist.value = response.data;
    } catch (error) {
        console.error('관광지 데이터 가져오기 오류', error);
    }
};

watch(() => userStore.userInfo, (newValue) => {
    if (newValue && newValue.userId) {
        getWishlist(newValue.userId);
    }
}, { immediate: true });

onMounted(() => {
    if (userStore.userInfo && userStore.userInfo.userId) {
        getWishlist(userStore.userInfo.userId);
    }
});


const deleteWish = async (userId, contentId) => {
    if (confirm('관심 여행지에서 삭제하시겠습니까?')) {
        try {
            await axios.delete(`http://localhost/attraction/like?userId=${userId}&contentId=${contentId}`);
            getWishlist(userStore.userInfo.userId); // 성공적으로 삭제된 후, 관심 여행지 목록을 다시 불러옵니다.
        } catch (error) {
            console.error('관심 여행지 삭제 오류:', error);
        }
    }
};

</script>

<style scoped>
#wish-list-box-container {
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin-bottom: 3.75rem;
}

.wish-list-flex {
    width: 58.375rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-top: 10rem;
    margin-bottom: 1.63rem;
}

#wish-list-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
}

#wish-list-card-box {
    width: auto;
    flex-grow: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 5.31rem;
}

.wish-list-card {
    width: 57.9375rem;
    height: 8.73556rem;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    border-radius: 1.25rem;
    /* border: 2px solid var(--serve, #C8C8C8); */
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    margin-bottom: 1.19rem;
    transition: background-color 0.3s ease;
}

.wish-list-card:hover {
    border: 2px solid var(--serve, #9EDDFF);
    background-color: #E8F2FF;
}

#wish-list-img-box {
    width: 13.75rem;
    height: 8.75rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1.25rem 0rem 0rem 1.25rem;
    background: lightgray 50% / cover no-repeat;
    cursor: pointer;
}

#wish-list-img {
    width: 13.75rem;
    height: 8.75rem;
    flex-shrink: 0;
    border-radius: 1.25rem 0rem 0rem 1.25rem;
    background: lightgray 50% / cover no-repeat;
}

#wish-list-no-img {
    width: 10.875rem;
    height: 3.625rem;
    flex-shrink: 0;
}

#wish-list-content-box {
    width: 39.1875rem;
    height: 6.2rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 1rem;
    cursor: pointer;
}

#wish-list-title-box {
    height: 2.9375rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    cursor: pointer;
}

#wish-list-title-label {
    display: flex;
    width: 39.375rem;
    height: 2rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
}

.wish-list-type-label {
    display: flex;
    width: 39.375rem;
    height: 1.5625rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--orange, #F29561);
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
}

#wish-list-addr-box {
    width: 39.1875rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
}

svg {
    margin-right: 0.2rem;
    cursor: pointer;
}

#wish-list-addr-label {
    display: flex;
    height: 2.1875rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
}
</style>