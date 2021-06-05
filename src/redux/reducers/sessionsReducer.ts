import {LayoutType} from "./buildingsReducer";
import {Dispatch} from "redux";
import {sessionsApi} from "../../api/sessionsApi";
import {message} from "antd";
import {SimplePaginationArgs} from "./common/pagination/PaginationArgs";
import {UserType} from "./companiesReducer";

const SET_SESSIONS = 'SET-SESSIONS'
const SET_SESSIONS_IN_LOADING = 'SET-SESSIONS-IN-LOADING'

type Session = {
    layouts: Array<LayoutType>
    isCurrent: boolean
}

type SessionsState = {
    sessions: Array<Session>,
    totalSessions: number,
    createdAt?: Date
    employee?: UserType,
    sessionsInLoading: boolean
}

const initialState: SessionsState = {
    sessions: [],
    totalSessions: 0,
    createdAt: undefined,
    employee: undefined,
    sessionsInLoading: false
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
        case SET_SESSIONS_IN_LOADING:
            return {
                ...state,
                sessionsInLoading: action.sessionsInLoading
            }
        default:
            return state
    }
}

const setSessions = (sessions: Array<Session>, total: number) => ({type: SET_SESSIONS, sessions, total})
const setSessionsInLoading = (sessionsInLoading: boolean) => ({type: SET_SESSIONS_IN_LOADING, sessionsInLoading})

/**
 * Download company viewing sessions.
 * @param pagination Pagination arguments.
 */
export const downloadSessions = (pagination: SimplePaginationArgs) => async (dispatch: Dispatch) => {
    try {
        dispatch(setSessionsInLoading(true))
        const sessionsResponse = await sessionsApi.downloadSessions(pagination.pageNumber, pagination.pageSize)
        dispatch(setSessions(sessionsResponse.data.content, sessionsResponse.data.total))
        dispatch(setSessionsInLoading(false))
    } catch (error) {
        message.error('Не удалось загрузить сессии')
    }
}

/**
 * Delete session by id.
 * @param sessionId Session id.
 */
export const deleteSession = (sessionId: number) => async (dispatch: Dispatch) => {
    try {
        await sessionsApi.deleteSession(sessionId)
    } catch (error) {
        message.error('Не удалось удалить сессию')
        return
    }

    await downloadSessions(new SimplePaginationArgs())(dispatch)
    message.success('Сессия успешно удалена')
}

/**
 * Delete layout from session.
 * @param sessionId Session id.
 * @param layoutId Layout id.
 */
export const deleteLayoutFromSession = (sessionId: number, layoutId: number) => async (dispatch: Dispatch) => {
    try {
        await sessionsApi.deleteLayoutFromSession(sessionId, layoutId)
    } catch (error) {
        message.error('Не удалось удалить планировку из сессии')
        return
    }

    await downloadSessions(new SimplePaginationArgs())(dispatch)
    message.success('Планировка успешно удалена из сессии')
}

/**
 * Add layouts to session.
 * @param sessionId Session id.
 * @param layouts Layout for adding to session.
 */
export const addLayoutsToSessions = (sessionId: number, layouts: Array<number>) => async (dispatch: Dispatch) => {
    try {
        await sessionsApi.addToSession(sessionId, layouts)
    } catch (error) {
        message.error('Не удалось добавить планировки в сессию')
        return
    }

    await downloadSessions(new SimplePaginationArgs())(dispatch)

    const messageText = layouts.length === 1 ? 'Планировка успешно добавлена в сессию!'
        : 'Планировки успешно добавлены в сессию!'
    message.success(messageText)
}

export const startSession = (sessionId: number) => async (dispatch: Dispatch) => {
    try {
        await sessionsApi.startSession(sessionId)
    } catch (error) {
        message.error('Не удалось начать сессию')
        return
    }

    await downloadSessions(new SimplePaginationArgs())(dispatch)
    message.success(`Сессия начата`)
}

export default sessionsReducer