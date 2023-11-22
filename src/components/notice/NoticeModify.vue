<template>
    <div id="notice-modify-box-container">
        <div>
            <div class="notice-modify-flex">
                <label id="notice-modify-label">공지사항 수정</label>
            </div>
            <hr />
        </div>
        <div id="notice-modify-content-box">
            <div id="notice-modify-title-input-box">
                <label class="notice-modify-input-label">제목</label>
                <input class="notice-modify-input" v-model="subject" />
            </div>
            <hr class="notice-modify-content-hr" />
            <div id="notice-modify-content-textarea-box">
                <label class="notice-modify-input-label">내용</label>
                <textarea id="notice-modify-textarea" v-model="content"></textarea>
            </div>
            <hr class="notice-modify-content-hr" />
            <div id="notice-modify-file-box">
                <label id="notice-modify-file-label">파일첨부</label>
                <button id="notice-modify-file-btn">파일 선택</button>
            </div>
            <hr class="notice-modify-content-hr" />
        </div>
        <div id="notice-modify-btn-box">
            <button id="notice-cancel-btn" @click="goToNoticeList">취소</button>
            <button id="notice-modify-btn" @click="modifyPost">수정</button>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const noticeId = route.params.noticeId; // URL에서 noticeId 가져오기
const subject = ref('');
const content = ref('');
const notice = ref({});

// 공지사항 수정
const modifyPost = () => {
    const postData = {
        noticeId: noticeId,
        subject: subject.value,
        content: content.value
    };

    if (confirm("게시글을 수정하시겠습니까?")) {
        axios
            .post(`http://localhost/notice/modify`, postData)
            .then((response) => {
                // 공지사항 수정 후 게시판 목록으로 이동
                router.push('/notice');
            })
            .catch((error) => {
                console.error("Error posting data:", error);
            });
    }
};

// 공지사항 목록 페이지 경로로 이동
const goToNoticeList = () => {
    if (confirm("게시글 작성을 취소하시겠습니까?")) {
        router.push('/notice');
    }
};

//공지사항 상세 조회
const getNotice = () => {
    axios
        .get(`http://localhost/notice/view?noticeId=${noticeId}`, {
        })
        .then((response) => {
            notice.value = response.data;
            subject.value = notice.value.subject;
            content.value = notice.value.content;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
};

onMounted(getNotice);
</script>
  
<style scoped>
#notice-modify-box-container {
    width: 59.75rem;
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-bottom: 0;
}

.notice-modify-flex {
    width: 59.75rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-top: 10rem;
    margin-bottom: 1.63rem;
}

#notice-modify-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
}

#notice-modify-content-box {
    margin-top: 2.56rem;
}

#notice-modify-title-input-box {
    width: 59.75rem;
    height: 5rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 1rem;
}

.notice-modify-input-label {
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

.notice-modify-input {
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

#notice-modify-content-textarea-box {
    width: 59.75rem;
    height: 18.75rem;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 2rem;
}

#notice-modify-textarea {
    width: 59.75rem;
    height: 16.8125rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    border: 1px solid var(--Text-color, #c8c8c8);
    background: var(--text-color, #fff);
    font-size: 1rem;
    box-sizing: border-box;
}

.notice-modify-content-hr {
    border: 0;
    height: 0.0625rem;
    background-color: #e7e7e7;
}

#notice-modify-file-box {
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

#notice-modify-file-label {
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

#notice-modify-file-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 0.75rem;
}

#notice-modify-btn-box {
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

#notice-modify-btn {
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
  