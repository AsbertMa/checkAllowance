import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { connex, getTokens } from './svc'

const bestBlock = ref<number>(0)
const wallet = ref<string>('')

const requestWallet = async () => {
    const resp = await connex.vendor.sign('cert', {
        purpose: 'identification',
        payload: {
            type: 'text',
            content: 'Get the wallet address'
        }
    }).request()
    wallet.value = resp.annex.signer
}

const _app = createApp(App)
const tick = connex.thor.ticker()

const updateBest = async () => {
    for (; ;) {
        await tick.next()
        bestBlock.value = connex.thor.status.head.number
    }
}
getTokens().then(tokens => {
    _app.provide('best', bestBlock)
    _app.provide('tokens', tokens)
    _app.provide('wallet', { wallet, requestWallet })
    _app.mount('#app')
    updateBest()
})
