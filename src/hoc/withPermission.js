import React from 'react'
import {connect} from 'react-redux'
import {getUserRole} from '../utils/selectors/selectors'
import {Redirect} from 'react-router-dom'

const mapStateToPropsForPermission = (state) => ({
    userRole: getUserRole(state)
})

export const withPermission = (Component) => {

    class PermissionComponent extends React.Component {
        render() {
            if (this.props.userRole === this.props.permittedRole) return <Component {...this.props}/>

            return <Redirect to="/login"/>
        }
    }

    return connect(mapStateToPropsForPermission)(PermissionComponent)
}
