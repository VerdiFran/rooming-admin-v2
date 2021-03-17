import {ordersAPI} from '../../api/ordersAPI'
import {Dispatch} from 'redux'
import {citiesDbAPI} from '../../api/citiesDbAPI'
import {IdGenerator} from '../../utils/generators/generators'

const SET_CITIES = 'SET-CITIES'
const SET_ADDRESSES = 'SET-ADDRESSES'
const ADD_ADDRESS = 'ADD-ADDRESS'
const ADD_COMPLEX = 'ADD-COMPLEX'
const SET_ORDERS = 'SET-ORDERS'
const SET_CURRENT_LAYOUTS_ID = 'SET_CURRENT_LAYOUTS_ID'

const complexIdIterator = IdGenerator()
const buildingIdIterator = IdGenerator()

type ResponseCityType = {
    id: number
    wikiDataId: string
    type: string
    city: string
    name: string
    country: string
    countryCode: string
    region: string
    regionCode: string
    latitude: number
    longitude: number
}

type LayoutType = {
    description: string
    id?: number
    buildingId?: number | null
    building?: {
        description: string
        address: {
            city: string
            street: string
            house: string
        }
        complexId?: number | null
        complex?: {
            name: string
            description: string
            createdAt?: string
            createdBy?: {
                id: number
                lastName: string
                firstName: string
            }
        } | null
        createdAt?: string
        createdBy?: {
            id: number
            lastName: string
            firstName: string
        }
    } | null
    layoutOrderStatus?: string
    resources?: Array<number>
    files?: Array<File>
}

type BuildingType = {
    city: string
    street: string
    house: string
    buildingId: number
    complexId: number
    complexName: string
}

type ComplexType = {
    complexName: string
    complexDescription: string
    complexId?: string
}

type OrderType = {
    orderDescription: string
    deadline: string
    layouts: Array<LayoutType>
    id?: number
    createdAt?: string
    createdBy?: {
        id: number
        lastName: string
        firstName: string
        company: {
            contactPhone: string
            email: string
            id: number
            name: string
        }
    }
}

export type InitialStateType = {
    orders: Array<OrderType>
    addresses: Array<BuildingType>
    newAddresses: Array<BuildingType>
    cities: Array<string>
    newComplexes: Array<ComplexType>
    currentLayoutIds: Array<number>
}

const initialState: InitialStateType = {
    orders: [],
    addresses: [],
    cities: [],
    newAddresses: [],
    newComplexes: [],
    currentLayoutIds: []
}

const ordersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CITIES:
            return {
                ...state,
                cities: action.cities
            }
        case SET_ADDRESSES:
            return {
                ...state,
                addresses: action.addresses
            }
        case ADD_ADDRESS:
            return {
                ...state,
                newAddresses: [...state.newAddresses, {
                    ...action.address,
                    buildingId: `new_${buildingIdIterator.next().value}`
                }]
            }
        case ADD_COMPLEX:
            return {
                ...state,
                newComplexes: [...state.newComplexes, {
                    ...action.complex,
                    complexId: `new_${complexIdIterator.next().value}`
                }]
            }
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            }
        case SET_CURRENT_LAYOUTS_ID:
            return {
                ...state,
                currentLayoutIds: action.currentLayoutIds
            }
        default:
            return state
    }
}

const setCities = (cities: Array<string>) => ({type: SET_CITIES, cities})
const setAddresses = (addresses: Array<BuildingType>) => ({type: SET_ADDRESSES, addresses})
const setOrders = (orders: Array<OrderType>) => ({type: SET_ORDERS, orders})

export const addAddress = (address: BuildingType) => ({type: ADD_ADDRESS, address})
export const addComplex = (complex: ComplexType) => ({type: ADD_COMPLEX, complex})
export const setCurrentLayoutIds = (currentLayoutIds: Array<number>) => ({
    type: SET_CURRENT_LAYOUTS_ID,
    currentLayoutIds
})

export const getAddressesByCityName = (city: string) => async (dispatch: Dispatch) => {
    const response = await ordersAPI.getAddresses(city)
    dispatch(setAddresses(response.data))
}

export const getCitiesByNamePrefix = (prefix: string) => async (dispatch: Dispatch) => {
    const response = await citiesDbAPI.getCitiesByNamePrefix(prefix)
    dispatch(setCities(response.data.data.map((item: ResponseCityType) => item.city)))
}

export const getCompanyOrders = () => async (dispatch: Dispatch) => {
    const response = await ordersAPI.getOrders()
    dispatch(setOrders(response.data))
}

export const getAllOrders = () => async (dispatch: Dispatch) => {
    const response = await ordersAPI.getAllOrders()
    dispatch(setOrders(response.data))
}

export const addNewOrder = (order: OrderType) => async (dispatch: Dispatch) => {
    const {orderDescription, deadline, layouts} = order

    for (const layout of layouts) {
        layout.resources = await sendOrderFiles(layout.files)
        delete layout.files
    }

    const layoutsReadyForSending = layouts.map(layout => {
        if (layout.buildingId && layout.building && /new/.test(layout.buildingId.toString())) {
            if (layout.building.complexId && /new/.test(layout.building.complexId.toString())) {
                return {
                    ...layout,
                    buildingId: null,
                    building: {
                        ...layout.building,
                        complexId: null
                    }
                }
            } else {
                return {
                    ...layout,
                    buildingId: null,
                    building: {
                        ...layout.building,
                        complex: null
                    }
                }
            }
        } else {
            return {
                ...layout,
                building: null
            }
        }
    })

    await ordersAPI.sendNewOrder({
        order: {
            orderDescription,
            deadline,
            layouts: layoutsReadyForSending
        }
    })
    await getCompanyOrders()
}

const sendOrderFiles = async (files: Array<File> | undefined) => {

    if (!files) return []

    const fileIds: Array<number> = []

    for (const file of files) {
        let formData = new FormData()
        formData.append('image', file)

        const response = await ordersAPI.sendNewOrderFile(formData)
        fileIds.push(response.data.id)
    }

    return fileIds
}

export default ordersReducer
