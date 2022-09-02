<script setup lang="ts">
import { defineProps, computed } from 'vue'
import Balance from '../Balance.vue'
import AddressIcon from '../AddressIcon.vue'
import Address from '../Address.vue'
const props = defineProps<{
  item: {
    address: string
    amount: string
    decimals: number
    image?: string
    name?: string
  }
}>()

const getTagName = (addr: string) => {
    const now = Date.now()
    if (now.toString().endsWith('1')) {
        return 'tag'
    } else {
        return ''
    }
}

const tagName = computed(() => {
    return getTagName(props.item.address)
})
</script>

<template>
  <div class="media">
    <div class="media-left">
      <p class="image is-48x48">
        <AddressIcon :addr="props.item.address" />
      </p>
    </div>
    <div class="media-content">
      <div>
        <strong>
          <span v-if="tagName">{{ tagName }}</span>
          <Address v-else :addr="props.item.address" />
        </strong>
      </div>
      <div>
        <Balance :amount="props.item.amount" :decimals="props.item.decimals" />
      </div>
    </div>
  </div>
</template>
