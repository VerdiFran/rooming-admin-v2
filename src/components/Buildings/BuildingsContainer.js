import React from 'react'
import {connect} from 'react-redux'
import Buildings from './Buildings'
import {getFinishedBuildings} from '../../utils/selectors/selectors'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'

const mapStateToProps = (state) => ({
    buildings: getFinishedBuildings(state)
})

class BuildingsContainer extends React.PureComponent {
    componentWillMount() {
        this.props.getFinishedCompanyBuildings()
    }

    render() {
        return <Buildings {...this.props}/>
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {})
)(BuildingsContainer)
