import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Buildings from './Buildings'
import { getFinishedBuildings, getTotalPages } from '../../utils/selectors/selectors'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { getBuildingsWithCompletedLayouts } from '../../redux/reducers/buildingsReducer'

const mapStateToProps = (state) => ({
    buildings: getFinishedBuildings(state),
    totalPages: getTotalPages(state)
})

const BuildingsContainer = (props) => {

    const [pageSize] = React.useState(10)
    const [currentPage, setCurrentPage] = React.useState(1)

    useEffect(() => {
        props.getBuildingsWithCompletedLayouts(currentPage, pageSize)
    }, [currentPage])

    return <Buildings
        buildings={props.buildings}
        totalPages={props.totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
    />

}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { getBuildingsWithCompletedLayouts })
)(BuildingsContainer)
