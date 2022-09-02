<template>
    <div class="container">
        <Navbar class="is-spaced" />
        <div class="card" style="max-width: 600px;margin: auto;">
            <header class="card-header">
                <p class="card-header-title title is-4">
                    {{  title  }}
                </p>
            </header>
            <div class="card-content">
                <template v-if="hash === 'tokens'">
                    <TokenItem @click="onTokenClick(token)" v-for="token in tokens" :token="token"
                        :key="token.address" />
                </template>
                <TokenApprovedList v-else-if="selectedToken && hash === 'approval'" :token="selectedToken"
                    :wallet="wallet" />
            </div>
            <span class="icon">
                <i class="far fa-arrow-left"></i>
            </span>
            <!-- <Modal v-model:show="showModal"> -->
            <!-- </Modal> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, inject, watch } from 'vue'
import { Token, InjectWallet, InjectBest } from '@/types'
import { balanceList as getBalance } from './svc'
import TokenItem from './components/Token/TokenItem.vue'
// import Modal from './components/Modal.vue'
import TokenApprovedList from './components/Approved/TokenApprovedList.vue'
import Navbar from './components/Navbar.vue'

const tokens = ref<Token[]>([])
const best = inject('best') as InjectBest
const originTokens = inject<Token[]>('tokens')
const { wallet, requestWallet } = inject('wallet') as InjectWallet
const selectedToken = ref<Token>()
const hash = ref<string>('')
const title = ref<string>('Tokens')
tokens.value = originTokens!.slice()

const initHash = () => {
    const temp = window.location.hash
    console.log(temp, temp.includes('approval'), wallet.value)
    if (temp.includes('approval')) {
        if (!wallet.value) {
            console.log(0)
            window.location.hash = '#tokens'
        } else {
            hash.value = 'approval'
            selectedToken.value = tokens.value[0]
        }
    } else if (temp.includes('tokens')) {
        hash.value = 'tokens'
    } else {
        hash.value = 'tokens'
    }
}
initHash()

const fetchBalance = async (list: Token[], wallet: string) => {
    const balanceList = await getBalance(
        list.map((t) => {
            return t.address
        }),
        wallet!
    )

    balanceList.forEach((item, i) => {
        tokens.value[i].balance = item
    })
}

const onTokenClick = async (t: Token) => {
    if (wallet.value) {
        selectedToken.value = t
        window.location.hash = 'approval'
    } else {
        await requestWallet()
    }
}

watch([best, wallet], ([best, addr]) => {
    if (best && addr) {
        fetchBalance(originTokens as Token[], addr.toString())
    }
})

window.addEventListener('hashchange', () => {
    const temp = window.location.hash
    if (temp.includes('approval')) {
        hash.value = 'approval'
    } else {
        hash.value = 'tokens'
    }
})

watch(hash, () => {
    if (hash.value === 'tokens') {
        title.value = 'Tokens'
    } else {
        title.value = 'Token Approval ' + `(${selectedToken.value?.symbol})`
    }
})
</script>
