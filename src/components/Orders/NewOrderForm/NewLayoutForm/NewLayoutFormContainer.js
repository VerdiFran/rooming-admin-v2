import React from 'react'
import {getAddresses, getCities} from '../../../../utils/selectors/selectors'
import {connect} from 'react-redux'
import throttle from 'lodash.throttle'
import NewLayoutForm from './NewLayoutForm'
import {getAddressesByCityName, getCitiesByNamePrefix} from '../../../../redux/reducers/ordersReducer'
import {connect as formikConnect} from 'formik'

const mapStateToProps = (state) => ({
    cities: getCities(state),
    addresses: getAddresses(state)
})

class NewLayoutFormContainer extends React.PureComponent {
    render() {
        return <NewLayoutForm
            layoutIndex={this.props.layoutIndex}
            cities={this.props.cities}
            addresses={this.props.addresses}
            getAddresses={this.props.getAddressesByCityName}
            getCitiesByNamePrefix={this.props.getCitiesByNamePrefix}
            {...this.props}
        />
    }
}

export default connect(
    mapStateToProps,
    {getAddressesByCityName, getCitiesByNamePrefix}
)(formikConnect(NewLayoutFormContainer))
