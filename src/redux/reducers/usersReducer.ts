import {UserType} from './companiesReducer'
import {Dispatch} from 'redux'
import {usersApi} from '../../api/usersApi'
import {message} from 'antd'
import {BindRequestsPaginationArgs} from './common/pagination/BindRequestsPaginationArgs'

const SET_BIND_REQUESTS = 'SET-BIND-REQUESTS'

type BindRequest = {
    id: number
    isBound: boolean
    user: UserType
    createdAt: Date
}

type UsersState = {
    bindRequests: Array<BindRequest>
    totalRequests: number
}

const initialState: UsersState = {
    bindRequests: [],
    totalRequests: 0
}

/**
 * Reducer for users.
 * @param state Users state.
 * @param action Actions.
 */
const usersReducer = (state: UsersState = initialState, action: any) => {
    switch (action.type) {
        case SET_BIND_REQUESTS:
            return {
                ...state,
                bindRequests: action.bindRequests,
                totalRequests: action.total
            }
        default:
            return state
    }
}

const setBindRequests = (bindRequests: Array<BindRequest>, total: number) => ({type: SET_BIND_REQUESTS, bindRequests, total})

/**
 * Download bind-users-to-company requests.
 * @param paginationArgs Pagination arguments.
 */
export const downloadBindRequests = (paginationArgs: BindRequestsPaginationArgs) => async (dispatch: Dispatch) => {
    try {
        const response = await usersApi.getBindRequests(paginationArgs.pageNumber, paginationArgs.pageSize,
            paginationArgs.isBound, paginationArgs.usernamePart)
        dispatch(setBindRequests(response.data.content, response.data.total))
    } catch (error) {
        message.error('Не удалось загрузить запросы на привязку пользователей')
        return
    }
}

/**
 * Bind users to company.
 * @param ids Ids of users.
 */
export const bindToCompany = (ids: Array<number>) => async (dispatch: Dispatch) => {
    try {
        await usersApi.bindToCompany(ids)
        await downloadBindRequests(new BindRequestsPaginationArgs())(dispatch)
    } catch (error) {
        message.error('Не удалось провести привязку')
        return
    }
    message.success('Привязка прошла успешно')
}

/**
 * Unbind user from company.
 * @param id Bind-request id.
 */
export const unbindRequest = (id: number) => async (dispatch: Dispatch) => {
    try {
        await usersApi.unbindRequest(id)
        await downloadBindRequests(new BindRequestsPaginationArgs(1, 10, null, true))(dispatch)
    } catch (error) {
        message.error('Не удалось открепить пользователя от базы')
        return
    }
    message.success('Пользователь успешно откреплен от вашей базы')
}

export default usersReducer