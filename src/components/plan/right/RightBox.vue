<template>
  <div id="right-box-container">
    <h3>Day1</h3>
    <p>2023.11.11~2023.11.16</p>
    <div><p id="calender">달력</p></div>
    <AttractionPlanBoxVue />
  </div>
</template>

<script setup>
import AttractionPlanBoxVue from "./AttractionPlanBox.vue";
</script>

<style scoped>
p {
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
}
h3 {
  text-align: center;
  font-size: 1.25rem;
  color: #6499e9;
  margin: 0.5rem 0rem;
  padding: 0;
}
#right-box-container {
  display: flex;
  flex-direction: column;
  width: 21.75rem;
  height: 40.4375rem;
}
#menu-btn-container {
  display: flex;
  justify-content: space-between;
}
#calender {
  width: 15.75rem;
  height: 10.75rem;
  background-color: #6499e9;
}
</style>
