import {UNBIND_USER} from './usersActions'
import ActionButton from '../../components/common/ActionButton/ActionButton'
import * as React from 'react'

const actionsForChecking = [
    UNBIND_USER
]

/**
 * Get action buttons by type.
 * @param record Record The record for which actions was performed.
 * @param actions Actions for current record.
 * @param handleActions Map with actions and handlers.
 * @return Array of actions.
 */
export const getActionByType = (record, actions, handleActions) => {
    let actionButtons = []

    for (const currentAction of actionsForChecking) {
        const actionForReturn = actions.find(action => currentAction.type === action.type)

        if (actionForReturn) {
            const handler = handleActions.get(currentAction)
            actionButtons = [...actionButtons, <ActionButton title={currentAction.title} handleClick={() => handler(record)}/>]
        }
    }

    return actionButtons
}