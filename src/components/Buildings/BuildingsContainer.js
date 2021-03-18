import React from 'react'
import {connect} from 'react-redux'
import Buildings from './Buildings'
import {getFinishedBuildings} from '../../utils/selectors/selectors'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {getCompletedCompanyBuildings} from '../../redux/reducers/buildingsReducer'

const mapStateToProps = (state) => ({
    buildings: getFinishedBuildings(state)
})

class BuildingsContainer extends React.PureComponent {
    componentWillMount() {
        this.props.getCompletedCompanyBuildings()
    }

    render() {
        return <Buildings buildings={this.props.buildings}/>
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getCompletedCompanyBuildings})
)(BuildingsContainer)
