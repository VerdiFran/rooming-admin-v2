import {ordersAPI} from '../../api/ordersAPI'
import {IdGenerator} from '../../utils/generators/generators'

const ADD_BUILDING_ADDRESS = 'ADD-BUILDING-OPTION'
const ADD_COMPLEX = 'ADD-COMPLEX'
const ADD_NEW_ORDER = 'ADD-NEW-ORDER'
const TOGGLE_ORDER_IS_CREATING = 'TOGGLE-ORDER-IS-CREATING'
const SET_ADDRESSES = 'SET-ADDRESSES'
const SET_ORDERS = 'SET-ORDERS'
const SET_LAYOUT_IS_COMPLITED = 'SET-LAYOUT-IS-COMPLETED'

const buildingsIdIterator = IdGenerator()

const initialState = {
    orders: [],
    addresses: {
        cities: [],
        buildings: [],
        complexes: []
    },
    orderIsCreating: false
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUILDING_ADDRESS:
            let complex = state.addresses.complexes.filter(complex => +complex.id === +action.buildingInfo.complexId)
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    buildings: [
                        ...state.addresses.buildings,
                        {
                            complexId: action.buildingInfo.complexId,
                            complexName: complex.length > 0 ? complex[0].label : 'Отдельные здания',
                            id: buildingsIdIterator.next().value,
                            address: action.buildingInfo.address
                        }
                    ]
                }
            }
        case ADD_COMPLEX:
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    complexes: [
                        ...state.addresses.complexes,
                        {...action.complexInfo}
                    ]
                }
            }
        case ADD_NEW_ORDER:
            return {
                ...state,
                orders: [
                    ...state.orders,
                    action.order
                ]
            }
        case TOGGLE_ORDER_IS_CREATING:
            return {
                ...state,
                orderIsCreating: action.isCreating
            }
        case SET_ADDRESSES:
            return {
                ...state,
                addresses: action.addresses
            }
        case SET_ORDERS:
            return  {
                ...state,
                orders: action.orders
            }

        default:
            return state
    }
}

export const addBuildingOption = (buildingInfo) => ({type: ADD_BUILDING_ADDRESS, buildingInfo})
export const addComplexOption = (complexInfo) => ({type: ADD_COMPLEX, complexInfo})
export const addNewOrder = (order) => ({type: ADD_NEW_ORDER, order})
export const toggleOrderIsCreating = (isCreating) => ({type: TOGGLE_ORDER_IS_CREATING, isCreating})
export const setAddresses = (addresses) => ({type: SET_ADDRESSES, addresses})
export const setOrders = (orders) => ({type: SET_ORDERS, orders})

export const sendNewCompanyOrder = (order) => (dispatch) => {
    console.log(order)
    dispatch(addNewOrder({order: order}))
    ordersAPI.sendNewOrder({order: order})
    //dispatch(reset('newOrderForm'))
    dispatch(toggleOrderIsCreating(false))
}

export const getCompanyAddresses = () => async (dispatch) => {
    dispatch(toggleOrderIsCreating(true))
    const response = await ordersAPI.getAddresses()
    dispatch(setAddresses({...response.data}))
}

export const getCompanyOrders = () => async (dispatch) => {
    const response = await ordersAPI.getOrders()
    dispatch(setOrders([...response.data]))
}

export const getAllOrders = () => async (dispatch) => {
    const response = await ordersAPI.getAllOrders()
    dispatch(setOrders([...response.data]))
}

export default ordersReducer
