<template>
    <div id="find-id-result-box-container">
        <div>
            <div class="find-id-result-flex">
                <label id="find-id-result-label">아이디 찾기</label>
            </div>
            <div id="find-id-box">
                <label>{{ userName }}님의 아이디는</label>
                <label>{{ userId }}입니다.</label>
            </div>
            <div>
                 <button id="move-login-btn" @click="moveToLogin">로그인 이동</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userName = ref('김싸피');
const userId = ref('ssa**');
const router = useRouter();

function moveToLogin() {
  router.push('/login');
}
</script>

<style scoped>
.find-id-result-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 4.13rem;
}
#find-id-result-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
}
#find-id-box {
    width: 26.875rem;
    height: 8.1875rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-shrink: 0;
    border-radius: 0.4375rem;
    border: 1px solid var(--light-gray, #C8C8C8);
    background: #FFF;
}
#move-login-btn {
    cursor: pointer;
    width: 26.875rem;
    height: 3.125rem;
    flex-shrink: 0;
    color: white;
    font-size: 1rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--main, #6499E9);
    background: var(--main, #6499E9);
    margin-top: 2.57rem;
}
</style>