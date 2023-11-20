<template>
    <TheHeader />
    <div>
        <div id="plan-list-container">
            <PlanList />
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import PlanList from "../components/mypage/PlanList.vue";
</script>

<style scoped>
#plan-list-container {
    display: flex;
    min-height: 100vh;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
</style>