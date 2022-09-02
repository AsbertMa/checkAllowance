import { Connex } from '@vechain/connex'
import balanceOf from './balanceOf.json'
import approvalEvent from './approvalEvent.json'
import allowance from './allowance.json'
import approval from './approval.json'
export * from './token'

const connex = new Connex({
    node: 'https://testnet.vecha.in/',
    network: 'test'
})

const balanceList = async (
    tokens: string[],
    addr: string
): Promise<string[]> => {
    const clauses = tokens.map((t) => {
        const method = connex.thor.account(t).method(balanceOf)
        return method.asClause(addr)
    })
    const result = await connex.thor.explain(clauses).execute()
    return result.map((t) => {
        return t.data
    })
}

const getAllowanceList = async function (token: string, owner: string, spenders: string[]) {
    const method = connex.thor.account(token).method(allowance)
    const clauses = spenders.map(s => {
        return method.asClause(owner, s)
    })
    return await connex.thor.explain(clauses).execute()
}

const resetApproval = async function (token: string, owner: string, spenders: string[]) {
    const method = connex.thor.account(token).method(approval)
    const clauses = spenders.map(s => {
        return method.asClause(s, 0)
    })

    return await connex.vendor.sign('tx', clauses).signer(owner).request()
}

const fetchApproval = async function (token: string, addr: string, page: number): Promise<string[]> {
    const event = connex.thor.account(token).event(approvalEvent)
    const result = await event.filter([{ _owner: addr }]).order('desc').apply(100 * (page - 1), page * 100)

    return result.map(item => {
        return item.decoded._spender
    })
}
export { connex, balanceList, fetchApproval, getAllowanceList, resetApproval }
