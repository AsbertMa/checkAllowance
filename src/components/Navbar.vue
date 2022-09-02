<script setup lang="ts">
import { inject } from 'vue'
import { InjectWallet } from '../types'
import Address from './Address.vue'

const { wallet, requestWallet } = inject('wallet') as InjectWallet

const connect = async () => {
    await requestWallet()
}
</script>
<template>
    <nav class="navbar">
        <div class="navbar-brand"></div>
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-end">
                <button class="button is-primary" @click="connect">
                    <Address v-if="wallet" :addr="wallet" />
                    <span v-else>
                        Connect Wallet
                    </span>
                </button>
            </div>
        </div>
        <!-- <button class="button is-inverted">
            <span class="icon">
                <icon class="fas fa-arrow-left" />
            </span>
        </button> -->
    </nav>
</template>
