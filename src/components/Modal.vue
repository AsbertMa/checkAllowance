<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps<{ show: boolean }>()
const emits = defineEmits<{(event: 'update:show', b: boolean): void }>()
</script>

<template>
  <div ref="modal" class="modal" :class="{ 'is-active': props.show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button class="delete" @click="emits('update:show', false)" aria-label="close" />
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
    </div>
  </div>
</template>
