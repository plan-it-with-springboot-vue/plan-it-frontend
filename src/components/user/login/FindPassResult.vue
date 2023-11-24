<template>
    <div id="find-pass-result-box-container">
        <div id="find-pass-result-box">
            <div class="find-pass-result-flex">
                <label id="find-pass-result-label">비밀번호 찾기</label>
            </div>
            <div id="find-pass-result-content">
                <div class="find-pass-result-inner">
                    <FindPassResultInput label="새 비밀번호" type="password" v-model="password" placeholder="새 비밀번호를 입력해주세요." />
                    <p v-if="fieldErrors.password" class="error-message">{{ fieldErrors.password }}</p>
                </div>
                <div class="find-pass-result-inner">
                    <FindPassResultInput label="새 비밀번호 확인" type="password" v-model="password_check"
                        placeholder="새 비밀번호를 다시 입력해주세요." />
                    <span v-if="isNewPasswordEntered && isConfirmPasswordEntered && !isNewPasswordMatching"
                        class="error-message">비밀번호가
                        일치하지 않습니다.</span>
                    <span v-else-if="isNewPasswordEntered && isConfirmPasswordEntered && isNewPasswordMatching"
                        class="ok-message">비밀번호가
                        일치합니다.</span>
                </div>
            </div>
            <div>
                <button id="find-pass-result-btn" @click="findPass">변경</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRouter, useRoute } from "vue-router";
import { ref, computed } from "vue";
import FindPassResultInput from "../login/InputComponents.vue";

const router = useRouter();
const route = useRoute();
const userId = route.query.id;

const password = ref(""); //비밀번호
const password_check = ref(""); //비밀번호 확인

const fieldErrors = ref({
    password: ""
});

// 새 비밀번호와 새 비밀번호 확인이 입력되었는지 여부와 일치 여부를 확인하는 computed 속성
const isNewPasswordEntered = computed(() => password.value.trim() !== '');
const isConfirmPasswordEntered = computed(() => password_check.value.trim() !== '');
const isNewPasswordMatching = computed(() => password.value === password_check.value);

//빈칸 유효성 검증 함수
const validateField = (fieldValue, fieldName, message) => {
    if (!fieldValue) {
        fieldErrors.value[fieldName] = message;
        return false;
    } else {
        fieldErrors.value[fieldName] = "";
        return true;
    }
};

const validateInput = () => {
    let isValid = true;

    isValid = validateField(password.value, "password", "비밀번호를 입력해주세요.") && isValid;

    return isValid;
};

//비밀번호 재설정 API 연결
const findPass = async () => {
    if (!validateInput()) {
        return;
    }

    if (!isNewPasswordMatching.value) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    try {
        // 비밀번호 재설정 API 호출
        const response = await axios.put('http://localhost/user/updatePassword', {
            userId: userId,
            newPassword: password.value
        });
        console.log('비밀번호 재설정 성공:', response.data);
        router.push("/login");
    } catch (error) {
        console.error("비밀번호 재설정 실패:", error);
        alert("비밀번호 재설정에 실패했습니다.");
    }
};
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

#find-pass-result-box-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#find-pass-result-box {
    width: 26.9375rem;
    height: 25rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#find-pass-result-content {
    width: 26.9375rem;
    height: 11.375rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.find-pass-result-inner {
    width: 26.9375rem;
    height: 4.8125rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 2rem;
}

.find-pass-result-label {
    display: flex;
    width: 26.9375rem;
    height: 2.5625rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    font-size: 1.125rem;
    font-weight: 400;
}

#find-pass-result-btn {
    width: 26.9375rem;
    height: 3.125rem;
    flex-shrink: 0;
    border: none;
    border-radius: 0.4375rem;
    border: 1px solid var(--main, #6499E9);
    background: var(--main, #6499E9);
    color: #FFF;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 2rem;
}

.error-message {
    display: flex;
    color: red;
    font-size: 0.75rem;
    margin-top: -0.8rem;
    margin-bottom: 1.37rem
}

.ok-message {
    display: flex;
    color: #04C600;
    font-size: 0.75rem;
    margin-top: -0.8rem;
    margin-bottom: 1.37rem
}
</style>