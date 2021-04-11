import {authAPI} from '../../api/authAPI'
import {EMPLOYEE} from '../userRoles'

const TOGGLE_IS_AUTH = 'TOGGLE-IS-AUTH'
const SET_USER_DATA = 'SET-USER-DATA'
const LOGOUT = 'LOGOUT'

const initialState = {
    id: 0,
    isAuth: false,
    accessToken: null,
    company: {
        name: 'CompanyName'
    },
    firstName: 'FirstName',
    lastName: 'LastName',
    roles: [EMPLOYEE]
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TOGGLE_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth,
                accessToken: action.accessToken
            }
        case SET_USER_DATA:
            return {
                ...state,
                ...action.userData,
                roles: action.userData.roles.map((role: string) => role.toUpperCase()),
            }
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                accessToken: null,
                userData: null
            }
        default:
            return state
    }
}

const setUserData = (userData: any) => ({ type: SET_USER_DATA, userData })

export const toggleIsAuth = (isAuth: any, accessToken?: string) => ({ type: TOGGLE_IS_AUTH, isAuth, accessToken })
export const logout = () => ({ type: LOGOUT })

export const login = (login: string, password: string, rememberMe: boolean) => async (dispatch: any) => {

    try {
        const response = await authAPI.login(login, password, rememberMe)
        const userData = await authAPI.me()

        dispatch(setUserData(userData.data))
        dispatch(toggleIsAuth(true, response.data.accessToken))
    } catch (error) {

    }
}

export const refreshSession = () => async (dispatch: any) => {
    try {
        const response = await authAPI.refresh()
        const userData = await authAPI.me()

        dispatch(setUserData(userData.data))
        dispatch(toggleIsAuth(true, response.data.accessToken))

    } catch (error) {
        dispatch(toggleIsAuth(false, undefined))
        throw 'Bad request, maybe refresh sessions not started'
    }
}

export default authReducer
