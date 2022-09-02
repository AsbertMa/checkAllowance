<script setup lang="ts">
import { defineProps, computed } from 'vue'
import picasso from '@vechain/picasso'
const props = defineProps<{ addr: string }>()

const bkStyle = computed(() => {
    const svg = picasso(props.addr)
    return {
        background: `url('data:image/svg+xml;utf8,${svg}')`,
        width: '40px',
        height: '40px',
        backgroundSize: 'contain',
        borderRadius: '4px'
    }
})

</script>
<template>
  <div :style="bkStyle"></div>
</template>
