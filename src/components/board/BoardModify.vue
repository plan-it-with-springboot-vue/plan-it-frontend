<template>
    <div id="board-modify-box-container">
        <div>
            <div class="board-modify-flex">
                <label id="board-modify-label">게시글 수정</label>
            </div>
            <hr />
        </div>
        <div id="board-modify-content-box">
            <div id="board-modify-title-input-box">
                <label class="board-modify-input-label">제목</label>
                <input class="board-modify-input" v-model="subject" />
            </div>
            <hr class="board-modify-content-hr" />
            <div id="board-modify-content-textarea-box">
                <label class="board-modify-input-label">내용</label>
                <textarea id="board-modify-textarea" v-model="content"></textarea>
            </div>
            <hr class="board-modify-content-hr" />
            <div id="board-modify-file-box">
                <label id="board-modify-file-label">파일첨부</label>
                <button id="board-modify-file-btn">파일 선택</button>
            </div>
            <hr class="board-modify-content-hr" />
        </div>
        <div id="board-modify-btn-box">
            <button id="board-cancel-btn" @click="goToBoardList">취소</button>
            <button id="board-modify-btn" @click="modifyPost">수정</button>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const boardId = route.params.boardId; // URL에서 boardId 가져오기
const subject = ref('');
const content = ref('');
const board = ref({});

// 게시글 수정
const modifyPost = () => {
    const postData = {
        boardId: boardId,
        subject: subject.value,
        content: content.value
    };

    if (confirm("게시글을 수정하시겠습니까?")) {
        axios
            .post(`http://localhost/board/modify`, postData)
            .then((response) => {
                // 게시글 수정 후 게시판 목록으로 이동
                router.push('/board');
            })
            .catch((error) => {
                console.error("Error posting data:", error);
            });
    }
};

// 게시글 목록 페이지 경로로 이동
const goToBoardList = () => {
    if (confirm("게시글 작성을 취소하시겠습니까?")) {
        router.push('/board');
    }
};

//게시판 상세 조회
const getBoard = () => {
    axios
        .get(`http://localhost/board/view?boardId=${boardId}`, {
        })
        .then((response) => {
            board.value = response.data;
            subject.value = board.value.subject;
            content.value = board.value.content;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
};

onMounted(getBoard);
</script>
  
<style scoped>
#board-modify-box-container {
    width: 59.75rem;
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-bottom: 0;
}

.board-modify-flex {
    width: 59.75rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-top: 10rem;
    margin-bottom: 1.63rem;
}

#board-modify-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
}

#board-modify-content-box {
    margin-top: 2.56rem;
}

#board-modify-title-input-box {
    width: 59.75rem;
    height: 5rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 1rem;
}

.board-modify-input-label {
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

.board-modify-input {
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

#board-modify-content-textarea-box {
    width: 59.75rem;
    height: 18.75rem;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 2rem;
}

#board-modify-textarea {
    width: 59.75rem;
    height: 16.8125rem;
    flex-shrink: 0;
    border-radius: 0.3125rem;
    border: 1px solid var(--Text-color, #c8c8c8);
    background: var(--text-color, #fff);
    font-size: 1rem;
    box-sizing: border-box;
}

.board-modify-content-hr {
    border: 0;
    height: 0.0625rem;
    background-color: #e7e7e7;
}

#board-modify-file-box {
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

#board-modify-file-label {
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

#board-modify-file-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 0.75rem;
}

#board-modify-btn-box {
    width: 59.75rem;
    height: 2.0625rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
}

#board-cancel-btn {
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

#board-modify-btn {
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
  