<template>
  <h3>Day1</h3>
  <p>2023.11.11~2023.11.16</p>
  <div><div id="calender"></div></div>
</template>

<script setup>
import { defineRefs } from "../../../utils/helper";
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
#calender {
  width: 15.75rem;
  height: 10.75rem;
  background-color: #6499e9;
}
</style>
