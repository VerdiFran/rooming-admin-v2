import { Dispatch } from 'redux'
import {buildingsAPI} from "../../api/buildingsAPI";

const SET_COMPLETED_LAYOUTS = 'SET_COMPLETED_LAYOUTS'
const SET_SELECTED_LAYOUT_ID = 'SET-SELECTED-LAYOUT-ID'

type User = {
    id: number,
    email: string
    firstName: string,
    lastName: string
}

export type LayoutType = {
    id: number
    description: string
    buildings: Array<BuildingType>
    createdAt: Date
    createdBy: User
}

export type BuildingType = {
    id: number
    description: string
    address: AddressType
    complex: ComplexType
    layouts: Array<LayoutType>
}

type AddressType = {
    city: string
    street: string
    house: string
}

type ComplexType = {
    id: number
    name: string
    description: string
}

export type InitialStateType = {
    buildings: Array<BuildingType>
    totalPages: number
    selectedLayoutId: number
}

const initialState: InitialStateType = {
    buildings: [],
    totalPages: 0,
    selectedLayoutId: 0
}


const buildingsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_COMPLETED_LAYOUTS:
            return {
                ...state,
                buildings: action.buildings,
                totalPages: action.totalPages
            }
        case SET_SELECTED_LAYOUT_ID:
            return {
                ...state,
                selectedLayoutId: action.selectedLayoutId
            }
        default:
            return state
    }
}

const setBuildingsWithCompletedLayouts = (buildings: Array<BuildingType>, totalPages: number) => ({
    type: SET_COMPLETED_LAYOUTS,
    buildings: buildings,
    totalPages: totalPages
})

/**
 * Set id of selected layout.
 * @param selectedLayoutId Layout id.
 */
export const setSelectedLayoutId = (selectedLayoutId: number) => ({
    type: SET_SELECTED_LAYOUT_ID,
    selectedLayoutId: selectedLayoutId
})

export const getBuildingsWithCompletedLayouts = (page: number = 1, pageSize: number = 10) => async (dispatch: Dispatch) => {
    const response = await buildingsAPI.getBuildingsWithCompletedLayouts(page, pageSize)
    dispatch(setBuildingsWithCompletedLayouts(response.data.content, response.data.total))
}

export default buildingsReducer
