<template>
    <div id="board-datail-box-container">
        <div id="board-detail-content-box">
            <div>
                <div class="board-detail-flex">
                    <label id="board-detail-label">{{boardDetail.subject}}</label>
                </div>
                <div class="board-detail-etc-box">
                    <div class="board-detail-etc-box" id="left">
                        <p>{{ boardDetail.userId }}</p>
                        <p>{{ boardDetail.registerTime }}</p>
                    </div>
                    <div class="board-detail-etc-box" id="right">
                        <p id="p-right">조회</p>
                        <p id="p-right-num">{{ boardDetail.hit }}</p>
                    </div>
                </div>
            </div>
            <div id="board-detail-content-box">
                <hr>
                <p id="board-detail-content" v-html="boardDetail.content"></p>
                <hr>
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
                <hr class="board-detail-comment-hr">
                <div id="board-detail-comment-box" v-for="comment in comments" :key="comment.boardCommentId">
                    <div id="board-detail-comment-header-box">
                        <div id="board-detail-comment-header-left">
                            <img id="board-detail-comment-img" src="@/assets/image/profile.png" alt="profile">
                            <div id="board-detail-comment-header-left-text">
                                <p id="board-detail-comment-header-left-text-id">{{comment.userId}}</p>
                                <p id="board-detail-comment-header-left-text-date">{{comment.registerTime}}</p>
                            </div>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <p id="board-detail-comment">{{ comment.content }}</p>
                    </div>
                    <div>
                        <hr class="board-detail-comment-hr">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
// import axios from 'axios';

const route = useRoute();
const boardId = route.params.boardId; // URL에서 boardId 가져오기
const boardDetail = ref(
    {
        subject: "핫플레이스 공유합니다!",
        content: "새해 첫 날 떠오르는 해를 바라보며 한 해의 안녕을 기원하기 위해 많은 분들이 해돋이 명소를 찾곤 합니다.<br />특히 올해는 코로나19로 인해 제한이 있던 많은 해돋이 명소에서 다양한 행사가 재개된다고 하고, 주말 연휴라 많은 분들이 일출 여행이나 드라이브를 계획할 것 같은데요.<br />오늘은 한 해를 마무리하며 아쉬움을 털어내고 떠오르는 해와 함께 새해 첫 출발을 활기차게 시작하는 특별한 순간에 도움될 정보를 안내 드리고자 합니다.<br />일출로 유명한 명소와 겨울철 해돋이 여행 시 필요한 준비사항 등을 알아볼까요?<br />해돋이 준비사항(출처: 한국관광공사)<br />우선, 12월의 마지막 날에는 해돋이를 보려는 사람들로 많은 인파가 모이게 됩니다.<br />따라서 여유롭게 출발해 일출 장소에 먼저 도착하는 것이 좋은데요.날씨가 추우니 일출 장소와 가까운 곳에 숙소를 잡는 것도 도움이 됩니다.<br />각 명소에서는 신년 해맞이 행사를 하곤 하는데요.<br />올해 많은 명소가 3년여 만에 행사를 재개하고 있으나 사전에 방문 가능 여부와 운영 시간 등을 확인하는 것이 정확하겠죠.<br />또한, 겨울철 한파가 기승을 부리는 추운 야외에서 장시간 일출을 기다려야 하니, 보온이 잘 되는 옷차림을 준비해 주셔야 하는데요.<br />목도리와 장갑, 두꺼운 패딩은 필수입니다. 핫팩 등 방한 용품도 미리 준비해 저체온증이나 동상 등 추위로 인한 증상을 미리 대처해야 하겠죠.<br />만약, 산에 올라 해돋이를 보실 예정이라면, 손전등이나 아이젠, 따뜻한 음료 등을 준비해 겨울철 야간 산행에 몸이 다치지 않도록 안전에 유의해 주세요.<br />눈으로도 보고 사진으로도 저장하고 싶다면, 보조배터리나 삼각대를 가져가는 것도 좋습니다.<br />여기서 한 가지 꿀팁! 해돋이 구경을 모두 마치셨다면, 아침 식사를 해야겠죠?<br />주변에 식사가 되는 곳을 미리 알아보시고, 예약이 가능하다면 예약을 해두시는 것이 좋습니다.<br />제주도의 해돋이 명소 성산일출봉(출처: 한국관광공사)<br />제주도 성산일출",
        hit: "119",
        registerTime: "2023.11.19",
        userId: "ssafy"
    }
);
const comments = ref([
    {
        boardCommentId: 1,
        boardId: 1,
        userId: "ssafy",
        registerTime: "2023.11.20",
        content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)"
    },
    {
        boardCommentId: 1,
        boardId: 1,
        userId: "ssafy",
        registerTime: "2023.11.20",
        content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)"
    },
    {
        boardCommentId: 1,
        boardId: 1,
        userId: "ssafy",
        registerTime: "2023.11.20",
        content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)"
    },
    {
        boardCommentId: 1,
        boardId: 1,
        userId: "ssafy",
        registerTime: "2023.11.20",
        content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)"
    },
    {
        boardCommentId: 1,
        boardId: 1,
        userId: "ssafy",
        registerTime: "2023.11.20",
        content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)"
    },
    {
        boardCommentId: 1,
        boardId: 1,
        userId: "ssafy",
        registerTime: "2023.11.20",
        content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)"
    },
    {
        boardCommentId: 1,
        boardId: 1,
        userId: "ssafy",
        registerTime: "2023.11.20",
        content: "정말 좋은 정보네요! 감사합니다. 잘 읽고 가요~ :)"
    },
]);

// const getBoardDetail = async () => {
//   try {
//     const response = await axios.get(`https://example.com/api/boards/${boardId}`);
//     boardDetail.value = response.data; // 백엔드로부터 받은 데이터를 boardDetail에 저장
//   } catch (error) {
//     console.error('API 호출 중 오류 발생:', error);
//   }
// };

// onMounted(getBoardDetail); // 컴포넌트가 마운트될 때 API 호출

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
    /* width: 59.75rem;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; */
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
    color: var(--gray, #8C8C8C);
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
    color: var(--red, #FF3F3F);
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
    border: 1px solid var(--gray, #8C8C8C);
    background: #FFF;
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
    background: var(--main, #6499E9);
    border: none;
    color: #FFF;
    text-align: center;
    font-family: Noto Sans;
    font-size: 0.75rem;
    font-weight:600;
    cursor: pointer;
}
.board-detail-comment-hr {
    border: 0;
    height: 0.0625rem;
    background-color: #E7E7E7; /* 선의 색상 */
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
    height: 4.75rem;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
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
    color: var(--gray, #8C8C8C);
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
#board-detail-comment {
    width: 32.1875rem;
    height: 2.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
</style>