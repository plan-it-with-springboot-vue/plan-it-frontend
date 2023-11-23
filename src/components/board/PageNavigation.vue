<script setup>
import { computed } from "vue";

const props = defineProps({ currentPage: Number, totalPage: Number });
const emit = defineEmits(["pageChange"]);

const navigationSize = parseInt(10);

const startPage = computed(() => {
    return parseInt((props.currentPage - 1) / navigationSize) * navigationSize + 1;
});

const endPage = computed(() => {
    let lastPage =
        parseInt((props.currentPage - 1) / navigationSize) * navigationSize + navigationSize;
    return props.totalPage < lastPage ? props.totalPage : lastPage;
});

const endRange = computed(() => {
    return parseInt((props.totalPage - 1) / navigationSize) * navigationSize < props.currentPage;
});

function range(start, end) {
    const list = [];
    for (let i = start; i <= end; i++) list.push(i);
    return list;
    //   return Array(end - start + 1)
    //     .fill()
    //     .map((val, i) => start + i);
}

function onPageChange(pg) {
    console.log(pg + "로 이동!!!");
    emit("pageChange", pg);
}
</script>

<template>
    <div class="row">
        <ul class="pagination justify-content-center">
            <li class="page-item">
                <a class="page-link" @click="onPageChange(1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M35.4142 10.5858C36.1953 11.3668 36.1953 12.6332 35.4142 13.4142L24.8284 24L35.4142 34.5858C36.1953 35.3668 36.1953 36.6332 35.4142 37.4142C34.6332 38.1953 33.3668 38.1953 32.5858 37.4142L20.5858 25.4142C19.8047 24.6332 19.8047 23.3668 20.5858 22.5858L32.5858 10.5858C33.3668 9.80474 34.6332 9.80474 35.4142 10.5858ZM23.4142 10.5858C24.1953 11.3668 24.1953 12.6332 23.4142 13.4142L12.8284 24L23.4142 34.5858C24.1953 35.3668 24.1953 36.6332 23.4142 37.4142C22.6332 38.1953 21.3668 38.1953 20.5858 37.4142L8.58579 25.4142C8.21071 25.0391 8 24.5304 8 24C8 23.4696 8.21071 22.9609 8.58579 22.5858L20.5858 10.5858C21.3668 9.80474 22.6332 9.80474 23.4142 10.5858Z"
                            fill="#6499E9" />
                    </svg>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" @click="onPageChange(startPage == 1 ? 1 : startPage - 1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M29.4142 10.5858C30.1953 11.3668 30.1953 12.6332 29.4142 13.4142L18.8284 24L29.4142 34.5858C30.1953 35.3668 30.1953 36.6332 29.4142 37.4142C28.6332 38.1953 27.3668 38.1953 26.5858 37.4142L14.5858 25.4142C13.8047 24.6332 13.8047 23.3668 14.5858 22.5858L26.5858 10.5858C27.3668 9.80474 28.6332 9.80474 29.4142 10.5858Z"
                            fill="#6499E9" />
                    </svg>
                </a>
            </li>
            <template v-for="pg in range(startPage, endPage)" :key="pg">
                <li :class="currentPage === pg ? 'page-item active' : 'page-item'">
                    <a id="page-link" class="page-link" @click="onPageChange(pg)">{{ pg }}</a>
                </li>
            </template>
            <li class="page-item">
                <a class="page-link" @click="onPageChange(endRange ? totalPage : endPage + 1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M18.5858 37.4142C17.8047 36.6332 17.8047 35.3668 18.5858 34.5858L29.1716 24L18.5858 13.4142C17.8047 12.6332 17.8047 11.3668 18.5858 10.5858C19.3668 9.80474 20.6332 9.80474 21.4142 10.5858L33.4142 22.5858C34.1953 23.3668 34.1953 24.6332 33.4142 25.4142L21.4142 37.4142C20.6332 38.1953 19.3668 38.1953 18.5858 37.4142Z"
                            fill="#6499E9" />
                    </svg>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" @click="onPageChange(totalPage)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M24.5858 10.5858C25.3668 9.80474 26.6332 9.80474 27.4142 10.5858L39.4142 22.5858C40.1953 23.3668 40.1953 24.6332 39.4142 25.4142L27.4142 37.4142C26.6332 38.1953 25.3668 38.1953 24.5858 37.4142C23.8047 36.6332 23.8047 35.3668 24.5858 34.5858L35.1716 24L24.5858 13.4142C23.8047 12.6332 23.8047 11.3668 24.5858 10.5858ZM12.5858 10.5858C13.3668 9.80474 14.6332 9.80474 15.4142 10.5858L27.4142 22.5858C27.7893 22.9609 28 23.4696 28 24C28 24.5304 27.7893 25.0391 27.4142 25.4142L15.4142 37.4142C14.6332 38.1953 13.3668 38.1953 12.5858 37.4142C11.8047 36.6332 11.8047 35.3668 12.5858 34.5858L23.1716 24L12.5858 13.4142C11.8047 12.6332 11.8047 11.3668 12.5858 10.5858Z"
                            fill="#6499E9" />
                    </svg>
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.justify-content-center {
    width: 80.4375rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination {
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
}

.page-link {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6499E9;
    text-decoration: none;
    background-color: #fff;
    border-radius: 2rem;
    padding: 0.5rem 0.75rem;
}

.page-link:hover {
    color: #6499e9;
    background-color: #e9ecef;
    border-color: #dee2e6;
}

.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #6499E9;
    border-color: #6499E9;
}

.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    background-color: #fff;
    border-color: #dee2e6;
}

svg {
    width: 1.3rem;
    height: 1.3rem;
    flex-shrink: 0;
}
</style>
