import React from 'react'
import {connect} from 'react-redux'
import {getBuildings} from '../../../utils/selectors/selectors'
import NewOrderForm from './NewOrderForm'
import {addNewOrder} from '../../../redux/reducers/ordersReducer'
import {ordersAPI} from '../../../api/ordersAPI'

const mapStateToProps = (state) => ({
    buildings: getBuildings(state)
})

const NewOrderFormContainer = (props) => {

    return <NewOrderForm
        addNewOrder={addNewOrder}
        {...props}
    />
}

export default connect(mapStateToProps, {addNewOrder})(NewOrderFormContainer)
