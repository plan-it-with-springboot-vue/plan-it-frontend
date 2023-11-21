<template>
    <TheHeader />
    <div id="wish-list-container">
        <div>
            <WishList />
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import TheHeader from '../components/layout/TheHeader.vue';
import TheFooter from '../components/layout/TheFooter.vue';
import WishList from "../components/mypage/WishList.vue";
</script>

<style scoped>
#wish-list-container {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>