import {compose} from 'redux'
import {ADMIN, DEVELOPER, EMPLOYEE} from '../../redux/userRoles'
import SideMenuPanelForAdmin from './SideMenuPanelForAdmin'
import {connect} from 'react-redux'
import {getUserRoles} from '../../utils/selectors/selectors'
import React from 'react'
import SideMenuPanelForDeveloper from './SideMenuPanelForDeveloper'
import SideMenuPanelForEmployee from './SideMenuPanelForEmployee'
import {Redirect} from 'react-router-dom'

const mapStateToProps = (state) => ({
    userRoles: getUserRoles(state)
})

const SideMenuPanelContainer = ({userRoles}) => {
    if (userRoles.includes(DEVELOPER)) {
        return <SideMenuPanelForDeveloper/>
    } else if (userRoles.includes(EMPLOYEE)) {
        return <SideMenuPanelForEmployee/>
    } else if (userRoles.includes(ADMIN)) {
        return <SideMenuPanelForAdmin/>
    } else {
        return <Redirect to="/login"/>
    }
}

export default compose(
    connect(mapStateToProps)
)(SideMenuPanelContainer)
