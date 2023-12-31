<template>
    <div id="notice-list-box-container">
        <div>
            <div class="notice-list-flex">
                <label id="notice-list-label">공지사항</label>
            </div>
            <!-- 검색, 리스트 전체 -->
            <div id="notice-list-box">
                <!-- 검색, 버튼 부분 -->
                <div id="notice-list-setting">
                    <div id="notice-list-register-box">
                        <button v-if="userStore.userInfo?.userId === 'admin'" id="notice-list-register-btn"
                            @click="goToRegister">등록</button>
                    </div>

                    <!-- 검색 부분 -->
                    <div id="notice-list-search">
                        <div id="notice-list-search-select-box">
                            <div>
                                <form>
                                    <select class="notice-list-select" v-model="search" name="search">
                                        <option value="none">검색</option>
                                        <option value="no">글번호</option>
                                        <option value="title">제목</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div>
                            <input id="notice-list-search-input" />
                        </div>
                        <div>
                            <button id="notice-list-search-btn">검색</button>
                        </div>
                    </div>
                </div>
                <div id="notice-list-table-box">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">제목</th>
                                <th scope="col">작성자</th>
                                <th scope="col">작성일</th>
                                <th scope="col">조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr id="notice-list-table-hover" v-for="notice in noticeList" :key="notice.noticeId"
                                @click="goToNoticeDetail(notice.noticeId)">
                                <th scope="row">{{ notice.noticeId }}</th>
                                <td>{{ notice.subject }}</td>
                                <td>{{ notice.userId }}</td>
                                <td>{{ formatDate(notice.registerTime) }}</td>
                                <td>{{ notice.hit }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>c
  
<script setup>
import axios from 'axios';
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();
const router = useRouter();

// 사용자 정보를 확인하고 업데이트하는 함수
const updateUserInfo = async () => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
        try {
            await userStore.getUserInfo(token);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }
};

// 상세 페이지로 이동
const goToNoticeDetail = (noticeId) => {
    router.push({ name: "NoticeDetailView", params: { noticeId } });
};

const goToRegister = () => {
    // 사용자 정보가 로드될 때까지 기다리고, 존재하는 경우에만 접근
    if (userStore.userInfo && userStore.userInfo?.userId === 'admin') {
        router.push("/notice/register");
    }
};

// 셀렉트 박스의 선택된 값을 관리하는 반응형 데이터
const search = ref("none"); // '검색'이 기본값
const noticeList = ref([]); // 게시물 목록을 저장할 배열

//날짜 형식 변환
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

//공지사항 전체 목록
const getNoticeList = () => {
    axios
        .get(`http://localhost/notice/list`, {
        })
        .then((response) => {
            console.log(response.data);
            noticeList.value = response.data;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
};

onMounted(async () => {
    await updateUserInfo();
    getNoticeList();
});

</script>
  
<style scoped>
.notice-list-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 5.5rem;
}

#notice-list-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
}

#notice-list-box {
    width: 80.4375rem;
    height: 33.375rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#notice-list-setting {
    width: 80.4375rem;
    height: 2rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-bottom: 2.12rem;
}

#notice-list-register-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

#notice-list-register-btn {
    width: 4.75rem;
    height: 1.8rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.3125rem;
    background: var(--main, #6499e9);
    border: none;
    color: white;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
}

#notice-list-search {
    width: 24.25rem;
    height: 1.8rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
}

.notice-list-select {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5.125rem;
    height: 1.8rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    border: 0.5px solid #000;
    font-size: 0.75rem;
    font-weight: 500;
}

#notice-list-search-input {
    width: 13.375rem;
    height: 1.8rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    border: 0.5px solid #000;
    box-sizing: border-box;
}

#notice-list-search-btn {
    width: 4.75rem;
    height: 1.8rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    background: var(--main, #6499e9);
    border: none;
    color: white;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
}

#notice-list-table-box {
    width: 80.5625rem;
    height: 30.375rem;
    flex-shrink: 0;
}

#notice-list-table-box table {
    width: 100%;
    text-align: center;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 8px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

#notice-list-table-hover:hover {
    background-color: rgba(0, 0, 0, 0.075);
}
</style>
  