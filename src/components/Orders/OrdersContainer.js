import React, {useEffect, useState} from 'react'
import {getLoggedUserInfo, getOrdersData, getTotalPagesOfOrders, getUserRoles} from '../../utils/selectors/selectors'
import {compose} from 'redux'
import {connect} from 'react-redux'
import OrdersForDeveloper from './OrdersForDeveloper'
import {DEVELOPER, EMPLOYEE} from '../../redux/userRoles'
import {Redirect} from 'react-router-dom'
import OrdersForEmployee from './OrdersForEmployee'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {
    getAllOrders,
    getCompanyOrders,
    setCurrentLayoutIds,
    takeLayoutOrderOnExecute
} from '../../redux/reducers/ordersReducer'

const mapStateToProps = (state) => ({
    ordersData: getOrdersData(state),
    userRoles: getUserRoles(state),
    totalPages: getTotalPagesOfOrders(state),
    getLoggedUser: () => getLoggedUserInfo(state)
})

/**
 * Component for orders presentation.
 * @param props Properties.
 */
const OrdersContainer = (props) => {

    const [pageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (props.userRoles.includes(DEVELOPER)) {
            props.getAllOrders(currentPage, pageSize)
        } else {
            props.getCompanyOrders(currentPage, pageSize)
        }
    }, [currentPage])

    if (props.userRoles.includes(DEVELOPER)) {
        return <OrdersForDeveloper
            ordersData={props.ordersData}
            handleChange={() => {
            }}
            setCurrentLayoutIds={props.setCurrentLayoutIds}
            takeLayoutOrderOnExecute={props.takeLayoutOrderOnExecute}
            getLoggedUser={props.getLoggedUser}
            setCurrentPage={setCurrentPage}
            totalPages={props.totalPages}
            pageSize={pageSize}
        />
    } else if (props.userRoles.includes(EMPLOYEE)) {
        return <OrdersForEmployee
            ordersData={props.ordersData}
            handleChange={() => {
            }}
            setCurrentPage={setCurrentPage}
            totalPages={props.totalPages}
            pageSize={pageSize}
        />
    } else {
        return <Redirect to="/login"/>
    }

}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getCompanyOrders, getAllOrders, setCurrentLayoutIds, takeLayoutOrderOnExecute})
)(OrdersContainer)
