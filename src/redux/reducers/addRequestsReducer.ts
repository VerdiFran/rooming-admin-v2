import {Dispatch} from "redux"
import {addRequestsAPI} from '../../api/addRequestsApi'

const SET_COMPANY_ADD_REQUESTS = 'SET-COMPANY-ADD-REQUESTS'
const SET_SELECTED_ADD_REQUEST = 'SET-SELECTED-ADD-REQUEST'
const SET_ADD_REQUESTS_IN_LOADING = 'SET-ADD-REQUESTS-IN-LOADING'

type UserAddRequestType = {
    id: number
    firstname: string
    lastName: string
    email: string
    phoneNumber: string
}

type CompanyAddRequestType = {
    id: number
    name: string
    email: string
    contactPhone: string
    employees: Array<UserAddRequestType>
}

export type InitialStateType = {
    companiesAddRequests: Array<CompanyAddRequestType>
    selectedCompanyAddRequest: number
    totalPages: number
    addRequestsInLoading: boolean
}

const initialState: InitialStateType = {
    companiesAddRequests: [],
    selectedCompanyAddRequest: 0,
    totalPages: 0,
    addRequestsInLoading: false
}

/**
 * Add requests reducer.
 * @param state Add requests state.
 * @param action Action.
 * @return State.
 */
const addRequestsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_COMPANY_ADD_REQUESTS:
            return {
                ...state,
                companiesAddRequests: action.addRequests,
                companiesRequestsTotalPages: action.totalPages
            }
        case SET_SELECTED_ADD_REQUEST:
            return {
                ...state,
                selectedCompanyAddRequest: action.selectedCompanyAddRequest
            }
        case SET_ADD_REQUESTS_IN_LOADING:
            return {
                ...state,
                addRequestsInLoading: action.addRequestsInLoading
            }
        default: return state
    }
}

const setCompanyAddRequests = (addRequests: Array<CompanyAddRequestType>, totalPages: number) => ({
    type: SET_COMPANY_ADD_REQUESTS,
    addRequests: addRequests,
    totalPages: totalPages
})

const setAddRequestsInLoading = (addRequestsInLoading: boolean) => ({
    type: SET_ADD_REQUESTS_IN_LOADING,
    addRequestsInLoading
})

/**
 * Set selected company-add request.
 * @param selectedRequest Id of selected request.
 */
export const setSelectedCompanyAddRequest = (selectedRequest: number) => ({
    type: SET_SELECTED_ADD_REQUEST,
    selectedCompanyAddRequest: selectedRequest
})

/**
 * Execute company add requests by specified ids.
 * @param ids List of company add requests for execute.
 */
export const executeCompanyAddRequests = (ids: Array<number>) => async (dispatch: Dispatch) => {
    try {
        await addRequestsAPI.executeCompanyAddRequests(ids)
        await downloadCompanyAddRequests(1, 10, true)(dispatch)
    } catch (error) {
        throw error
    }
}

/**
 * Downloads and set company add requests.
 * @param pageNumber Pagination number.
 * @param pageSize Pagination size.
 * @param onlyNotExecuted Whether need only not executed.
 * @returns
 */
export const downloadCompanyAddRequests = (pageNumber: number, pageSize: number, onlyNotExecuted: boolean) => async (dispatch: Dispatch) => {
    dispatch(setAddRequestsInLoading(true))
    const response = await addRequestsAPI.getCompanyAddRequests(pageNumber, pageSize, onlyNotExecuted)

    const content = response.data.content
    const totalPages = response.data.total

    dispatch(setCompanyAddRequests(content, totalPages))
    dispatch(setAddRequestsInLoading(false))
}

export default addRequestsReducer