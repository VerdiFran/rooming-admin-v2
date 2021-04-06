import {authAPI} from '../../api/authAPI'
import {EMPLOYEE} from '../userRoles'

const TOGGLE_IS_AUTH = 'TOGGLE-IS-AUTH'
const SET_USER_DATA = 'SET-USER-DATA'
const LOGOUT = 'LOGOUT'

const initialState = {
    isAuth: false,
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
                isAuth: action.isAuth
            }
        case SET_USER_DATA:
            return {
                ...state,
                ...action.userData,
                roles: action.userData.roles.map((role: string)=> role.toUpperCase()),
            }
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                userData: null
            }
        default:
            return state
    }
}

const setUserData = (userData: any) => ({type: SET_USER_DATA, userData})

export const toggleIsAuth = (isAuth: any) => ({type: TOGGLE_IS_AUTH, isAuth})
export const logout = () => ({type: LOGOUT})

export const login = (login: string, password: string, rememberMe: boolean) => async (dispatch: any) => {

    try {
        await authAPI.login(login, password, rememberMe)
        const userData = await authAPI.me()

        dispatch(setUserData(userData.data))
        dispatch(toggleIsAuth(true))
    } catch (error) {

    }
}

export default authReducer
