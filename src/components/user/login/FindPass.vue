<template>
    <div id="find-pass-box-container">
        <div>
            <div class="find-pass-flex">
                <label id="find-pass-label">비밀번호 찾기</label>
            </div>

            <form @submit.prevent="findPass">
                <FindPassInput label="아이디" type="text" v-model="id"/>
                <p v-if="fieldErrors.id" class="error-message">{{ fieldErrors.id }}</p>
                
                <FindPassInput label="이메일" type="email" v-model="email" placeholder="example@example.com" />
                <p v-if="fieldErrors.email" class="error-message">{{ fieldErrors.email }}</p>
                <div id="find-pass-email-box-btn">
                    <button id="find-pass-email-btn">확인</button>
                </div>
                
                <FindPassInput label="인증번호" type="text" v-model="certification" placeholder="인증 번호를 입력해주세요." />
                <p v-if="fieldErrors.certification" class="error-message">{{ fieldErrors.certification }}</p>
                <div id="find-pass-certification-box-btn">
                    <div>
                        <button id="find-pass-recertification-btn">재전송</button>
                    </div>
                    <div>
                        <button id="find-pass-certification-btn">인증하기</button>
                    </div>
                </div>
            
                <div>
                    <button id="find-pass-btn" type="submit">완료</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import FindPassInput from '../login/InputComponents.vue';

const id = ref('');
const email = ref('');
const certification = ref('');

const fieldErrors = ref({
    id: '',
    email: '',
    certification: ''
});

const router = useRouter();

//빈칸 유효성 검증 함수
const validateField = (fieldValue, fieldName, message) => {
    if (!fieldValue) {
        fieldErrors.value[fieldName] = message;
        return false;
    } else {
        fieldErrors.value[fieldName] = '';
        return true;
    }
};

const validateInput = () => {
    let isValid = true;

    isValid = validateField(id.value, 'id', '아이디를 입력해주세요.') && isValid;
    isValid = validateField(email.value, 'email', '이메일을 입력해주세요.') && isValid;
    isValid = validateField(certification.value, 'certification', '인증번호를 입력해주세요.') && isValid;

    return isValid;
};

//비밀번호 찾기 API 연결
const findPass = async () => {
    if (!validateInput()) {
        return;
    }

    try {
        // const response = await axios.post('https://example.com/api/findpass', {
        //     name: name.value,
        //     email: email.value,
        //     birth: birth.value
        // });
        // console.log('비밀번호 찾기 성공:', response.data);
        // 비밀번호 찾기 성공 후 처리 로직 작성 (페이지 이동)
        console.log(id.value);
        router.push('/findpass/result');
    } catch (error) {
        console.error('비밀번호 찾기 실패:', error);
        // 오류 처리 로직 작성
    }
};
</script>

<style scoped>
.find-pass-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 4.13rem;
}
#find-pass-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
}
#find-pass-email-box-btn {
    display: flex;
    margin-top: -0.5rem;
    margin-left: 22.62rem;
}
#find-pass-email-btn {
    cursor: pointer;
    width: 4.3125rem;
    height: 2.125rem;
    flex-shrink: 0;
    color: white;
    font-size: 0.75rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--main, #6499E9);
    background: var(--main, #6499E9);
}
#find-pass-certification-box-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 9.25rem;
    height: 2.125rem;
    margin-top: -0.5rem;
    margin-left: 17.69rem;
}
#find-pass-recertification-btn {
    cursor: pointer;
    width: 4.3125rem;
    height: 2.125rem;
    flex-shrink: 0;
    color: white;
    font-size: 0.75rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--light-gray, #C8C8C8);
    background: var(--light-gray, #C8C8C8);
}
#find-pass-certification-btn {
    cursor: pointer;
    width: 4.3125rem;
    height: 2.125rem;
    flex-shrink: 0;
    color: white;
    font-size: 0.75rem;
    border-radius: 0.4375rem;
    border: 1px solid var(--main, #6499E9);
    background: var(--main, #6499E9);
}
#find-pass-btn {
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
.error-message {
    color: red;
    font-size: 0.75rem;
    margin-top: -0.8rem;
}
</style>