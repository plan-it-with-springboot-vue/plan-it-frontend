<template>
    <div id="notice-datail-box-container">
        <div id="notice-detail-content-box">
            <div>
                <div class="notice-detail-flex">
                    <label id="notice-detail-label">{{ noticeDetail.subject }}</label>
                </div>
                <div class="notice-detail-etc-box">
                    <div class="notice-detail-etc-box" id="left">
                        <p>{{ noticeDetail.userId }}</p>
                        <p id="notice-detail-etc-time">{{ formatDateTime(noticeDetail.registerTime) }}</p>
                    </div>
                    <div class="notice-detail-etc-box" id="right">
                        <p id="p-right">조회</p>
                        <p id="p-right-num">{{ noticeDetail.hit }}</p>
                    </div>
                </div>
            </div>
            <div id="notice-detail-content-box">
                <hr />
                <p id="notice-detail-content" v-html="noticeDetail.content"></p>
                <hr />
            </div>
            <div id="notice-detail-btn-box">
                <div id="notice-detail-select-box">
                    <button v-if="userStore.userInfo.userId === 'admin'" id="notice-detail-modify-btn"
                        @click="modifyNotice(noticeDetail.noticeId)">수정</button>
                    <button v-if="userStore.userInfo.userId === 'admin'" id="notice-detail-delete-btn"
                        @click="deleteNotice">삭제</button>
                </div>
                <div id="notice-detail-list-btn-box">
                    <button id="notice-detail-btn" @click="goToNoticeList">목록</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();

const route = useRoute();
const router = useRouter();
const noticeId = route.params.noticeId; // URL에서 noticeId 가져오기
const noticeDetail = ref({});

//목록 이동
const goToNoticeList = () => {
    router.push('/notice');
}

//날짜 형식 변환
const formatDateTime = (dateString) => {
    if (!dateString || isNaN(Date.parse(dateString))) {
        return '';
    }
    const date = new Date(dateString);
    const options = {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Seoul'
    };
    let formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(date);
    // "YYYY.MM.DD. HH:mm:ss" 형식으로 변환
    formattedDate = formattedDate.replace(/\.\s/g, '.');
    return formattedDate;
};

//공지사항 수정
const modifyNotice = (noticeId) => {
    router.push({ name: "NoticeModifyView", params: { noticeId } });
}

//공지사항 삭제
const deleteNotice = () => {
    if (confirm("게시글을 삭제하시겠습니까?")) {
        axios
            .get(`http://localhost/notice/delete?noticeId=${noticeId}`, {
            })
            .then((response) => {
                console.log(response.data);
                router.push('/notice');
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
};

//공지사항 상세보기
const getNoticeDetail = () => {
    axios
        .get(`http://localhost/notice/view?noticeId=${noticeId}`, {
        })
        .then((response) => {
            noticeDetail.value = response.data;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
};

onMounted(getNoticeDetail); // 컴포넌트가 마운트될 때 API 호출
</script>
  
<style scoped>
#notice-datail-box-container {
    width: 59.75rem;
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-bottom: 0;
}

.notice-detail-flex {
    width: 59.75rem;
    height: 3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-shrink: 0;
    margin-top: 10rem;
    margin-bottom: 0.2rem;
}

#notice-detail-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
    /* margin-top: 11.75rem; */
}

.notice-detail-etc-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}

#left {
    width: 7.5rem;
    height: 1.7rem;
    flex-shrink: 0;
}

#right {
    width: 4rem;
    height: 1.7rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

p {
    color: var(--gray, #8c8c8c);
    font-family: Noto Sans;
    font-size: 1rem;
    font-weight: 500;
}

#p-right {
    color: black;
    font-family: Noto Sans;
    font-size: 1rem;
    font-weight: 500;
}

#p-right-num {
    color: var(--red, #ff3f3f);
    font-family: Noto Sans;
    font-size: 1rem;
    font-weight: 500;
}

#notice-detail-content {
    padding: 5rem 0rem 5rem 0rem;
    color: #000;
    font-size: 1rem;
    font-weight: 500;
}

#notice-detail-modify-btn {
    width: 4.75rem;
    height: 1.8rem;
    flex-shrink: 0;
    border-radius: 0.125rem;
    background: var(--main, #6499e9);
    border: none;
    color: #fff;
    text-align: center;
    font-family: Noto Sans;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    margin-right: 0.5rem;
}

#notice-detail-delete-btn {
    width: 4.75rem;
    height: 1.8rem;
    flex-shrink: 0;
    border-radius: 0.125rem;
    background: var(--main, #FF3F3F);
    border: none;
    color: #fff;
    text-align: center;
    font-family: Noto Sans;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
}

#notice-detail-list-btn-box {
    width: 5.625rem;
    height: 2.0625rem;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex-direction: row;
}

#notice-detail-btn-box {
    width: 59.75rem;
    height: 3.875rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    margin-top: 1rem;
}

#notice-detail-select-box {
    width: 9.9375rem;
    height: 2.0625rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
}

#notice-detail-btn {
    width: 4.75rem;
    height: 1.8rem;
    flex-shrink: 0;
    border-radius: 0.125rem;
    background: var(--main, #C8C8C8);
    border: none;
    color: #fff;
    text-align: center;
    font-family: Noto Sans;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
}

#notice-detail-etc-time {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 400;
    margin-left: 0.5rem;
    white-space: nowrap;
}
</style>
  