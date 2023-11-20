<template>
    <div id="mypage-box-container">
        <div>
            <div class="mypage-flex">
                <label id="mypage-label">마이페이지</label>
            </div>
            <hr />
        </div>
        <div id="mypage-box">
            <div id="mypage-content-box">
                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">아이디</label>
                    <label>{{ user.userId }}</label>
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">비밀번호</label>
                    <label>{{ user.userPassword }}</label>
                    <button :id="statePasswordChange ? 'mypage-pwd-cancel-btn' : 'mypage-pwd-btn'"
                        @click="togglePasswordChange">
                        {{ statePasswordChange ? '취소' : '변경' }}
                    </button>
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">비밀번호 변경</label>
                    <div id="mypage-password-input-box">
                        <input class="mypage-input" type="password" placeholder="새 비밀번호"
                            v-bind:disabled="!statePasswordChange" />
                        <input class="mypage-input" type="password" placeholder="새 비밀번호 확인"
                            v-bind:disabled="!statePasswordChange" />
                    </div>
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">이메일</label>
                    <label>{{ user.userEmail }}</label>
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">이름</label>
                    <label>{{ user.userName }}</label>
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">전화번호</label>
                    <input class="mypage-input" v-model="user.userPhoneNumber">
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">생년월일</label>
                    <label>{{ user.userBirth }}</label>
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">성별</label>
                    <label>{{ user.userGender }}</label>
                </div>
                <hr class="mypage-content-hr" />
            </div>
        </div>
        <div id="mypage-btn-box">
            <div id="mypage-btn-between-box">
                <button id="mypage-cancel-btn" @click="goToMain">취소</button>
                <button id="mypage-modify-btn" @click="submitChanges">수정</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import axios from 'axios';

const user = ref({
    userId: "ssafy",
    userPassword: "****",
    userName: "김싸피",
    userPhoneNumber: "010-3333-8888",
    userEmail: "ssafy@ssafy.com",
    userBirth: "1999.11.20",
    userGender: "여",
});

const statePasswordChange = ref(false);
const router = useRouter();

const togglePasswordChange = () => {
    statePasswordChange.value = !statePasswordChange.value;
};

// 메인 화면으로 이동
const goToMain = () => {
    if (confirm("수정을 취소하시겠습니까?")) {
        router.push('/');
    }
};

// 사용자 데이터를 불러오는 함수
// const getUserData = async () => {
//     try {
//         const response = await axios.get('API_ENDPOINT');
//         user.value = response.data; // 응답 데이터를 user에 할당
//     } catch (error) {
//         console.error('API 요청 중 오류 발생:', error);
//     }
// };

// onMounted(getUserData);

// 수정 API 호출
// const submitChanges = async () => {
//     try {
//         const response = await axios.post('API_ENDPOINT', {
//             // 데이터를 여기에 넣으세요. 예: user
//         });
//         console.log(response.data);
//         // 성공적으로 제출되었을 때의 처리
//     } catch (error) {
//         console.error('API 요청 중 오류 발생:', error);
//     }
// };

</script>

<style scoped>
.mypage-flex {
    width: 58.375rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-top: 10rem;
    margin-bottom: 1.63rem;
}

#mypage-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
}

.mypage-content-box {
    width: 58.375rem;
    height: 37.5625rem;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
}

.mypage-content-row-box {
    width: 58.375rem;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
}

#mypage-password-input-box {
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.mypage-content-label {
    width: 8.5625rem;
    height: 2.5625rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex-shrink: 0;
    color: #000;
    font-size: 1.125rem;
    font-weight: 400;
    margin-left: 1rem;
    margin-right: 1rem;
}

.mypage-input {
    width: 23.6875rem;
    height: 2.2rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    border: 1px solid var(--Text-color, #C8C8C8);
    background: var(--text-color, #FFF);
    box-sizing: border-box;
    padding-left: 0.7rem;
}

#mypage-pwd-btn {
    width: 3.9375rem;
    height: 1.9375rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    border: 1px solid var(--main, #6499E9);
    background: var(--main, #6499E9);
    color: #FFF;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    margin-left: 1.5rem;
    cursor: pointer;
}

#mypage-pwd-cancel-btn {
    width: 3.9375rem;
    height: 1.9375rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    border: 1px solid var(--main, #C8C8C8);
    background: var(--main, #C8C8C8);
    color: #FFF;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    margin-left: 1.5rem;
    cursor: pointer;
}

hr {
    border: 0;
    height: 0.0625rem;
    background-color: #000000;
    /* 선의 색상 */
}

.mypage-content-hr {
    border: 0;
    height: 0.0625rem;
    background-color: #e7e7e7;
    /* 선의 색상 */
}

#mypage-btn-box {
    height: 7rem;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

#mypage-btn-between-box {
    width: 12rem;
    height: 2.8125rem;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

#mypage-cancel-btn {
    width: 5rem;
    height: 2.2rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    border: 1px solid var(--light-gray, #C8C8C8);
    background: var(--light-gray, #C8C8C8);
    color: #FFF;
    text-align: center;
    font-size: 0.75em;
    font-weight: 600;
    cursor: pointer;
}

#mypage-modify-btn {
    width: 5rem;
    height: 2.2rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    border: 1px solid var(--main, #6499E9);
    background: var(--main, #6499E9);
    color: #FFF;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
}
</style>
