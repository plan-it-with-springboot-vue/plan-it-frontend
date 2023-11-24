<template>
    <TheHeader />
    <div id="sign-up-container">
        <div> 
            <SignUp />
        </div>
    </div>
    <TheFooter />
</template>

<script setup>
import TheFooter from '../components/layout/TheFooter.vue';
import TheHeader from '../components/layout/TheHeader.vue';
import SignUp from "../components/user/login/SignUp.vue";
</script>

<style scoped>
#sign-up-container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    margin-bottom: 50rem;
}
</style>