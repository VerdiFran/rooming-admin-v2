import React, {useEffect, useState} from 'react'
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
    const {
        formik,
        cities,
        complexes,
        streets,
        layoutIndex,
        getAddressesByCityName,
        addAddress
    } = props

    const buildingFormik = useFormik({
        initialValues: {
            city: '',
            street: '',
            house: '',
            complexId: null,
            complexName: ''
        }
    })

    const [cityComplexes, setCityComplexes] = useState([])

    useEffect(() => {
        const complexesByCity = complexes[formik.values.layouts[layoutIndex].city]
        console.log(complexesByCity)
        setCityComplexes(complexesByCity)
    }, [complexes])

    const handleSubmit = (values = buildingFormik.values) => {
        const address = {
            city: formik.values.layouts[layoutIndex].city,
            street: values.street,
            house: values.house,
            complexId: values.complexId || -1,
            complexName: values.complexName.length ? values.complexName : 'Отдельные здания',
            description: values.description
        }

        addAddress(address)
    }

    return <NewBuildingForm
        buildingFormik={buildingFormik}
        cities={cities}
        complexes={cityComplexes}
        streets={streets}
        layoutIndex={layoutIndex}
        getAddresses={getAddressesByCityName}
        handleSubmit={handleSubmit}
    />
}

export default compose(
    connect(mapStateToProps, {getAddressesByCityName, addAddress}),
    formikConnect
)(NewBuildingFormContainer)
