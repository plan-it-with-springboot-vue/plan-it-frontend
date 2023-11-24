<template>
  <div id="sign-up-box-container">
    <div>
      <div class="sign-up-flex">
        <label id="sign-up-label">회원가입</label>
      </div>

      <SignUpInput label="아이디" type="text" v-model="id" :disabled="isIdDuplicated" />
      <p v-if="fieldErrors.id" class="error-message">{{ fieldErrors.id }}</p>
      <p v-if="duplicationConfirmed" class="ok-message">{{ duplicationConfirmed }}</p>
      <div id="sign-up-idcheck-box-btn">
        <button id="sign-up-idcheck-btn" @click="duplicationCheck">중복확인</button>
      </div>

      <SignUpInput label="비밀번호" type="password" v-model="password" placeholder="비밀번호를 입력해주세요." />
      <p v-if="fieldErrors.password" class="error-message">{{ fieldErrors.password }}</p>

      <SignUpInput label="비밀번호 확인" type="password" v-model="password_check" placeholder="비밀번호를 다시 입력해주세요." />

      <span v-if="isNewPasswordEntered && isConfirmPasswordEntered && !isNewPasswordMatching" class="error-message">비밀번호가
        일치하지 않습니다.</span>
      <span v-else-if="isNewPasswordEntered && isConfirmPasswordEntered && isNewPasswordMatching" class="ok-message">비밀번호가
        일치합니다.</span>

      <SignUpInput label="이메일" type="email" v-model="email" :disabled="isEmailAuthenticated"
        placeholder="example@example.com" />
      <p v-if="fieldErrors.email" class="error-message">{{ fieldErrors.email }}</p>
      <div id="sign-up-email-box-btn">
        <button id="sign-up-email-btn" @click="sendEmail">확인</button>
      </div>

      <SignUpInput label="인증번호" type="text" v-model="certification" placeholder="인증 번호를 입력해주세요." />
      <p v-if="fieldErrors.certification" class="error-message">
        {{ fieldErrors.certification }}
      </p>
      <div id="sign-up-certification-box-btn">
        <div>
          <button id="sign-up-recertification-btn" @click="sendEmail">재전송</button>
        </div>
        <div>
          <button id="sign-up-certification-btn" @click="emailAuthCheck">인증하기</button>
        </div>
      </div>

      <SignUpInput label="이름" type="text" v-model="name" />
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
              <option value="M">남성</option>
              <option value="F">여성</option>
            </select>
          </form>
        </div>
      </div>

      <div>
        <button id="sign-up-btn" @click="signUp">완료</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import SignUpInput from "../login/InputComponents.vue";

const name = ref("");
const id = ref("");
const email = ref("");
const certification = ref(""); //인증번호
const password = ref(""); //비밀번호
const password_check = ref(""); //비밀번호 확인
const birth = ref("");
const phonenumber = ref("");
const gender = ref("M");

const fieldErrors = ref({
  name: "",
  id: "",
  email: "",
  certification: "",
  password: "",
  birth: "",
  phonenumber: "",
});
const duplicationConfirmed = ref(''); //아이디 중복 체크 성공 문구

// 새 비밀번호와 새 비밀번호 확인이 입력되었는지 여부와 일치 여부를 확인하는 computed 속성
const isNewPasswordEntered = computed(() => password.value.trim() !== '');
const isConfirmPasswordEntered = computed(() => password_check.value.trim() !== '');
const isNewPasswordMatching = computed(() => password.value === password_check.value);

const isIdDuplicated = ref(false); // 아이디 중복 확인 상태
const isEmailAuthenticated = ref(false); // 이메일 인증 상태

const router = useRouter();

// 아이디 중복 체크
const duplicationCheck = async () => {
  if (!id.value.trim()) {
    duplicationConfirmed.value = "";
    fieldErrors.value.id = "아이디를 입력해주세요.";
    return;
  }
  try {
    const response = await axios.get(`http://localhost/user/checkDuplicate/${id.value}`)
    if (response.data) {
      // 중복된 아이디가 있는 경우
      duplicationConfirmed.value = "";
      fieldErrors.value.id = "중복된 아이디입니다.";
    } else {
      // 중복된 아이디가 없는 경우
      fieldErrors.value.id = "";
      duplicationConfirmed.value = "사용 가능한 아이디입니다.";
      isIdDuplicated.value = true;
    }
  } catch (error) {
    console.error('아이디 중복 체크 실패:', error);
    fieldErrors.value.id = "중복 확인 중 오류가 발생했습니다.";
  }
};

// 이메일 형식을 확인하는 함수
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

//이메일 인증 메일 전송
const sendEmail = async () => {
  if (!email.value.trim()) {
    fieldErrors.value.email = "이메일을 입력해주세요.";
    return;
  }
  if (!validateEmail(email.value)) {
    fieldErrors.value.email = "유효하지 않은 이메일 형식입니다.";
    return;
  }
  fieldErrors.value.email = "";
  try {
    const response = await axios.post('http://localhost/user/emailSend', {
      email: email.value
    });
    if (response.data) {
      // 전송 성공
      fieldErrors.value.email = "";
      alert("이메일을 전송했습니다. 확인 후 인증번호를 입력해주세요.");
    } else {
      // 전송 실패
      alert("이메일 전송을 실패했습니다!");
    }
  } catch (error) {
    console.error('이메일 전송 실패:', error);
  }
};

//이메일 인증번호 체크
const emailAuthCheck = async () => {
  if (!certification.value.trim()) {
    fieldErrors.value.certification = "인증번호를 입력해주세요.";
    return;
  }
  try {
    const response = await axios.post('http://localhost/user/emailAuthCheck', {
      email: email.value,
      authNum: certification.value
    });
    console.log(typeof response.data);
    if (response.data) {
      // 전송 성공
      alert("이메일 인증 완료");
      isEmailAuthenticated.value = true;
    } else {
      // 전송 실패
      alert("이메일 인증 실패");
    }
  } catch (error) {
    console.error('이메일 인증 실패:', error);
  }
};

//빈칸 유효성 검증 함수
const validateField = (fieldValue, fieldName, message) => {
  if (!fieldValue) {
    duplicationConfirmed.value = "";
    fieldErrors.value[fieldName] = message;
    return false;
  } else {
    fieldErrors.value[fieldName] = "";
    return true;
  }
};

const validateInput = () => {
  let isValid = true;

  isValid = validateField(name.value, "name", "이름을 입력해주세요.") && isValid;
  isValid = validateField(id.value, "id", "아이디를 입력해주세요.") && isValid;
  isValid = validateField(email.value, "email", "이메일을 입력해주세요.") && isValid;
  isValid =
    validateField(certification.value, "certification", "인증번호를 입력해주세요.") && isValid;
  isValid = validateField(password.value, "password", "비밀번호를 입력해주세요.") && isValid;
  isValid = validateField(birth.value, "birth", "생년월일을 입력해주세요.") && isValid;
  isValid = validateField(phonenumber.value, "phonenumber", "전화번호를 입력해주세요.") && isValid;

  return isValid;
};

//회원가입 API 연결
const signUp = async () => {
  if (!validateInput()) {
    return;
  }

  if (!isIdDuplicated.value) {
    alert("아이디 중복 확인이 필요합니다.");
    return;
  }

  if (!isNewPasswordMatching.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  if (!isEmailAuthenticated.value) {
    alert("이메일 인증을 완료해주세요.");
    return;
  }

  try {
    // 회원가입 API 호출
    const response = await axios.post('http://localhost/user/join', {
      userId: id.value,
      userPassword: password.value,
      userName: name.value,
      userPhoneNumber: phonenumber.value,
      userEmail: email.value,
      userBirth: birth.value,
      userGender: gender.value
    });
    console.log('회원가입 성공:', response.data);
    router.push("/login");
  } catch (error) {
    console.error("회원가입 실패:", error);
    alert("회원가입에 실패했습니다.");
  }
};
</script>

<style scoped>
.sign-up-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30rem;
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
  border-radius: 0.3125rem;
  border: 1px solid var(--main, #6499e9);
  background: var(--main, #6499e9);
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
  border-radius: 0.3125rem;
  border: 1px solid var(--main, #6499e9);
  background: var(--main, #6499e9);
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
  border-radius: 0.3125rem;
  border: 1px solid var(--light-gray, #c8c8c8);
  background: var(--light-gray, #c8c8c8);
}

#sign-up-certification-btn {
  cursor: pointer;
  width: 4.3125rem;
  height: 2.125rem;
  flex-shrink: 0;
  color: white;
  font-size: 0.75rem;
  border-radius: 0.3125rem;
  border: 1px solid var(--main, #6499e9);
  background: var(--main, #6499e9);
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
  border-radius: 0.3125rem;
  border: 1px solid var(--Text-color, #c8c8c8);
  background: var(--text-color, #fff);
  padding-left: 0.6rem;
  cursor: pointer;
}

#sign-up-btn {
  cursor: pointer;
  width: 26.875rem;
  height: 3.125rem;
  flex-shrink: 0;
  color: white;
  font-size: 1rem;
  border-radius: 0.3125rem;
  border: 1px solid var(--main, #6499e9);
  background: var(--main, #6499e9);
  margin-top: 2.57rem;
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
