import {refreshSession} from './authReducer'

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

export type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

/**
 * Refresh session an download user data
 */
export const initializeApp = () => async (dispatch: any) => {
    await dispatch(refreshSession())
    dispatch(initializedSuccess())
}

export default appReducer
