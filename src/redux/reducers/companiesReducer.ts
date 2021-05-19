import { Dispatch } from "redux"
import { companiesAPI } from "../../api/companiesAPI"
import {AddressType} from './buildingsReducer'

const SET_COMPANIES = 'SET-COMPANIES'
const SET_SELECTED_COMPANY = 'SET-SELECTED-COMPANY'

export type UserType = {
    id: number
    firstname: string
    lastName: string
    email: string
    city: string
    phoneNumber: string
}

type CompanyType = {
    id: number
    name: string
    email: string
    contactPhone: string
    employees: Array<UserType>
    offices: Array<AddressType>
    layoutsCount: number
}

export type CompaniesStateType = {
    selectedCompanyId: number
    companies: Array<CompanyType>
    totalPages: number
}

const initialState: CompaniesStateType = {
    selectedCompanyId: 0,
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
        case SET_SELECTED_COMPANY:
            return {
                ...state,
                selectedCompanyId: action.selectedCompanyId
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
 * Set id of selected company.
 * @param id Id of selected company.
 */
export const setSelectedCompanyId = (id: number) => ({
    type: SET_SELECTED_COMPANY,
    selectedCompanyId: id
})

/**
 * Uploads companies from server.
 * @param pageNumber Pagination number.
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