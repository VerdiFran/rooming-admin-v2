import {Action} from "./Action";

/**
 * Delete session action.
 */
export const DELETE_SESSION_ACTION: Action = {
    title: 'Удалить',
    type: 'DELETE-SESSION'
}

/**
 * Delete layout from session action.
 */
export const DELETE_SESSION_LAYOUT_ACTION: Action = {
    title: 'Удалить',
    type: 'DELETE-LAYOUT-FROM-SESSION'
}

export const START_SESSION: Action = {
    title: 'Начать сессию',
    type: 'START-SESSION'
}