import { Dispatch } from 'redux'
import {buildingsAPI} from "../../api/buildingsAPI";
import {message} from "antd";

const SET_COMPLETED_LAYOUTS = 'SET_COMPLETED_LAYOUTS'
const SET_SELECTED_LAYOUT_ID = 'SET-SELECTED-LAYOUT-ID'
const SET_BUILDINGS_IN_LOADING = 'SET-BUILDINGS-IN-LOADING'

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

export type AddressType = {
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
    buildingsInLoading: boolean
}

const initialState: InitialStateType = {
    buildings: [],
    totalPages: 0,
    selectedLayoutId: 0,
    buildingsInLoading: false
}


const buildingsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_COMPLETED_LAYOUTS:
            return {
                ...state,
                buildings: action.buildings,
                totalPages: action.totalPages
            }
        case SET_BUILDINGS_IN_LOADING:
            return {
                ...state,
                buildingsInLoading: action.buildingsInLoading
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

const setBuildingsInLoading = (buildingsInLoading: boolean) => ({
    type: SET_BUILDINGS_IN_LOADING,
    buildingsInLoading
})

/**
 * Downloads company buildings and pass it in state.
 * @param page Page number.
 * @param pageSize Page size.
 */
export const getBuildingsWithCompletedLayouts = (page: number = 1, pageSize: number = 10) => async (dispatch: Dispatch) => {
    try {
        dispatch(setBuildingsInLoading(true))
        const response = await buildingsAPI.getBuildingsWithCompletedLayouts(page, pageSize)
        dispatch(setBuildingsWithCompletedLayouts(response.data.content, response.data.total))
        dispatch(setBuildingsInLoading(false))
    } catch (error) {
        message.error('Не удалось загрузить планировки')
    }
}

/**
 * Downloads buildings and pass it in state.
 * @param page Page number.
 * @param pageSize Page size.
 */
export const getBoundBuildings = (page: number = 1, pageSize: number = 10) => async (dispatch: Dispatch) => {
    try {
        dispatch(setBuildingsInLoading(true))
        const response = await buildingsAPI.getBoundBuildings(page, pageSize)
        dispatch(setBuildingsWithCompletedLayouts(response.data.content, response.data.total))
        dispatch(setBuildingsInLoading(false))
    } catch (error) {
        message.error('Не удалось загрузить планировки')
    }
}

export default buildingsReducer
