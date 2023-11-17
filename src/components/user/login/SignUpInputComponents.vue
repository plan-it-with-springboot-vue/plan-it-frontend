<template>
    <div>
        <div class="sign-up-input-label">
            <label>{{ label }}</label>
        </div>
        <div>
            <input :type="type" 
            class="sign-up-input" 
            :value="modelValue" 
            @input="updateValue" 
            :placeholder="placeholder"/>
        </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

function updateValue(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<style scoped>
.sign-up-input {
    width: 26.9375rem;
    height: 3.125rem;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 1.37rem;
    border: 1px solid var(--Text-color, #C8C8C8);
    background: var(--text-color, #FFF);
    box-sizing: border-box;
}
.sign-up-input-label {
    display: flex;
    width: 11.875rem;
    height: 2.5625rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    font-size: 1rem;
}
</style>