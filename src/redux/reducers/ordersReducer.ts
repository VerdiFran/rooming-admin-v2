import {ordersAPI} from '../../api/ordersAPI'
import {Dispatch} from 'redux'
import {citiesDbAPI} from '../../api/citiesDbAPI'
import {IdGenerator} from '../../utils/generators/generators'

const SET_CITIES = 'SET-CITIES'
const SET_ADDRESSES = 'SET-ADDRESSES'
const ADD_ADDRESS = 'ADD-ADDRESS'
const ADD_COMPLEX = 'ADD-COMPLEX'
const SET_ORDERS = 'SET-ORDERS'

const complexIdIterator = IdGenerator()

/*
* {
    "order": {
        "orderDescription": "string",
        "deadline": "2021-02-16T10:17:49.522Z",
        "layouts": [
            {
                "description": "string",
                "buildingId": 3,
                "building": {
                    "description": "string",
                    "address": {
                        "city": "stringwe2211",
                        "street": "stingqqq",
                        "house": "12"
                    },
                    "complexId": 6,
                    "complex": {
                        "name": "strin",
                        "description": "string"
                    }
                }
            }
        ]
    }
}
* */

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
    resources?: Array<any>
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
}

const initialState: InitialStateType = {
    orders: [],
    addresses: [],
    cities: [],
    newAddresses: [],
    newComplexes: []
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
                newAddresses: [...state.addresses, action.address]
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
        default:
            return state
    }
}

const setCities = (cities: Array<string>) => ({type: SET_CITIES, cities})
const setAddresses = (addresses: Array<BuildingType>) => ({type: SET_ADDRESSES, addresses})
const setOrders = (orders: Array<OrderType>) => ({type: SET_ORDERS, orders})

export const addAddress = (address: BuildingType) => ({type: ADD_ADDRESS, address})
export const addComplex = (complex: ComplexType) => ({type: ADD_COMPLEX, complex})

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
    await ordersAPI.sendNewOrder(order)
    await getCompanyOrders()
}

export default ordersReducer
