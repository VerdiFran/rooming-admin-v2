import React, {useEffect, useState} from 'react'
import {getOrdersData, getUserRole} from '../../utils/selectors/selectors'
import {compose} from 'redux'
import {connect} from 'react-redux'
import OrdersForDeveloper from './OrdersForDeveloper'
import {DEVELOPER, EMPLOYEE} from '../../redux/userRoles'
import {Redirect} from 'react-router-dom'
import OrdersForEmployee from './OrdersForEmployee'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {getAllOrders, getCompanyAddresses, getCompanyOrders} from '../../redux/reducers/ordersReducer'

const mapStateToProps = (state) => ({
    ordersData: getOrdersData(state),
    userRole: getUserRole(state)
})


class OrdersContainer extends React.PureComponent {

    componentWillMount() {
        if (this.props.userRole.includes(DEVELOPER)) {
            this.props.getAllOrders()
        } else {
            this.props.getCompanyOrders()
        }
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
                getCompanyAddresses={this.props.getCompanyAddresses}
            />
        } else {
            return <Redirect to="/login"/>
        }
    }

    /*switch (props.userRole) {
        case DEVELOPER:
            return <OrdersForDeveloper
                ordersData={props.ordersData}
                filteredInfo={filteredInfo}
                sortedInfo={sortedInfo}
                clearAll={clearAll}
                clearFilters={clearFilters}
                handleChange={handleChange}
            />
        case EMPLOYEE:
            return <OrdersForEmployee
                ordersData={props.ordersData}
                filteredInfo={filteredInfo}
                sortedInfo={sortedInfo}
                clearAll={clearAll}
                clearFilters={clearFilters}
                handleChange={handleChange}
            />
        default:
            return <Redirect to="/login"/>
    }*/
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getCompanyAddresses, getCompanyOrders, getAllOrders})
)(OrdersContainer)
