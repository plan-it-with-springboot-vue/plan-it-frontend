<template>
    <div v-if="show" class="modal-overlay" @click="onClose">
        <div class="modal-content" @click.stop>
            <div id="modal-content-container">
                <div id="modal-img-box">
                    <img :src="selectedWish.firstImage">
                </div>
                <div id="modal-content-box">
                    <div id="modal-content-box-inner">
                        <div id="modal-content-title-box">
                            <p id="modal-content-title">{{ selectedWish.title }}</p>
                        </div>
                        <div id="modal-content-addr-box">
                            <p id="modal-content-addr">{{ selectedWish.addr1 }}</p>
                        </div>
                        <div id="modal-content-description-box">
                            <p id="modal-content-description">{{ selectedWishDescription.overview }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    show: Boolean,
    onClose: Function,
    selectedWish: Object,
    selectedWishDescription: Object
});
</script>
  
<style scoped>
.modal-content {
    width: 37.0625rem;
    height: 33.4375rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border-radius: 1.25rem;
    background: #FFF;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.15);
}

#modal-img-box {
    width: 37.0625rem;
    height: 14.4375rem;
    display: flex;
}

#modal-img-box img {
    width: 37.0625rem;
    height: 14.4375rem;
    flex-shrink: 0;
    border-radius: 1.25rem 1.25rem 0rem 0rem;
    background: url(<path-to-image>), lightgray 50% / cover no-repeat;
}

#modal-content-box {
    width: 37.0625rem;
    height: 19rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#modal-content-box-inner {
    width: 31.125rem;
    height: 15.625rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#modal-content-title-box {
    width: 31.125rem;
    height: 2.0625rem;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#modal-content-title {
    color: #000;
    font-size: 1.5625rem;
    font-weight: 600;
}

#modal-content-addr-box {
    width: 31.125rem;
    height: 2.1875rem;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
}

#modal-content-addr {
    color: #000;
    font-size: 0.9375rem;
    font-weight: 500;

}

#modal-content-description-box {
    width: 31rem;
    height: 10.4375rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤바 추가 */
    max-height: 15rem; /* 최대 높이 설정 (필요에 따라 조정 가능) */
    padding: 0.5rem;
}

#modal-content-description {
    color: #000;
    font-size: 0.9375rem;
    font-weight: 400;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}</style>
  