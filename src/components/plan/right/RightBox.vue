<template>
  <div id="right-box-container">
    <CalenderDuration />
    <AttractionPlanBoxVue />
  </div>
</template>

<script setup>
import AttractionPlanBoxVue from "./AttractionPlanBox.vue";
import CalenderDuration from "./CalenderDuration.vue";
</script>

<style scoped>
#right-box-container {
  display: flex;
  flex-direction: column;
  width: 21.75rem;
  height: 40.4375rem;
}
</style>
