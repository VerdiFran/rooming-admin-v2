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
    completedLayouts: Array<LayoutType>
}

const initialState: InitialStateType = {
    completedLayouts: []
}


const layoutsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_COMPLETED_LAYOUTS:
            return {
                ...state,
                completedLayouts: action.completedLayouts
            }
        default:
            return state
    }
}

const setCompletedLayouts = (completedLayotus: Array<LayoutType>) => ({type: SET_COMPLETED_LAYOUTS, completedLayouts: completedLayotus})

export const getCompletedCompanyBuildings = () => async (dispatch: Dispatch) => {
    const response = await layoutsAPI.getCompletedLayouts()
    dispatch(setCompletedLayouts(response.data))
}

export default layoutsReducer
