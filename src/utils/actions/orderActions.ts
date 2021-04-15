/**
 * Take on execution action.
 */
import {Action} from "./Action";

export const TAKE_ON_EXECUTE_ACTION: Action = {
    title: 'стать исполнителем',
    type: 'TAKE-ON-EXECUTE-ACTION'
}

/**
 * Execute order action.
 */
export const EXECUTE_ORDER_ACTION: Action = {
    title: 'выполнить',
    type: 'EXECUTE-ORDER-ACTION'
}

/**
 * Remove order action
 */
export const REMOVE_ORDER_ACTION: Action = {
    title: 'удалить',
    type: 'REMOVE-ORDER-ACTION'
}