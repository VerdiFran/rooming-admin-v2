import {applyMiddleware, combineReducers, createStore} from 'redux'
import authReducer from './reducers/authReducer'
import thunk from 'redux-thunk'
import appReducer from './reducers/appReducer'
import ordersReducer from './reducers/ordersReducer'
import buildingsReducer from './reducers/buildingsReducer'
import companiesReducer from './reducers/companiesReducer'
import addRequestsReducer from './reducers/addRequestsReducer'
import sessionsReducer from "./reducers/sessionsReducer";
import usersReducer from './reducers/usersReducer'

const reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    orders: ordersReducer,
    buildings: buildingsReducer,
    companies: companiesReducer,
    addRequests: addRequestsReducer,
    users: usersReducer,
    sessions: sessionsReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
