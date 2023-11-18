<template>
    <div id="find-id-box-container">
        <div>
            <div class="find-id-flex">
                <label id="find-id-label">아이디 찾기</label>
            </div>

            <form @submit.prevent="findId">
                <FindIdInput label="이름" type="text" v-model="name"/>
                <p v-if="fieldErrors.name" class="error-message">{{ fieldErrors.name }}</p>
                
                <FindIdInput label="이메일" type="email" v-model="email" placeholder="example@example.com"/>
                <p v-if="fieldErrors.email" class="error-message">{{ fieldErrors.email }}</p>
                
                <FindIdInput label="생년월일" type="text" v-model="birth" placeholder="ex) 20001225"/>
                <p v-if="fieldErrors.birth" class="error-message">{{ fieldErrors.birth }}</p>
            
                <div>
                    <button id="find-id-btn" type="submit">완료</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import FindIdInput from '../login/InputComponents.vue';

const name = ref('');
const email = ref('');
const birth = ref('');

const fieldErrors = ref({
    name: '',
    email: '',
    birth: ''
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

    isValid = validateField(name.value, 'name', '이름을 입력해주세요.') && isValid;
    isValid = validateField(email.value, 'email', '이메일을 입력해주세요.') && isValid;
    isValid = validateField(birth.value, 'birth', '생년월일을 입력해주세요.') && isValid;

    return isValid;
};

//아이디 찾기 API 연결
const findId = async () => {
    if (!validateInput()) {
        return;
    }

    try {
        // const response = await axios.post('https://example.com/api/findid', {
        //     name: name.value,
        //     email: email.value,
        //     birth: birth.value
        // });
        // console.log('아이디 찾기 성공:', response.data);
        // 아이디 찾기 성공 후 처리 로직 작성 (페이지 이동)
        console.log(name.value);
        router.push('/findid/result');
    } catch (error) {
        console.error('아이디 찾기 실패:', error);
        // 오류 처리 로직 작성
    }
};
</script>

<style scoped>
.find-id-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 4.13rem;
}
#find-id-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
}
#find-id-btn {
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