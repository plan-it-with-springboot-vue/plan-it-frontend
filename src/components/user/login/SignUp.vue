<template>
    <div id="sign-up-box-container">
        <div id="sign-up-box-label">
            <label id="sign-up-label">회원가입</label>
        </div>
        <SignUpInput label="이름" type="text" v-model="name"/>
        <SignUpInput label="아이디" type="text" v-model="id"/>
        <div>
            <SignUpInput label="이메일" type="email" v-model="email" placeholder="example@example.com" />
            <button></button>
        </div>
    
    
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SignUpInput from '../login/SignUpInputComponents.vue';

const name = ref('');
const id = ref('');
const email = ref('');
</script>

<style scoped>
#sign-up-box-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
#sign-up-box-label {
    margin-bottom: 2.94rem;
}
#sign-up-label {
    font-size: 1.5rem;
    font-weight: 700;
}
</style>