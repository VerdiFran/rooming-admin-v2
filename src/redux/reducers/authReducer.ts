import {authAPI} from '../../api/authAPI'
import {ADMIN, DEVELOPER, EMPLOYEE, USER} from '../userRoles'
import {Dispatch} from 'redux'

const userRoles = [EMPLOYEE, DEVELOPER, ADMIN, USER]

const SET_IS_AUTH = 'SET-IS-AUTH'
const SET_USER_DATA = 'SET-USER-DATA'
const RESET_USER_DATA = 'RESET-USER-DATA'
const TOGGLE_LOGOUT_IS_FINISHED = 'TOGGLE-LOGOUT-IS-FINISHED'

const initialState = {
    id: 0,
    isAuth: false,
    accessToken: null,
    userData: {
        company: {
            name: '{CompanyName}'
        },
        firstName: '{FirstName}',
        lastName: '{LastName}',
        roles: [EMPLOYEE]
    },
    logoutIsFinished: false
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth,
                accessToken: action.accessToken,
                userData: state.userData
            }
        case SET_USER_DATA:
            return {
                ...state,
                userData: {
                    ...action.userData,
                    roles: action.userData.roles.map((role: string) => role.toUpperCase())
                },
            }
        case RESET_USER_DATA:
            return {
                ...state,
                isAuth: false,
                userData: null
            }
        case TOGGLE_LOGOUT_IS_FINISHED:
            return {
                ...state,
                logoutIsFinished: !state.logoutIsFinished
            }
        default:
            return state
    }
}

const setUserData = (userData: any) => ({type: SET_USER_DATA, userData})

/**
 * Action creator.
 * Set isAuth and access token
 * @param {boolean} isAuth
 * @param {string} accessToken Access token
 */
export const setIsAuth = (isAuth: any, accessToken?: string) => ({type: SET_IS_AUTH, isAuth, accessToken})

/**
 * Action creator.
 * Reset user data to null and isAuth to false
 */
export const resetUserData = () => ({type: RESET_USER_DATA})

/**
 * Action creator.
 * Toggle when logout is started and logout is finished
 */
export const toggleLogoutIsFinished = () => ({type: TOGGLE_LOGOUT_IS_FINISHED})

/**
 * Get data about user and set it
 */
export const downloadUserData = () => async (dispatch: Dispatch) => {
    const {data} = await authAPI.me()

    const preparedUserData = {
        ...data,
        company: data.company || {name: null},
        roles: userRoles.filter(role => data.roles.map((r: string) => r.toUpperCase()).includes(role))
    }

    await dispatch(setUserData(preparedUserData))
}

/**
 * Login user
 * @param {string} login User's login
 * @param {string} password User's password
 * @param {boolean} rememberMe
 */
export const login = (login: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    try {
        const response = await authAPI.login(login, password, rememberMe)

        await dispatch(downloadUserData())
        dispatch(setIsAuth(true, response.data.accessToken))
    } catch (error) {

    }
}

/**
 * Logout user
 */
export const logout = () => async (dispatch: Dispatch) => {
    dispatch(toggleLogoutIsFinished())
    const response = await authAPI.logout()

    console.log(response)

    dispatch(setIsAuth(false, undefined))
    dispatch(resetUserData())
    dispatch(toggleLogoutIsFinished())
}

/**
 * Get new access token
 */
export const refreshSession = () => async (dispatch: any) => {
    try {
        const response = await authAPI.refresh()
        await dispatch(downloadUserData())
        dispatch(setIsAuth(true, response.data.accessToken))

    } catch (error) {
        dispatch(setIsAuth(false, undefined))
    }
}

export default authReducer
