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
                    <label>{{ userStore.userInfo?.userId }}</label>
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">비밀번호</label>
                    <label>{{ passwordStars }}</label>
                    <button :id="statePasswordChange ? 'mypage-pwd-cancel-btn' : 'mypage-pwd-btn'"
                        @click="togglePasswordChange">
                        {{ statePasswordChange ? '취소' : '변경' }}
                    </button>
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">비밀번호 변경</label>
                    <div id="mypage-password-input-box">
                        <input class="mypage-input" type="password" placeholder="현재 비밀번호" v-model="currentPassword"
                            v-bind:disabled="!statePasswordChange" />
                        <input class="mypage-input" type="password" placeholder="새 비밀번호" v-model="newPassword"
                            v-bind:disabled="!statePasswordChange" />
                        <input class="mypage-input" type="password" placeholder="새 비밀번호 확인" v-model="confirmPassword"
                            v-bind:disabled="!statePasswordChange" />
                        <span v-if="isNewPasswordEntered && isConfirmPasswordEntered && !isNewPasswordMatching"
                            id="mypage-password-not-same-text">비밀번호가 일치하지 않습니다.</span>
                        <span v-else-if="isNewPasswordEntered && isConfirmPasswordEntered && isNewPasswordMatching"
                            id="mypage-password-same-text">비밀번호가 일치합니다.</span>
                    </div>
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">이메일</label>
                    <label>{{ userStore.userInfo?.userEmail }}</label>
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">이름</label>
                    <label>{{ userStore.userInfo?.userName }}</label>
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">전화번호</label>
                    <input class="mypage-input" v-model="phoneNumber">
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">생년월일</label>
                    <label>{{ userStore.userInfo?.userBirth }}</label>
                </div>
                <hr class="mypage-content-hr" />

                <div class="mypage-content-row-box">
                    <label class="mypage-content-label">성별</label>
                    <label>{{ genderText }}</label>
                </div>
                <hr class="mypage-content-hr" />
                <div id="mypage-secession-btn-box">
                    <button id="mypage-secession-btn" @click="userSecession">회원탈퇴</button>
                </div>
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
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from "../../stores/user";
import { computed } from 'vue';

const userStore = useUserStore();
const router = useRouter();

const currentPassword = ref(''); //현재 비밀번호
const newPassword = ref(''); //새 비밀번호
const confirmPassword = ref(''); //새 비밀번호 확인
const statePasswordChange = ref(false); //변경 버튼 활성화 여부

// 새 비밀번호와 새 비밀번호 확인이 입력되었는지 여부와 일치 여부를 확인하는 computed 속성
const isNewPasswordEntered = computed(() => newPassword.value.trim() !== '');
const isConfirmPasswordEntered = computed(() => confirmPassword.value.trim() !== '');
const isNewPasswordMatching = computed(() => newPassword.value === confirmPassword.value);

const phoneNumber = ref('');

const togglePasswordChange = () => {
    statePasswordChange.value = !statePasswordChange.value;
    resetPasswordFields();
};

const resetPasswordFields = () => {
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
};

//비밀번호 * 표시
const passwordStars = computed(() => {
    return '*'.repeat(userStore.userInfo?.userPassword.length);
});
//성별 처리
const genderText = computed(() => {
    return userStore.userInfo?.userGender === 'M' ? '남' : '여';
});

// 데이터 로딩이 완료되면 isLogin 상태를 설정
onMounted(async () => {
    if (sessionStorage.getItem("accessToken")) {
        await userStore.getUserInfo(sessionStorage.getItem("accessToken"));
        userStore.isLogin = true;
        phoneNumber.value = userStore.userInfo?.userPhoneNumber || '';
    }
});

// 메인 화면으로 이동
const goToMain = () => {
    if (confirm("수정을 취소하시겠습니까?")) {
        router.push('/');
    }
};

// 수정 API 호출
const submitChanges = async () => {
    if (confirm("회원 정보를 수정하시겠습니까?")) {
        console.log(statePasswordChange.value);

        //비밀번호 변경 버튼을 누른 경우
        if (statePasswordChange.value) {
            if (newPassword.value.trim() === '' || confirmPassword.value.trim() === '') {
                alert("새 비밀번호를 입력해주세요!");
            }
            else if (!isNewPasswordMatching.value) {
                alert("새 비밀번호가 일치하지 않습니다!");
            }
            else {
                try {
                    //현재 비밀번호와 일치할 경우 비밀번호 변경
                    const response = await axios.post('http://localhost/user/verifyPassword', {
                        userId: userStore.userInfo.userId,
                        userPassword: currentPassword.value
                    });
                    if (response.data) {
                        // 회원 정보 변경
                        axios.put('http://localhost/user/modify', {
                            userId: userStore.userInfo.userId,
                            userPassword: newPassword.value,
                            userPhoneNumber: phoneNumber.value

                        }).then((response) => {
                            alert("수정이 완료되었습니다.")
                            router.push('/');
                        }).catch((error) => {
                            console.error("회원 정보 수정 에러", error);
                        });
                    }
                    else {
                        alert("기존 비밀번호가 일치하지 않습니다!")
                    }
                    console.log(response.data);

                } catch (error) {
                    console.error('API 요청 중 오류 발생:', error);
                }
            }
        }
        //비밀번호 변경 버튼을 누르지 않은 경우
        else {
            // 회원 정보 변경
            axios.put('http://localhost/user/modify', {
                userId: userStore.userInfo.userId,
                userPassword: "",
                userPhoneNumber: phoneNumber.value

            }).then((response) => {
                alert("수정이 완료되었습니다.")
                router.push('/');
            }).catch((error) => {
                console.error("회원 정보 수정 에러", error);
            });
        }
    }
};

//회원 탈퇴 API 호출
const userSecession = () => {
    const userId = userStore.userInfo?.userId;

    if (confirm("정말 회원을 탈퇴하시겠습니까?")) {

        // 회원 탈퇴 API 호출
        axios.delete(`http://localhost/user/deleteUser/${userId}`)
            .then((response) => {
                console.log(response.data);
                // 회원 탈퇴 후 로그인 상태를 false로 설정
                userStore.isLogin = false;
                // 세션 스토리지에서 사용자 정보 제거
                sessionStorage.removeItem("accessToken");
                // 로그인 페이지로 리디렉션
                router.push('/login');
            })
            .catch((error) => {
                console.error("Error in user secession:", error);
            });
    }
};
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
    height: 9rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
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
    margin-bottom: 0.2rem;
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

#mypage-secession-btn-box {
    width: 58.375rem;
    height: 2.0625rem;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

#mypage-secession-btn {
    width: 4.625rem;
    height: 2.0625rem;
    flex-shrink: 0;
    border: none;
    border-radius: 0.3125rem;
    background: var(--red, #FF3F3F);
    color: #FFF;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.5rem;
}

#mypage-password-not-same-text {
    display: flex;
    width: 13.5625rem;
    height: 1.3125rem;
    justify-content: flex-start;
    align-items: flex-start;
    flex-shrink: 0;
    color: var(--red, #FF3F3F);
    font-size: 0.8rem;
    font-weight: 400;
}

#mypage-password-same-text {
    display: flex;
    width: 13.5625rem;
    height: 1.3125rem;
    justify-content: flex-start;
    align-items: flex-start;
    flex-shrink: 0;
    color: var(--green, #04C600);
    font-size: 0.8rem;
    font-weight: 400;
}
</style>
