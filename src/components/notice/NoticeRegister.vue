<template>
    <div id="notice-register-box-container">
        <div>
            <div class="notice-register-flex">
                <label id="notice-register-label">공지사항 작성</label>
            </div>
            <hr />
        </div>
        <div id="notice-register-content-box">
            <div id="notice-register-title-input-box">
                <label class="notice-register-input-label">제목</label>
                <input class="notice-register-input" v-model="subject" placeholder="제목을 입력하세요." />
            </div>
            <hr class="notice-register-content-hr" />
            <div id="notice-register-content-textarea-box">
                <label class="notice-register-input-label">내용</label>
                <textarea id="notice-register-textarea" v-model="content" placeholder="내용을 입력하세요."></textarea>
            </div>
            <hr class="notice-register-content-hr" />
            <div id="notice-register-file-box">
                <label id="notice-register-file-label">파일첨부</label>
                <button id="notice-register-file-btn">파일 선택</button>
            </div>
            <hr class="notice-register-content-hr" />
        </div>
        <div id="notice-register-btn-box">
            <button id="notice-cancel-btn" @click="goToNoticeList">취소</button>
            <button id="notice-register-btn" @click="registerPost">등록</button>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import axios from 'axios';
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();

const router = useRouter();
const subject = ref('');
const content = ref('');

// 게시글 등록
const registerPost = () => {
    const postData = {
        subject: subject.value,
        content: content.value,
        userId: userStore.userInfo.userId
    };

    if (confirm("게시글을 등록하시겠습니까?")) {
        axios
            .post(`http://localhost/notice/write`, postData)
            .then((response) => {
                // 게시글 등록 후 게시판 목록으로 이동
                router.push('/notice');
            })
            .catch((error) => {
                console.error("Error posting data:", error);
            });
    }
};

// 게시글 목록 페이지 경로로 이동
const goToNoticeList = () => {
    if (confirm("게시글 작성을 취소하시겠습니까?")) {
        router.push('/notice');
    }
};
</script>
  
<style scoped>
#notice-register-box-container {
    width: 59.75rem;
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-bottom: 0;
}

.notice-register-flex {
    width: 59.75rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-top: 10rem;
    margin-bottom: 1.63rem;
}

#notice-register-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
}

#notice-register-content-box {
    margin-top: 2.56rem;
}

#notice-register-title-input-box {
    width: 59.75rem;
    height: 5rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 1rem;
}

.notice-register-input-label {
    display: flex;
    width: 11.875rem;
    height: 2.5625rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    font-size: 1.125rem;
    font-weight: 600;
}

.notice-register-input {
    width: 59.75rem;
    height: 3.125rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 1.37rem;
    border-radius: 0.3125rem;
    border: 1px solid var(--Text-color, #c8c8c8);
    background: var(--text-color, #fff);
    box-sizing: border-box;
    font-size: 1rem;
}

#notice-register-content-textarea-box {
    width: 59.75rem;
    height: 18.75rem;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 2rem;
}

#notice-register-textarea {
    width: 59.75rem;
    height: 16.8125rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    border: 1px solid var(--Text-color, #c8c8c8);
    background: var(--text-color, #fff);
    font-size: 1rem;
    box-sizing: border-box;
}

.notice-register-content-hr {
    border: 0;
    height: 0.0625rem;
    background-color: #e7e7e7;
}

#notice-register-file-box {
    width: 59.75rem;
    height: 1.5rem;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

#notice-register-file-label {
    width: 5.875rem;
    height: 2.5625rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    font-size: 1.125rem;
    font-weight: 600;
}

#notice-register-file-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 0.75rem;
}

#notice-register-btn-box {
    width: 59.75rem;
    height: 2.0625rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
}

#notice-cancel-btn {
    width: 5.625rem;
    height: 2.0625rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    background: var(--main, #C8C8C8);
    border: none;
    color: #fff;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    margin-right: 1rem;
}

#notice-register-btn {
    width: 5.625rem;
    height: 2.0625rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    background: var(--main, #6499e9);
    border: none;
    color: #fff;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
}
</style>
  