import React, {useEffect, useState} from 'react'
import {getOrdersData, getUserRole} from '../../utils/selectors/selectors'
import {compose} from 'redux'
import {connect} from 'react-redux'
import OrdersForDeveloper from './OrdersForDeveloper'
import {DEVELOPER, EMPLOYEE} from '../../redux/userRoles'
import {Redirect} from 'react-router-dom'
import OrdersForEmployee from './OrdersForEmployee'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {getAllCities} from '../../redux/reducers/ordersReducer'

const mapStateToProps = (state) => ({
    /*ordersData: getOrdersData(state),*/
    ordersData: [],
    userRole: getUserRole(state)
})

class OrdersContainer extends React.PureComponent {

    componentWillMount() {
        /*if (this.props.userRole.includes(DEVELOPER)) {
            this.props.getAllOrders()
        } else {
            this.props.getCompanyOrders()
        }*/
    }

    render() {
        if (this.props.userRole.includes(DEVELOPER)) {
            return <OrdersForDeveloper
                ordersData={this.props.ordersData}
                handleChange={() => {}}
            />
        } else if (this.props.userRole.includes(EMPLOYEE)) {
            return <OrdersForEmployee
                ordersData={this.props.ordersData}
                handleChange={() => {}}
                getCities={this.props.getAllCities}
            />
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getAllCities})
)(OrdersContainer)
