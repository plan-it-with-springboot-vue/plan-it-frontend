<template>
    <div id="login-box-container">
        <div>
            <div class="login-flex" id="logo-img">
                <img src="@/assets/image/plan-it-logo.png" alt="PLAN IT">
            </div>
            <form @submit.prevent="login">
                <div class="login-flex" id="login-input">
                    <input type="text" class="input" v-model="userId" placeholder="아이디">
                    <input type="password" class="input" v-model="password" placeholder="비밀번호">
                </div>
                <div id="login-etc">
                    <div id="login-etc-save" @click="toggleSaveState">
                        <template v-if="isSaved">
                            <LoginCheckIcon />
                        </template>
                        <template v-else>
                            <LoginUncheckIcon />
                        </template>
                        <label id="login-text">아이디 저장</label>
                    </div>
                    <div id="login-etc-find">
                        <div>
                            <!-- 아이디 찾는 페이지로 이동 -->
                            <RouterLink to="/findid">아이디 찾기</RouterLink>
                        </div>
                        <div>
                            <label id="login-etc-find-line">|</label>
                        </div>
                        <div>
                            <!-- 비밀번호 찾는 페이지로 이동 -->
                            <RouterLink to="/findpass">비밀번호 찾기</RouterLink>
                        </div>
                    </div>
                </div>
                <div v-if="loginFailed" id="login-error">
                    아이디 또는 비밀번호를 잘못 입력했습니다.<br/>
                    입력하신 내용을 다시 확인해주세요.
                </div>
                <div id="login-button-box">
                    <button id="login-button" type="submit">로그인</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// import axios from 'axios';
import LoginCheckIcon from "../../../assets/svg/LoginCheckIcon.vue";
import LoginUncheckIcon from "../../../assets/svg/LoginUncheckIcon.vue";

//로그인 반응형 데이터
const userId = ref('');
const password = ref('');
const isSaved = ref(false); // 아이디 저장 상태를 관리하는 반응형 데이터
const loginFailed = ref(false); // 로그인 실패 상태 추가

function toggleSaveState() {
    isSaved.value = !isSaved.value; // 클릭할 때마다 아이디 저장 상태를 토글
}


async function login() {
    loginFailed.value = false; // 로그인 시도 전에 실패 상태 초기화
    const loginData = {
        userId: userId.value,
        password: password.value,
    };
    console.log(loginData);

    try {
        console.log(loginData);
        // const response = await axios.post('https://example.com/login', loginData);
        // 로그인 성공 처리
        console.log(response.data);
    } catch (error) {
        // 로그인 실패 처리
        console.error(error);
        loginFailed.value = true; // 로그인 실패 시 실패 상태 설정
    }
}
</script>


<style scoped>
.login-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
#logo-img img {
    width: 25.1875rem;
    height: auto;
}
.input {
    width: 26.875rem;
    height: 3.125rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    border: 1px solid var(--light-gray, #C8C8C8);
    background: #FFF;
    margin-bottom: 1rem;
    box-sizing: border-box;
}
#login-etc {
    width: 26.875rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}
#login-etc-save {
    cursor: pointer;
    margin: 0;
    display: flex;
    align-items: center;
}
#login-text {
    font-size: 0.75rem;
    margin-left: 0.3rem;
}
#login-etc-find {
    width: 8.6875rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}
a {
    text-decoration: none;
    color: black;
    color: #000;
    text-align: center;
    font-size: 0.75rem;
}
#login-etc-find-line {
    font-family: Noto Sans;
    font-size: 0.8rem;
}
#login-button-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-top: 4.06rem;
}
#login-button {
    cursor: pointer;
    width: 26.875rem;
    height: 3.125rem;
    background-color: #6499E9;
    color: white;
    font-size: 1rem;
    border:none;
    border-radius: 0.3rem;
}
#login-error {
    color: red;
    /* text-align: center; */
    font-size: 0.75rem;
    margin-top: 1.5rem;
    margin-bottom: -3rem;
}
</style>