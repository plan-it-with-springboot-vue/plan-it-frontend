<template>
    <div id="plan-list-box-container">
        <div>
            <div class="plan-list-flex">
                <label id="plan-list-label">여행 일정 관리</label>
            </div>
            <hr />
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.plan-list-flex {
    width: 58.375rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-top: 10rem;
    margin-bottom: 1.63rem;
}

#plan-list-label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
}

hr {
    border: 0;
    height: 0.0625rem;
    background-color: #000000;
    /* 선의 색상 */
}
</style>