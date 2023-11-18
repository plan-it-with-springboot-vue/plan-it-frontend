<template>
    <div id="find-pass-result-box-container">
        <div>
            <div class="find-pass-result-flex">
                <label id="find-pass-result-label">비밀번호 찾기</label>
            </div>
            <div id="find-pass-box">
                <label>이메일로 임시 비밀번호가 발급되었습니다.</label>
                <label>로그인 후 비밀번호를 변경해 주세요.</label>
            </div>
            <div>
                 <button id="move-login-btn" @click="moveToLogin">로그인 이동</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function moveToLogin() {
  router.push('/login');
}
</script>

<style scoped>
.find-pass-result-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 4.13rem;
}
#find-pass-result-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
}
#find-pass-box {
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