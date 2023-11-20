<template>
  <div>
    <div class="input-label">
      <label>{{ label }}</label>
    </div>
    <div>
      <input
        :type="type"
        class="input"
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  label: String,
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<style scoped>
.input-label {
  display: flex;
  width: 11.875rem;
  height: 2.5625rem;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1rem;
}
.input {
  width: 26.9375rem;
  height: 3.125rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1.37rem;
  border: 1px solid var(--Text-color, #c8c8c8);
  border-radius: 0.3125rem;
  background: var(--text-color, #fff);
  box-sizing: border-box;
  padding-left: 0.7rem;
}
</style>
