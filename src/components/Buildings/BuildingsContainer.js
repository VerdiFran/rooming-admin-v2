import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Buildings from './Buildings'
import {getFinishedBuildings, getTotalPages, getUserRoles} from '../../utils/selectors/selectors'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { getBuildingsWithCompletedLayouts, getBoundBuildings, setSelectedLayoutId } from '../../redux/reducers/buildingsReducer'
import {USER} from '../../redux/userRoles'

const mapStateToProps = (state) => ({
    userRoles: getUserRoles(state),
    buildings: getFinishedBuildings(state),
    totalPages: getTotalPages(state)
})

const BuildingsContainer = (props) => {

    const [pageSize] = React.useState(10)
    const [currentPage, setCurrentPage] = React.useState(1)

    useEffect(() => {
        if (props.userRoles.includes(USER)){
            props.getBoundBuildings(currentPage, pageSize)
        } else {
            props.getBuildingsWithCompletedLayouts(currentPage, pageSize)
        }
    }, [currentPage])

    return <Buildings
        buildings={props.buildings}
        totalPages={props.totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setSelectedLayoutId={props.setSelectedLayoutId}
    />

}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { getBuildingsWithCompletedLayouts, getBoundBuildings, setSelectedLayoutId })
)(BuildingsContainer)
