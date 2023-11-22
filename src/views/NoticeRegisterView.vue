<template>
    <TheHeader />
    <div id="notice-register-container">
        <div>
            <NoticeRegister />
        </div>
    </div>
    <TheFooter />
</template>
  
<script setup>
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";
import NoticeRegister from "../components/notice/NoticeRegister.vue";
</script>
  
<style scoped>
#notice-register-container {
    display: flex;
    min-height: 100vh;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
</style>
  