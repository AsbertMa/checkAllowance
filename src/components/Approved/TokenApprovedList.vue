<script setup lang="ts">
import { Token, InjectBest } from '@/types'
import BigNumber from 'bignumber.js'
import { defineProps, inject, onBeforeMount, ref, watch } from 'vue'
import { fetchApproval, getAllowanceList, resetApproval } from '../../svc'
import ApprovedItem from './ApprovedItem.vue'
const props = defineProps<{
  token: Token
  wallet: string
}>()

const best = inject('best') as InjectBest
const approvedAddrList = ref<string[]>([])
const approvedAmounts = ref<Record<string, string>>({})
const waiting = ref<boolean>(true)

const checkApprovedAddress = async () => {
    let addressList: string[] = []
    const arrUniq = (arr: string[]) => {
        const temp: Record<string, string> = {}
        arr.forEach(a => {
            temp[a] = a
        })

        return Object.keys(temp)
    }

    for (let page = 1; page < 10; page++) {
        const list = await fetchApproval(props.token.address, props.wallet, page)
        const length = list.length
        const tempList = arrUniq(list)
        addressList = [...addressList, ...tempList]
        if (length < 100) {
            break
        }
    }

    return addressList
}

const getList = async () => {
    const addrList = await checkApprovedAddress()
    const temp = await getAllowanceList(props.token.address, props.wallet, addrList)

    approvedAddrList.value = addrList
    temp.map((t, i) => {
        const _key = addrList[i]
        approvedAmounts.value[_key] = t.data
    })
}

const cancel = async (addr: string) => {
    await resetApproval(props.token.address, props.wallet, [addr])
}

const isZero = (amount: string) => {
    return new BigNumber(amount).isZero()
}

onBeforeMount(async () => {
    if (props.token && props.wallet) {
        await getList()
    }
    waiting.value = false
})

watch(() => props.token.address + props.wallet, async () => {
    await getList()
})

watch(best, async () => {
    await getList()
})

</script>
<template>
  <div>
    <div v-if="waiting" class="has-text-centered mt-4">
      <span class="icon has-text-grey-light">
        <i class="fas fa-spinner fa-pulse is-size-1" />
      </span>
      <p class="has-text-grey-light">
        <strong>
          Loading
        </strong>
      </p>
    </div>
    <template v-else>
      <template v-if="approvedAddrList && approvedAddrList.length">
        <div class="level" v-for="item in approvedAddrList" :key="item">
          <div class="level-left">
            <ApprovedItem :item="{
              address: item,
              amount: approvedAmounts[item],
              decimals: props.token.decimals
            }" />
          </div>
          <div class="level-right">
            <button v-if="!isZero(approvedAmounts[item])" type="button" class="button is-danger is-small is-outlined"
              @click="cancel(item)">
              Decline
            </button>
          </div>
        </div>
      </template>
      <div v-else class="has-text-centered mt-4">
        <span class="icon has-text-grey-light">
          <i class="far fa-clipboard is-size-1"></i>
        </span>
        <p><strong class="has-text-grey-light">No records</strong></p>
      </div>
    </template>
  </div>
</template>
