import {LayoutType} from "./buildingsReducer";
import {Dispatch} from "redux";
import {sessionsApi} from "../../api/sessionsApi";
import {message} from "antd";
import {SimplePaginationArgs} from "./common/PaginationArgs";
import {UserType} from "./companiesReducer";

const SET_SESSIONS = 'SET-SESSIONS'

type Session = {
    layouts: Array<LayoutType>
}

type SessionsState = {
    sessions: Array<Session>,
    totalSessions: number,
    createdAt?: Date
    employee?: UserType
}

const initialState: SessionsState = {
    sessions: [],
    totalSessions: 0,
    createdAt: undefined,
    employee: undefined
}

/**
 * Sessions reducer.
 * @param state Session state.
 * @param action Action.
 */
const sessionsReducer = (state: SessionsState = initialState, action: any) => {
    switch (action.type) {
        case SET_SESSIONS:
            return {
                ...state,
                sessions: action.sessions,
                totalSessions: action.total
            }
        default:
            return state
    }
}

const setSessions = (sessions: Array<Session>, total: number) => ({type: SET_SESSIONS, sessions, total})

/**
 * Download company viewing sessions.
 * @param pagination Pagination arguments.
 */
export const downloadSessions = (pagination: SimplePaginationArgs) => async (dispatch: Dispatch) => {
    try {
        const response = await sessionsApi.downloadSessions(pagination.pageNumber, pagination.pageSize)
        dispatch(setSessions(response.data.content, response.data.total))
    } catch (error) {
        message.error('Не удалось загрузить сессии')
    }
}

export default sessionsReducer