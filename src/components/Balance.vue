<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BigNumber from 'bignumber.js'
const props = defineProps<{
  amount: string
  decimals: number
}>()

const format = computed(() => {
    const temp = new BigNumber(props.amount)
    return temp.isGreaterThan(0)
        ? temp.div(new BigNumber('1e+' + (props.decimals || 18))).toFormat(2, 4)
        : '0.00'
})
</script>
<template>
  <span>{{ format }}</span>
</template>
