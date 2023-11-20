<template>
  <div id="board-list-box-container">
    <div>
      <div class="board-list-flex">
        <label id="board-list-label">커뮤니티</label>
      </div>
      <!-- 검색, 리스트 전체 -->
      <div id="board-list-box">
        <!-- 검색, 버튼 부분 -->
        <div id="board-list-setting">
          <div id="board-list-register-box">
            <button id="board-list-register-btn" @click="goToRegister">등록</button>
          </div>

          <!-- 검색 부분 -->
          <div id="board-list-search">
            <div id="board-list-sort-select-box">
              <div>
                <form>
                  <select class="board-list-select" v-model="sort" name="sort">
                    <option value="latest">최신순</option>
                    <option value="popularity">인기순</option>
                  </select>
                </form>
              </div>
            </div>
            <div id="board-list-search-select-box">
              <div>
                <form>
                  <select class="board-list-select" v-model="search" name="search">
                    <option value="none">검색</option>
                    <option value="no">글번호</option>
                    <option value="title">제목</option>
                    <option value="writer">작성자</option>
                  </select>
                </form>
              </div>
            </div>
            <div>
              <input id="board-list-search-input" />
            </div>
            <div>
              <button id="board-list-search-btn">검색</button>
            </div>
          </div>
        </div>
        <div id="board-list-table-box">
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
              <tr
                id="board-list-table-hover"
                v-for="board in boardList"
                :key="board.boardId"
                @click="goToBoardDetail(board.boardId)"
              >
                <th scope="row">{{ board.boardId }}</th>
                <td>{{ board.subject }}</td>
                <td>{{ board.userId }}</td>
                <td>{{ board.registerTime }}</td>
                <td>{{ board.hit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import axios from 'axios';
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 상세 페이지로 이동
const goToBoardDetail = (boardId) => {
  router.push({ name: "BoardDetailView", params: { boardId } });
};

//게시물 등록 페이지로 이동
const goToRegister = () => {
  router.push("/board/register");
};

// 셀렉트 박스의 선택된 값을 관리하는 반응형 데이터
const sort = ref("latest"); // '최신순'이 기본값
const search = ref("none"); // '검색'이 기본값
const boardList = ref([
  {
    boardId: 1,
    subject: "제목1",
    userId: "ssafy",
    registerTime: "2023.11.19",
    hit: 0,
  },
  {
    boardId: 2,
    subject: "제목1",
    userId: "ssafy",
    registerTime: "2023.11.19",
    hit: 0,
  },
  {
    boardId: 3,
    subject: "제목1",
    userId: "ssafy",
    registerTime: "2023.11.19",
    hit: 0,
  },
  {
    boardId: 4,
    subject: "제목1",
    userId: "ssafy",
    registerTime: "2023.11.19",
    hit: 0,
  },
  {
    boardId: 5,
    subject: "제목1",
    userId: "ssafy",
    registerTime: "2023.11.19",
    hit: 0,
  },
  {
    boardId: 6,
    subject: "제목1",
    userId: "ssafy",
    registerTime: "2023.11.19",
    hit: 0,
  },
  {
    boardId: 7,
    subject: "제목1",
    userId: "ssafy",
    registerTime: "2023.11.19",
    hit: 0,
  },
  {
    boardId: 8,
    subject: "제목1",
    userId: "ssafy",
    registerTime: "2023.11.19",
    hit: 0,
  },
  {
    boardId: 9,
    subject: "제목1",
    userId: "ssafy",
    registerTime: "2023.11.19",
    hit: 0,
  },
  {
    boardId: 10,
    subject: "제목1",
    userId: "ssafy",
    registerTime: "2023.11.19",
    hit: 0,
  },
]); // 게시물 목록을 저장할 배열

// // 백엔드에서 데이터 가져오는 함수
// const getBoardList = async () => {
//   try {
//     const response = await axios.get('백엔드_API_주소');
//     boardList.value = response.data; // 응답 데이터를 boardList에 저장
//   } catch (error) {
//     console.error('API 호출 중 오류 발생:', error);
//   }
// };

// // 컴포넌트가 마운트될 때 API 호출
// onMounted(getBoardList);
</script>

<style scoped>
.board-list-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  /* margin-top: 40rem; */
  margin-bottom: 5.5rem;
}
#board-list-label {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  /* margin-top: 11.75rem; */
}
#board-list-box {
  width: 80.4375rem;
  height: 33.375rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#board-list-setting {
  width: 80.4375rem;
  height: 2rem;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 2.12rem;
}
#board-list-register-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
#board-list-register-btn {
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
#board-list-search {
  width: 29.6875rem;
  height: 1.8rem;
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
}
.board-list-select {
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
#board-list-search-input {
  width: 13.375rem;
  height: 1.8rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  border: 0.5px solid #000;
  box-sizing: border-box;
}
#board-list-search-btn {
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
#board-list-table-box {
  width: 80.5625rem;
  height: 30.375rem;
  flex-shrink: 0;
}
#board-list-table-box table {
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

#board-list-table-hover:hover {
  background-color: rgba(0, 0, 0, 0.075);
}
</style>
