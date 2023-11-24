<template>
  <TheHeader />
  <TheMainVue />
  <TheFooterVue />
</template>

<script setup>
import TheFooterVue from "../components/layout/TheFooter.vue";
import TheHeader from "../components/layout/TheHeader.vue";
import TheMainVue from "../components/main/TheMain.vue";
</script>

<style scoped>
div {
  font-size: 40px;
}
</style>
