import {Dispatch} from "redux"
import {addRequestsAPI} from '../../api/addRequestsApi'

const SET_COMPANY_ADD_REQUESTS = 'SET_COMPANY_ADD_REQUESTS'

type UserAddRequestType = {
    firstname: string,
    lastName: string,
    email: string,
    phoneNumber: string
}

type CompanyAddRequestType = {
    name: string
    email: string
    contactPhone: string
    employees: Array<UserAddRequestType>
}

export type InitialStateType = {
    companiesAddRequests: Array<CompanyAddRequestType>
    totalPages: number
}

const initialState: InitialStateType = {
    companiesAddRequests: [],
    totalPages: 0
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
        default: return state
    }
}

const setCompanyAddRequests = (addRequests: Array<CompanyAddRequestType>, totalPages: number) => ({
    type: SET_COMPANY_ADD_REQUESTS,
    addRequests: addRequests,
    totalPages: totalPages
})

/**
 * Downloads and set company add requests.
 * @param pageNumber Pagination number.
 * @param pageSize Pagination size.
 * @param onlyNotExecuted Whether need only not executed.
 * @returns
 */
export const downloadCompanyAddRequests = (pageNumber: number, pageSize: number, onlyNotExecuted: boolean) => async (dispatch: Dispatch) => {
    const response = await addRequestsAPI.getCompanyAddRequests(pageNumber, pageSize, onlyNotExecuted)

    const content = response.data.content
    const totalPages = response.data.total

    dispatch(setCompanyAddRequests(content, totalPages))
}

export default addRequestsReducer