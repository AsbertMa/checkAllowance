<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  url: string
  size?: number
}>()
</script>

<template>
  <img :width="props.size" :height="props.size" :src="props.url">
</template>
