import { Dispatch } from 'redux'
import {layoutsAPI} from '../../api/layoutsAPI'

const SET_COMPLETED_LAYOUTS = 'SET_COMPLETED_LAYOUTS'

export type LayoutType = {
    id: number
    description: string
    buildings: Array<BuildingType>
    createdAt: Date
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
}

const initialState: InitialStateType = {
    buildings: [],
    totalPages: 0
}


const layoutsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_COMPLETED_LAYOUTS:
            return {
                ...state,
                buildings: action.buildings,
                totalPages: action.totalPages
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

export const getBuildingsWithCompletedLayouts = (page: number = 1, pageSize: number = 10) => async (dispatch: Dispatch) => {
    const response = await layoutsAPI.getBuildingsWithCompletedLayouts(page, pageSize)
    dispatch(setBuildingsWithCompletedLayouts(response.data.content, response.data.total))
}

export default layoutsReducer
