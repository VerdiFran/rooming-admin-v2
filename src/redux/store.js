import {applyMiddleware, combineReducers, createStore} from 'redux'
import authReducer from './reducers/authReducer'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk'
import appReducer from './reducers/appReducer'
import ordersReducer from './reducers/ordersReducer'
import buildingsReducer from './reducers/buildingsReducer'

const reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    orders: ordersReducer,
    buildings: buildingsReducer,
    form: formReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
