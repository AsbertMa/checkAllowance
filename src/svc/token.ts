import { Token } from '@/types'
const getTokens = async function (): Promise<Token[]> {
    const tokens = await fetch(
        'https://vechain.github.io/token-registry/test.json'
    )
    return (await tokens.json()).map((item: Token) => {
        return {
            name: item.name,
            symbol: item.symbol,
            address: item.address,
            icon: `https://vechain.github.io/token-registry/assets/${item.icon}`,
            balance: '0',
            decimals: item.decimals
        }
    })
}

export { getTokens }
