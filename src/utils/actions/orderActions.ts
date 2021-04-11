
type OrderAction = {
    title: string
    type: string
}

/**
 * Take on execution action.
 */
export const TAKE_ON_EXECUTE_ACTION: OrderAction = {
    title: 'стать исполнителем',
    type: 'TAKE-ON-EXECUTE-ACTION'
}

/**
 * Execute order action.
 */
export const EXECUTE_ORDER_ACTION: OrderAction = {
    title: 'выполнить',
    type: 'EXECUTE-ORDER-ACTION'
}