import React from 'react'
import {getOrdersData, getUserRoles} from '../../utils/selectors/selectors'
import {compose} from 'redux'
import {connect} from 'react-redux'
import OrdersForDeveloper from './OrdersForDeveloper'
import {DEVELOPER, EMPLOYEE} from '../../redux/userRoles'
import {Redirect} from 'react-router-dom'
import OrdersForEmployee from './OrdersForEmployee'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {getAllOrders, getCompanyOrders, setCurrentLayoutIds} from '../../redux/reducers/ordersReducer'

const mapStateToProps = (state) => ({
    ordersData: getOrdersData(state),
    userRoles: getUserRoles(state)
})

class OrdersContainer extends React.PureComponent {

    componentWillMount() {
        if (this.props.userRoles.includes(DEVELOPER)) {
            this.props.getAllOrders()
        } else {
            this.props.getCompanyOrders()
        }
    }

    render() {
        if (this.props.userRoles.includes(DEVELOPER)) {
            return <OrdersForDeveloper
                ordersData={this.props.ordersData}
                handleChange={() => {}}
                setCurrentLayoutIds={this.props.setCurrentLayoutIds}
            />
        } else if (this.props.userRoles.includes(EMPLOYEE)) {
            return <OrdersForEmployee
                ordersData={this.props.ordersData}
                handleChange={() => {}}
            />
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getCompanyOrders, getAllOrders, setCurrentLayoutIds})
)(OrdersContainer)
