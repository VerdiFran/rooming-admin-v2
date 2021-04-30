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
        cityIsSelected,
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
        setCityComplexes(complexesByCity)
    }, [complexes])

    const [complexStreets, setComplexStreets] = useState([])

    useEffect(() => {
        setComplexStreets(streets)
    }, [streets])

    const handleSubmit = async (values = buildingFormik.values) => {
        const address = {
            city: formik.values.layouts[layoutIndex].city,
            street: values.street,
            house: values.house,
            complexId: values.complexId || -1,
            complexName: values.complexName.length ? values.complexName : 'Отдельные здания',
            description: values.description
        }

        await addAddress(address)

        buildingFormik.resetForm()

        setCityComplexes([])
        setComplexStreets([])
    }

    return <NewBuildingForm
        cityIsSelected={cityIsSelected}
        buildingFormik={buildingFormik}
        cities={cities}
        complexes={cityComplexes}
        streets={complexStreets}
        layoutIndex={layoutIndex}
        getAddresses={getAddressesByCityName}
        handleSubmit={handleSubmit}
    />
}

export default compose(
    connect(mapStateToProps, {getAddressesByCityName, addAddress}),
    formikConnect
)(NewBuildingFormContainer)
