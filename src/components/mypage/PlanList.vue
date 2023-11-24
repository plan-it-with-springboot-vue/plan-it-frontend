<template>
    <div id="plan-list-box-container">
        <div>
            <div class="plan-list-flex">
                <label id="plan-list-label">여행 일정 관리</label>
            </div>
            <hr />
            <div id="plan-list-card-box">
                <div class="plan-list-card" v-for="plan in plans" :key="plan.planId" @click="navigateToPlan(plan.planId)">
                    <label id="plan-list-title-label">{{ plan.title }}</label>
                    <div id="plan-list-date-box">
                        <label class="plan-list-date-label">{{ formatDate(plan.startSchedule) }}</label>
                        <label class="plan-list-date-label">~{{ formatDate(plan.endSchedule) }}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();
const plans = ref([]);
const router = useRouter();

const navigateToPlan = (planId) => {
    router.push(`./planlist/${planId}`);
};

//날짜 형식 변환
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

//여행 계획 목록 가져오기
const getPlans = async (userId) => {
    if (!userId) return;
    axios.get(`http://localhost/plan/list?userId=${userId}`)
            .then((response) => {
                console.log(response.data);
                plans.value = response.data;
            })
            .catch((error) => {
                console.error('Error fetching plans:', error);
            });
};

watch(() => userStore.userInfo, (newValue) => {
    if (newValue && newValue.userId) {
        getPlans(newValue.userId);
    }
}, { immediate: true });

onMounted(() => {
    if (userStore.userInfo && userStore.userInfo.userId) {
        getPlans(userStore.userInfo.userId);
    }
});

</script>

<style scoped>
#plan-list-box-container {
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin-bottom: 3.75rem;
}
.plan-list-flex {
    width: 58.375rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-top: 10rem;
    margin-bottom: 1.63rem;
}

#plan-list-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
}

hr {
    border: 0;
    height: 0.0625rem;
    background-color: #000000;
}
#plan-list-card-box {
    width: auto;
    flex-grow: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 5.31rem;
}
.plan-list-card {
    width: 57.9375rem;
    height: 5.5rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-radius: 1.25rem;
    border: 2px solid var(--serve, #C8C8C8);
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    margin-bottom: 1.19rem;
    transition: background-color 0.3s ease;
}
.plan-list-card:hover {
    border: 2px solid var(--serve, #9EDDFF);
    background-color: #E8F2FF;
  }
#plan-list-title-label {
    width: 25.125rem;
    height: 2.9375rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    font-size: 1.1rem;
    font-weight: 500;
    margin-left: 1rem;
    cursor: pointer;
}
#plan-list-date-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    cursor: pointer;
}
.plan-list-date-label {
    height: 2.9375rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    color: var(--gray, #8C8C8C);
    text-align: right;
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
}
</style>