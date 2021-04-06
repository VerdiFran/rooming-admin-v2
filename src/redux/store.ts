import {applyMiddleware, combineReducers, createStore} from 'redux'
import authReducer from './reducers/authReducer'
import thunk from 'redux-thunk'
import appReducer from './reducers/appReducer'
import ordersReducer from './reducers/ordersReducer'
import layoutsReducer from './reducers/buildingsReducer'
import companiesReducer from './reducers/companiesReducer'
import addRequestsReducer from './reducers/addRequestsReducer'

const reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    orders: ordersReducer,
    layouts: layoutsReducer,
    companies: companiesReducer,
    addRequests: addRequestsReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
