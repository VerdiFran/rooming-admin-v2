import {ordersAPI} from '../../api/ordersAPI'
import {Dispatch} from 'redux'
import {citiesDbAPI} from '../../api/citiesDbAPI'
import {IdGenerator} from '../../utils/generators/generators'
import {message} from "antd";
import {updateLayoutOrderExecutor} from "../../utils/helpers/ordersHelper";

const SET_CITIES = 'SET-CITIES'
const SET_ADDRESSES = 'SET-ADDRESSES'
const ADD_ADDRESS = 'ADD-ADDRESS'
const ADD_COMPLEX = 'ADD-COMPLEX'
const SET_ORDERS = 'SET-ORDERS'
const SET_CURRENT_LAYOUTS_ID = 'SET-CURRENT-LAYOUTS-ID'
const SET_LAYOUT_ORDER_EXECUTOR = 'SET-LAYOUT-ORDER-EXECUTOR'
const RESET_CITIES = 'RESET-CITIES'
const RESET_ADDRESSES = 'RESET-ADDRESSES'

const complexIdIterator = IdGenerator()
const buildingIdIterator = IdGenerator()

export type ExecutorType = {
    id: number
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
}


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
    executor: ExecutorType
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
    complexName: string,
    description: string
}

type ComplexType = {
    city: string,
    complexName: string
    complexDescription: string
    complexId?: string
}

export type OrderType = {
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
    totalPagesOfOrders: number
    addresses: Array<BuildingType>
    newAddresses: Array<BuildingType>
    cities: Array<string>
    newComplexes: Array<ComplexType>
    currentLayoutIds: Array<number>
}

const initialState: InitialStateType = {
    orders: [],
    totalPagesOfOrders: 0,
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
                orders: action.orders,
                totalPagesOfOrders: action.total
            }
        case SET_CURRENT_LAYOUTS_ID:
            return {
                ...state,
                currentLayoutIds: action.currentLayoutIds
            }
        case SET_LAYOUT_ORDER_EXECUTOR:
            return {
                ...state,
                orders: updateLayoutOrderExecutor(state.orders, action.orderId, action.layoutOrderId, action.executor)
            }
        case RESET_CITIES:
            return {
                ...state,
                cities: []
            }
        case RESET_ADDRESSES:
            return {
                ...state,
                addresses: [],
                newAddresses: [],
                newComplexes: []
            }
        default:
            return state
    }
}

const setCities = (cities: Array<string>) => ({type: SET_CITIES, cities})
const setAddresses = (addresses: Array<BuildingType>) => ({type: SET_ADDRESSES, addresses})
const resetCities = () => ({type: RESET_CITIES})
const resetAddresses = () => ({type: RESET_ADDRESSES})
const setOrders = (orders: Array<OrderType>, total: number) => ({type: SET_ORDERS, orders, total})

export const addAddress = (address: BuildingType) => ({type: ADD_ADDRESS, address})
export const addComplex = (complex: ComplexType) => ({type: ADD_COMPLEX, complex})
export const setCurrentLayoutIds = (currentLayoutIds: Array<number>) => ({
    type: SET_CURRENT_LAYOUTS_ID,
    currentLayoutIds
})

const setExecutor = (layoutOrderId: number, orderId: number, executor: ExecutorType) => ({
    type: SET_LAYOUT_ORDER_EXECUTOR,
    layoutOrderId,
    orderId,
    executor
})

/**
 * Set user who will execute layout order and related status of execution.
 * @param layoutOrderId Layout order to execute.
 * @param orderId Order is that contains layout order to execute.
 * @param executor User who will execute order.
 */
export const takeLayoutOrderOnExecute = (layoutOrderId: number, orderId: number, executor: ExecutorType) => async (dispatch: Dispatch) => {
    try {
        await ordersAPI.takeOnExecute(orderId, layoutOrderId)
        dispatch(setExecutor(layoutOrderId, orderId, executor))
    }
    catch (error) {
        message.error("Не удалось взять заказ на разработку, попробуйте еще раз", 3)
    }
    message.success("Вы успешно стали исполнителем!")
}

export const getAddressesByCityName = (city: string) => async (dispatch: Dispatch) => {
    const {data} = await ordersAPI.getAddresses(city)
    dispatch(setAddresses(data))
}

export const getCitiesByNamePrefix = (prefix: string) => async (dispatch: Dispatch) => {
    const {data: {data}} = await citiesDbAPI.getCitiesByNamePrefix(prefix)
    dispatch(setCities(data.map((item: ResponseCityType) => item.city)))
}

/**
 * Returns company orders.
 * @param pageNumber Page number.
 * @param pageSize Page size.
 */
export const getCompanyOrders = (pageNumber: number, pageSize: number) => async (dispatch: Dispatch) => {
    const response = await ordersAPI.getOrders(pageNumber, pageSize)
    dispatch(setOrders(response.data.content, response.data.total))
}

/**
 * Returns all orders.
 * @param pageNumber Page number.
 * @param pageSize Page size.
 */
export const getAllOrders = (pageNumber: number, pageSize: number) => async (dispatch: Dispatch) => {
    const response = await ordersAPI.getAllOrders(pageNumber, pageSize)
    dispatch(setOrders(response.data.content, response.data.total))
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
                        address: layout.building.address,
                        complexId: null,
                        complex: layout.building.complex,
                        description: layout.building.description
                    }
                }
            } else {
                return {
                    ...layout,
                    buildingId: null,
                    building: {
                        address: layout.building.address,
                        complex: null,
                        complexId: layout.building.complexId === -1 ? null : layout.building.complexId,
                        description: layout.building.description
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
    try {
        await ordersAPI.sendNewOrder({
            order: {
                orderDescription,
                deadline,
                layouts: layoutsReadyForSending
            }
        })

        dispatch(resetCities())
        dispatch(resetAddresses())

        await getCompanyOrders(1, 10)(dispatch)
    } catch (e) {
        message.error('При отправке заказа что-то пошло не так.')
    }
}

const sendOrderFiles = async (files: Array<File> | undefined) => {

    if (!files) return []

    const fileIds: Array<number> = []

    for (const file of files) {
        let formData = new FormData()
        formData.append('image', file)

        const {data} = await ordersAPI.sendNewOrderFile(formData)
        fileIds.push(data)
    }

    return fileIds
}

export default ordersReducer
