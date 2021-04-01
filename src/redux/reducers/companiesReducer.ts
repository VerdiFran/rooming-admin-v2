import { Dispatch } from "redux"
import { companiesAPI } from "../../api/companiesAPI"

const SET_COMPANIES = 'SET_COMPANIES'

type CompanyType = {
    name: string
    email: string
    contactPhone: string
}

export type CompaniesStateType = {
    companies: Array<CompanyType>
    totalPages: number
}

const initialState: CompaniesStateType = {
    companies: [],
    totalPages: 0
}

/**
 * Reducer for companies fields state.
 * @param state State.
 * @param action Action.
 * @returns New state.
 */
const companiesReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case SET_COMPANIES:
            return {
                ...state,
                companies: action.companies,
                totalPages: action.totalPages
            }
        default:
            return state
    }
}

const setCompanies = (companies: Array<CompanyType>, totalPages: number) => ({
    type: SET_COMPANIES,
    companies: companies,
    totalPages: totalPages
})

/**
 * Uploads companies from server.
 * @param page Pagination number.
 * @param pageSize Pagination size.
 * @param name Part of company name.
 */
export const uploadCompanies = (pageNumber: number = 1, pageSize: number = 10, name: string = '') => async (dispatch: Dispatch) => {
    const response = await companiesAPI.getCompanies(pageNumber, pageSize, name)

    const companies: Array<CompanyType> = response.data.content
    const total: number = response.data.total

    dispatch(setCompanies(companies, total))
}

export default companiesReducer