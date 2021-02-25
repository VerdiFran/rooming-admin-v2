import React from 'react'
import {connect} from 'react-redux'
import NewBuildingForm from './NewBuildingForm'
import {addAddress, getAddressesByCityName} from '../../../../../redux/reducers/ordersReducer'
import {getCities, getComplexes, getStreets} from '../../../../../utils/selectors/selectors'
import {compose} from 'redux'
import {connect as formikConnect} from 'formik'

const mapStateToProps = (state) => ({
    cities: getCities(state),
    complexes: getComplexes(state),
    streets: getStreets(state)
})

class NewBuildingFormContainer extends React.Component {

    /*handleSubmit() {
        const layoutValues = this.props.formik.values.layouts[this.props.layoutIndex]

        this.props.addAddress({
            city: layoutValues.building.address.city,
            street: layoutValues.building.address.street,
            house: layoutValues.building.address.house,
            buildingId: layoutValues.buildingId,
            complexId: layoutValues.building.complexId,
            complexName: layoutValues.building.complex.name
        })
    }*/

    render() {
        return <NewBuildingForm
            layoutIndex={this.props.layoutIndex}
            cities={this.props.cities}
            complexes={this.props.complexes}
            streets={this.props.streets}
            getAddresses={this.props.getAddressesByCityName}
            handleSubmit={this.props.addAddress}
            {...this.props}
        />
    }
}

export default compose(
    connect(mapStateToProps, {getAddressesByCityName, addAddress})
)(formikConnect(NewBuildingFormContainer))
