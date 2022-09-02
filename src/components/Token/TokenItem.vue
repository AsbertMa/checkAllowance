<script setup lang="ts">
import { Token } from '@/types'
import { defineProps } from 'vue'
import Balance from '../Balance.vue'
import TokenIcon from './TokenIcon.vue'
const props = defineProps<{
  token: Token
}>()
</script>

<template>
  <div class="media">
    <div class="media-left">
      <p class="image is-48x48">
        <TokenIcon :url="props.token.icon!" />
      </p>
    </div>
    <div class="media-content">
      <div>
        <strong>
          {{ props.token.symbol }}
        </strong>
      </div>
      <div>
        <Balance :amount="props.token.balance" :decimals="props.token.decimals" />
      </div>
    </div>
  </div>
</template>
