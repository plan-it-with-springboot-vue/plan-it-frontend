<template>
    <div id="sign-up-box-container">
        <div>
            <div class="sign-up-flex">
                <label id="sign-up-label">회원가입</label>
            </div>
            
            <SignUpInput label="아이디" type="text" v-model="id"/>
            <p v-if="fieldErrors.id" class="error-message">{{ fieldErrors.id }}</p>
            <div id="sign-up-idcheck-box-btn">
                <button id="sign-up-idcheck-btn">중복확인</button>
            </div>
            
            <SignUpInput label="비밀번호" type="password" v-model="password" placeholder="특수문자를 포함한 8~15자리" />
            <p v-if="fieldErrors.password" class="error-message">{{ fieldErrors.password }}</p>

            <SignUpInput label="비밀번호 확인" type="password" v-model="password_check" placeholder="비밀번호를 다시 입력해주세요." />
            <p v-if="fieldErrors.password_check" class="error-message">{{ fieldErrors.password_check }}</p>
            
            <SignUpInput label="이메일" type="email" v-model="email" placeholder="example@example.com" />
            <p v-if="fieldErrors.email" class="error-message">{{ fieldErrors.email }}</p>
            <div id="sign-up-email-box-btn">
                <button id="sign-up-email-btn">확인</button>
            </div>
            
            <SignUpInput label="인증번호" type="text" v-model="certification" placeholder="인증 번호를 입력해주세요." />
            <p v-if="fieldErrors.certification" class="error-message">{{ fieldErrors.certification }}</p>
            <div id="sign-up-certification-box-btn">
                <div>
                    <button id="sign-up-recertification-btn">재전송</button>
                </div>
                <div>
                    <button id="sign-up-certification-btn">인증하기</button>
                </div>
            </div>

            <SignUpInput label="이름" type="text" v-model="name"/>
            <p v-if="fieldErrors.name" class="error-message">{{ fieldErrors.name }}</p>
            
            <SignUpInput label="전화번호" type="text" v-model="phonenumber" placeholder="'-' 구분 없이 입력" />
            <p v-if="fieldErrors.phonenumber" class="error-message">{{ fieldErrors.phonenumber }}</p>
            
            <SignUpInput label="생년월일" type="text" v-model="birth" placeholder="ex) 20001225" />
            <p v-if="fieldErrors.birth" class="error-message">{{ fieldErrors.birth }}</p>

            <div id="sign-up-gender-box">
                <div id="sign-up-gender-label">
                    <label>성별</label>
                </div>
                <div>
                    <form>
                        <select id="sign-up-gender-select" v-model="gender" name="gender">
                            <option value="male">남성</option>
                            <option value="female">여성</option>
                        </select>
                    </form>
                </div>
            </div>

            <div>
                <button id="sign-up-btn" @click="submitSignUp">완료</button>
            </div>
        </div>
    
    </div>
</template>

<script setup>
// import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import SignUpInput from '../login/SignUpInputComponents.vue';

const name = ref('');
const id = ref('');
const email = ref('');
const certification = ref('');
const password = ref('');
const password_check = ref('');
const birth = ref('');
const phonenumber = ref('');
const gender = ref('male');

const fieldErrors = ref({
    name: '',
    id: '',
    email: '',
    certification: '',
    password: '',
    password_check: '',
    birth: '',
    phonenumber: ''
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
    isValid = validateField(id.value, 'id', '아이디를 입력해주세요.') && isValid;
    isValid = validateField(email.value, 'email', '이메일을 입력해주세요.') && isValid;
    isValid = validateField(certification.value, 'certification', '인증번호를 입력해주세요.') && isValid;
    isValid = validateField(password.value, 'password', '비밀번호를 입력해주세요.') && isValid;
    isValid = validateField(password_check.value, 'password_check', '비밀번호를 입력해주세요.') && isValid;
    isValid = validateField(birth.value, 'birth', '생년월일을 입력해주세요.') && isValid;
    isValid = validateField(phonenumber.value, 'phonenumber', '전화번호를 입력해주세요.') && isValid;

    return isValid;
};

//회원가입 API 연결
const submitSignUp = async () => {
    if (!validateInput()) {
        return;
    }

    try {
        // const response = await axios.post('', {
        //     id: id.value,
        //     password: password.value,
        //     name: name.value,
        //     phonenumber: phonenumber.value,
        //     email: email.value,
        //     birth: birth.value,
        //     gender: gender.value
        // });
        // console.log('회원가입 성공:', response.data);
        // 회원가입 성공 후 처리 로직 작성 (페이지 이동)
        
        router.push('/login');
    } catch (error) {
        console.error('회원가입 실패:', error);
        // 오류 처리 로직 작성
    }
};

</script>

<style scoped>
.sign-up-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 40rem;
    margin-bottom: 4.13rem;
}
#sign-up-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 11.75rem;
}
#sign-up-idcheck-box-btn {
    display: flex;
    margin-top: -0.5rem;
    margin-left: 22.62rem;
}
#sign-up-idcheck-btn {
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
#sign-up-email-box-btn {
    display: flex;
    margin-top: -0.5rem;
    margin-left: 22.62rem;
}
#sign-up-email-btn {
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
#sign-up-certification-box-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 9.25rem;
    height: 2.125rem;
    margin-top: -0.5rem;
    margin-left: 17.69rem;
}
#sign-up-recertification-btn {
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
#sign-up-certification-btn {
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
#sign-up-gender-box {
    margin-bottom: 1.37rem;
}
#sign-up-gender-label {
    display: flex;
    width: 11.875rem;
    height: 2.5625rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    font-size: 1rem;
}
#sign-up-gender-select {
    width: 26.9375rem;
    height: 3.125rem;
    flex-shrink: 0;
    border: 1px solid var(--Text-color, #C8C8C8);
    background: var(--text-color, #FFF);
}
#sign-up-btn {
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