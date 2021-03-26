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

    handleSubmit = () => {
        const {formik: {values}, layoutIndex} = this.props

        this.props.addAddress({
            city: values.layouts[layoutIndex].building.address.city,
            street: values.layouts[layoutIndex].building.address.street,
            house: values.layouts[layoutIndex].building.address.house,
            complexId: values.layouts[layoutIndex].building.complexId,
            complexName: values.layouts[layoutIndex].building.complex.name
        })
    }

    render() {
        return <NewBuildingForm
            cities={this.props.cities}
            complexes={this.props.complexes}
            streets={this.props.streets}
            layoutIndex={this.props.layoutIndex}
            getAddresses={this.props.getAddressesByCityName}
            handleSubmit={this.handleSubmit}
            {...this.props}
        />
    }
}

export default compose(
    connect(mapStateToProps, {getAddressesByCityName, addAddress})
)(formikConnect(NewBuildingFormContainer))
