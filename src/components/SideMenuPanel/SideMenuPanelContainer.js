import {compose} from 'redux'
import {ADMIN, DEVELOPER, EMPLOYEE, USER} from '../../redux/userRoles'
import SideMenuPanelForAdmin from './SideMenuPanelForAdmin'
import {connect} from 'react-redux'
import {getUserRoles} from '../../utils/selectors/selectors'
import React from 'react'
import SideMenuPanelForDeveloper from './SideMenuPanelForDeveloper'
import SideMenuPanelForEmployee from './SideMenuPanelForEmployee'
import SideMenuPanelForUser from './SideMenuPanelForUser'
import {Redirect} from 'react-router-dom'
import OrdersForDeveloper from '../Orders/OrdersForDeveloper'
import OrdersForEmployee from '../Orders/OrdersForEmployee'

const mapStateToProps = (state) => ({
    userRole: getUserRoles(state)
})

const SideMenuPanelContainer = ({userRole}) => {
    if (userRole.includes(DEVELOPER)) {
        return <SideMenuPanelForDeveloper/>
    } else if (userRole.includes(EMPLOYEE)) {
        return <SideMenuPanelForEmployee/>
    } else {
        return <Redirect to="/login"/>
    }

    /*switch (userRole) {
        case ADMIN:
            return <SideMenuPanelForAdmin/>
        case DEVELOPER:
            return <SideMenuPanelForDeveloper/>
        case EMPLOYEE:
            return <SideMenuPanelForEmployee/>
        case USER:
            return <SideMenuPanelForUser/>
        default:
            return <Redirect to="/login"/>
    }*/
}

export default compose(
    connect(mapStateToProps)
)(SideMenuPanelContainer)
