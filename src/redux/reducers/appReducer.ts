import {authAPI} from '../../api/authAPI'

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

export const initializeApp = () => (dispatch: any) => {
    /*let promise = dispatch(getAuthUserData())

    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })*/

    dispatch(initializedSuccess())
}

export default appReducer
