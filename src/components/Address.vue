<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { defineProps } from 'vue'
const props = defineProps<{
  addr: string
}>()

const address = computed(() => {
    const v = props.addr
    const temp = v.startsWith('0x') ? v : `0x${v}`
    return temp.substring(0, 8) + '…' + temp.substring(temp.length - 8, temp.length)
})
</script>
<template>
  <span class="is-family-monospace">
    {{ address }}
  </span>
</template>
