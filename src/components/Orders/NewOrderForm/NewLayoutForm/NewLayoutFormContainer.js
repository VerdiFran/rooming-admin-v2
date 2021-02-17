import React from 'react'
import {getAddresses, getCities, getCitiesByPrefix} from '../../../../utils/selectors/selectors'
import {connect} from 'react-redux'
import throttle from 'lodash.throttle'
import NewLayoutForm from './NewLayoutForm'
import {IdGenerator} from '../../../../utils/generators/generators'
import {getAddressesByCityName, getCitiesByNamePrefix} from '../../../../redux/reducers/ordersReducer'
import NewComplexForm from './NewBuildingForm/NewComplexForm/NewComplexForm'

const layoutIdIterator = IdGenerator()

const mapStateToProps = (state) => ({
    cities: getCities(state),
    addresses: getAddresses(state),
    citiesByNamePrefix: getCitiesByPrefix(state)
})

class NewLayoutFormContainer extends React.PureComponent {
    lId = layoutIdIterator.next().value

    render() {
        return <NewLayoutForm
            lId={this.lId}
            cities={this.props.citiesByNamePrefix}
            addresses = {this.props.addresses}
            getAddresses={this.props.getAddressesByCityName}
            getCitiesByNamePrefix={throttle(this.props.getCitiesByNamePrefix, 1000)}
        />
    }
}

export default connect(mapStateToProps, {getAddressesByCityName, getCitiesByNamePrefix})(NewLayoutFormContainer)
