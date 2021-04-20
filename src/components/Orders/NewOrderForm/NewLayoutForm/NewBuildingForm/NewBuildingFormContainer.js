import React from 'react'
import {connect} from 'react-redux'
import NewBuildingForm from './NewBuildingForm'
import {addAddress, getAddressesByCityName} from '../../../../../redux/reducers/ordersReducer'
import {getCities, getComplexesOptions, getStreets} from '../../../../../utils/selectors/selectors'
import {compose} from 'redux'
import {connect as formikConnect, useFormik} from 'formik'

const mapStateToProps = (state) => ({
    cities: getCities(state),
    complexes: getComplexesOptions(state),
    streets: getStreets(state)
})

const NewBuildingFormContainer = (props) => {
    const buildingFormik = useFormik({
        initialValues: {
            city: '',
            street: '',
            house: '',
            complexId: null,
            complexName: ''
        }
    })

    const handleSubmit = (values = buildingFormik.values) => {
        const {layoutIndex, formik} = props

        const address = {
            city: formik.values.layouts[layoutIndex].city,
            street: values.street,
            house: values.house,
            complexId: values.complexId,
            complexName: values.complexName,
            description: values.description
        }

        props.addAddress(address)
    }

    return <NewBuildingForm
        buildingFormik={buildingFormik}
        cities={props.cities}
        complexes={props.complexes}
        streets={props.streets}
        layoutIndex={props.layoutIndex}
        getAddresses={props.getAddressesByCityName}
        handleSubmit={handleSubmit}
        {...props}
    />
}

export default compose(
    connect(mapStateToProps, {getAddressesByCityName, addAddress}),
    formikConnect
)(NewBuildingFormContainer)
