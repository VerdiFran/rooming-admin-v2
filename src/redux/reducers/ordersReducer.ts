import {ordersAPI} from '../../api/ordersAPI'
import {Dispatch} from 'redux'
import {citiesDbAPI} from '../../api/citiesDbAPI'

const SET_CITIES = 'SET-CITIES'
const SET_ADDRESSES = 'SET-ADDRESSES'
const SET_CITIES_BY_PREFIX = 'SET-CITIES-BY-PREFIX'

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
    id: number,
    description: string,
    buildingId?: number | null,
    buildingOrder?: {
        id: number,
        city: string,
        street: string,
        house: string
    } | null,
    complexId?: number | null,
    complexOrder?: {
        id: number,
        name: string,
        description: string
    } | null
}

type BuildingType = {
    city: string,
    street: string,
    house: string,
    buildingId: number,
    complexId: number,
    complexName: string
}

type OrderType = {
    id: number,
    orderDescription: string,
    deadline: string,
    layouts: Array<LayoutType>
}

export type InitialStateType = {
    orders: Array<OrderType> | [] | null
    addresses: Array<BuildingType> | [] | null
    newAddresses: Array<BuildingType> | [] | null
    cities: Array<string> | [] | null,
    citiesByNamePrefix: Array<string> | [] | null
}

const initialState: InitialStateType = {
    orders: [
        {
            id: 0,
            orderDescription: '',
            deadline: '',
            layouts: [
                {
                    id: 0,
                    description: '',
                    buildingId: 3,
                    complexId: 7
                },
                {
                    id: 1,
                    description: '',
                    buildingId: 3,
                    complexId: 7
                }
            ]
        }
    ],
    addresses: [
        /*{
            city: 'Красноярск',
            street: 'Алексеева',
            house: '33',
            buildingId: 6,
            complexId: 12,
            complexName: 'Престиж'
        },
        {
            city: 'Красноярск',
            street: 'Алексеева',
            house: '35',
            buildingId: 45,
            complexId: 12,
            complexName: 'Престиж'
        },
        {
            city: 'Красноярск',
            street: 'Мерная',
            house: '4',
            buildingId: 23,
            complexId: 12,
            complexName: 'Престиж'
        },
        {
            city: 'Красноярск',
            street: 'Борисова',
            house: '83',
            buildingId: 9,
            complexId: 3,
            complexName: 'Голубое небо'
        },
        {
            city: 'Красноярск',
            street: 'Борисова',
            house: '80',
            buildingId: 7,
            complexId: 3,
            complexName: 'Голубое небо'
        },*/
    ],
    cities: [],
    newAddresses: [],
    citiesByNamePrefix: []
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
        case SET_CITIES_BY_PREFIX:
            return {
                ...state,
                citiesByNamePrefix: action.cities
            }
        default:
            return state
    }
}

const setCities = (cities: Array<string>) => ({type: SET_CITIES, cities})
const setAddresses = (addresses: Array<BuildingType>) => ({type: SET_ADDRESSES, addresses})
const setCitiesByPrefix = (cities: Array<string>) => ({type: SET_CITIES_BY_PREFIX, cities})

export const getAllCities = () => async (dispatch: Dispatch) => {
    const response = await ordersAPI.getAllCities()
    dispatch(setCities(response))
}

export const getAddressesByCityName = (city: string) => async (dispatch: Dispatch) => {
    const response = await ordersAPI.getAddresses(city)
    dispatch(setAddresses(response))
}

export const getCitiesByNamePrefix = (prefix: string) => async (dispatch: Dispatch) => {
    const response = await citiesDbAPI.getCitiesByNamePrefix(prefix)
    dispatch(setCitiesByPrefix(response.data.data.map((item: ResponseCityType) => item.city)))
}

export default ordersReducer
