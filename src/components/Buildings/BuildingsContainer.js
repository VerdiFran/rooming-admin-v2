import React from 'react'
import {connect} from 'react-redux'
import Buildings from './Buildings'
import {getFinishedBuildings, getTotalPages} from '../../utils/selectors/selectors'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {getBuildingsWithCompletedLayouts} from '../../redux/reducers/buildingsReducer'

const mapStateToProps = (state) => ({
    buildings: getFinishedBuildings(state),
    totalPages: getTotalPages(state)
})

class BuildingsContainer extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            pageSize: 10
        }
    }

    componentWillMount() {
        this.props.getBuildingsWithCompletedLayouts(1, this.state.pageSize)
    }

    render() {
        return <Buildings buildings={this.props.buildings} 
            totalPages={this.props.totalPages}
            pageSize = {this.state.pageSize}
            getBuildingsWithCompletedLayouts={this.props.getBuildingsWithCompletedLayouts}/>
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getBuildingsWithCompletedLayouts: getBuildingsWithCompletedLayouts})
)(BuildingsContainer)
