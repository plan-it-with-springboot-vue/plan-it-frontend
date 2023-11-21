<template>
  <div id="board-datail-box-container">
    <div id="board-detail-content-box">
      <div>
        <div class="board-detail-flex">
          <label id="board-detail-label">{{ boardDetail.subject }}</label>
        </div>
        <div class="board-detail-etc-box">
          <div class="board-detail-etc-box" id="left">
            <p>{{ boardDetail.userId }}</p>
            <p id="board-detail-etc-time">{{ formatDateTime(boardDetail.registerTime) }}</p>
          </div>
          <div class="board-detail-etc-box" id="right">
            <p id="p-right">조회</p>
            <p id="p-right-num">{{ boardDetail.hit }}</p>
          </div>
        </div>
      </div>
      <div id="board-detail-content-box">
        <hr />
        <p id="board-detail-content" v-html="boardDetail.content"></p>
        <hr />
      </div>
      <div id="board-detail-btn-box">
        <div id="board-detail-select-box">
          <button v-if="isUserAuthor" id="board-detail-modify-btn" @click="modifyBoard">수정</button>
          <button v-if="isUserAuthor" id="board-detail-delete-btn" @click="deleteBoard">삭제</button>
        </div>
        <div id="board-detail-list-btn-box">
          <button id="board-detail-btn" @click="goToBoardList">목록</button>
        </div>
      </div>
    </div>
    <div id="board-detail-comment-box-container">
      <div id="board-detail-comment-input-box">
        <label id="board-detail-comment-input-label">댓글</label>
        <textarea id="board-detail-comment-textarea"></textarea>
        <div id="board-detail-comment-input-box-btn">
          <button id="board-detail-comment-input-btn">등록</button>
        </div>
      </div>
      <div id="board-detail-comment-content-box">
        <hr class="board-detail-comment-hr" />
        <div id="board-detail-comment-box" v-for="comment in comments" :key="comment.boardCommentId">
          <div id="board-detail-comment-header-box">
            <div id="board-detail-comment-header-left">
              <img id="board-detail-comment-img" src="@/assets/image/profile.png" alt="profile" />
              <div id="board-detail-comment-header-left-text">
                <p id="board-detail-comment-header-left-text-id">{{ comment.userId }}</p>
                <p id="board-detail-comment-header-left-text-date">{{ comment.registerTime }}</p>
              </div>
            </div>
            <div>
              <svg id="board-detail-comment-header-setting" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                <path
                  d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path
                  d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
            </div>
          </div>
          <div id="board-detail-comment-div">
            <p id="board-detail-comment">{{ comment.content }}</p>
          </div>
          <div>
            <hr class="board-detail-comment-hr" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const loggedInUserId = ref("ssafy"); //현재 로그인 한 유저 정보
const boardDetailLoaded = ref(false); // 데이터 로드 상태
const boardId = route.params.boardId; // URL에서 boardId 가져오기
const boardDetail = ref({});
const comments = ref([
  {
    boardCommentId: 1,
    boardId: 1,
    userId: "ssafy",
    registerTime: "2023.11.20",
    content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)",
  },
  {
    boardCommentId: 1,
    boardId: 1,
    userId: "ssafy",
    registerTime: "2023.11.20",
    content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)",
  },
  {
    boardCommentId: 1,
    boardId: 1,
    userId: "ssafy",
    registerTime: "2023.11.20",
    content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)",
  },
  {
    boardCommentId: 1,
    boardId: 1,
    userId: "ssafy",
    registerTime: "2023.11.20",
    content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)",
  },
  {
    boardCommentId: 1,
    boardId: 1,
    userId: "ssafy",
    registerTime: "2023.11.20",
    content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)",
  },
  {
    boardCommentId: 1,
    boardId: 1,
    userId: "ssafy",
    registerTime: "2023.11.20",
    content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)",
  },
  {
    boardCommentId: 1,
    boardId: 1,
    userId: "ssafy",
    registerTime: "2023.11.20",
    content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)",
  },
]);

const goToBoardList = () => {
  router.push('/board');
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

//게시글 삭제
const deleteBoard = () => {
  axios
    .get(`http://localhost/board/delete=${boardId}`, {
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

//게시판 상세보기
const getBoardDetail = () => {
  axios
    .get(`http://localhost/board/view?articleNo=${boardId}`, {
    })
    .then((response) => {
      boardDetail.value = response.data;
      boardDetailLoaded.value = true; // 데이터 로딩 완료

      console.log(boardDetailLoaded.value);
      console.log("Board Detail:", boardDetail.value.userId);
      console.log("Logged In User ID:", loggedInUserId.value);
      console.log("Types:", typeof boardDetail.value.userId, typeof loggedInUserId.value);
      console.log(isUserAuthor);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const isUserAuthor = computed(() => {
  return boardDetail.userId === loggedInUserId.value && boardDetailLoaded;
});

onMounted(getBoardDetail); // 컴포넌트가 마운트될 때 API 호출

// const getComments = async () => {
//   try {
//     const response = await axios.get(`https://example.com/api/boards/${boardId}/comments`);
//     comments.value = response.data; // API에서 가져온 댓글 데이터 저장
//   } catch (error) {
//     console.error('댓글 API 호출 중 오류 발생:', error);
//   }
// };

// onMounted(async () => {
//   await getComments();
// });
</script>

<style scoped>
#board-datail-box-container {
  width: 59.75rem;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-bottom: 0;
}

.board-detail-flex {
  width: 59.75rem;
  height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  margin-top: 10rem;
  margin-bottom: 0.2rem;
}

#board-detail-label {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  /* margin-top: 11.75rem; */
}

.board-detail-etc-box {
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

#board-detail-content {
  padding: 5rem 0rem 5rem 0rem;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
}
#board-detail-modify-btn{
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
#board-detail-delete-btn {
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
#board-detail-list-btn-box {
  width: 5.625rem;
  height: 2.0625rem;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: row;
}

#board-detail-btn-box {
  width: 59.75rem;
  height: 3.875rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 1rem;
}
#board-detail-select-box {
  width: 11.9375rem;
height: 2.0625rem;
flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
}
#board-detail-btn {
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

#board-detail-comment-input-box {
  width: 59.75rem;
  height: 15.6875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
}

#board-detail-comment-input-label {
  width: 59.75rem;
  height: 2.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  color: #000;
  font-family: Noto Sans;
  font-size: 1.5625rem;
  font-weight: 600;
}

#board-detail-comment-textarea {
  width: 59.625rem;
  height: 7.75rem;
  flex-shrink: 0;
  border-radius: 0.125rem;
  border: 1px solid var(--gray, #8c8c8c);
  background: #fff;
}

#board-detail-comment-input-box-btn {
  width: 59.625rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#board-detail-comment-input-btn {
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
}

.board-detail-comment-hr {
  border: 0;
  height: 0.0625rem;
  background-color: #e7e7e7;
  /* 선의 색상 */
}

#board-detail-comment-box {
  height: 8.8125rem;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  flex-direction: column;
  margin-bottom: 1rem;
}

#board-detail-comment-header-box {
  width: 59.625rem;
  height: 3.75rem;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

#board-detail-comment-header-setting {
  cursor: pointer;
}

#board-detail-comment-header-left {
  width: 8.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
}

#board-detail-comment-header-left-text {
  width: 5.25rem;
  height: 2.75rem;
  flex-shrink: 0;
  flex-direction: column;
}

#board-detail-comment-header-left-text p {
  height: 1.375rem;
  margin: 0;
}

#board-detail-comment-header-left-text-id {
  display: flex;
  width: 6.625rem;
  height: 1.375rem;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000;
  font-family: Noto Sans;
  font-size: 1rem;
  font-weight: 500;
  line-height: normal;
}

#board-detail-comment-header-left-text-date {
  display: flex;
  width: 6.625rem;
  height: 1.375rem;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: var(--gray, #8c8c8c);
  font-family: Noto Sans;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: normal;
}

#board-detail-comment-img {
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
}

#board-detail-comment-div {
  width: 59.625rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#board-detail-comment {
  width: 59.625rem;
  height: 2.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-shrink: 0;
  color: #000;
  font-family: Noto Sans;
  font-size: 0.85rem;
  font-weight: 400;
  line-height: normal;
  margin-left: 0.5rem;
}

#board-detail-comment-content-box {
  margin-bottom: 10rem;
}

#board-detail-etc-time {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 400;
  margin-left: 0.5rem;
  white-space: nowrap;
}
</style>
