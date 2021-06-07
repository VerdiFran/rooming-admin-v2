import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import NewBuildingForm from './NewBuildingForm'
import {addAddress, getAddressesByCityName} from '../../../../../redux/reducers/ordersReducer'
import {getCities, getComplexesOptions, getStreets} from '../../../../../utils/selectors/selectors'
import {compose} from 'redux'
import {connect as formikConnect, useFormik} from 'formik'
import * as yup from 'yup'

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
        addAddress,
        setAutoCompletedAddress
    } = props

    const buildingSchema = yup.object().shape({
        city: yup.string().required('Это поле обязательно для заполнения.'),
        street: yup.string().required('Это поле обязательно для заполнения.'),
        house: yup.string().required('Это поле обязательно для заполнения.'),
        buildingDescription: yup.string().required('Это поле обязательно для заполнения.')
    })

    const buildingFormik = useFormik({
        initialValues: {
            buildingDescription: '',
            city: '',
            street: '',
            house: '',
            complexId: null,
            complexName: ''
        },
        validationSchema: buildingSchema
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

        setAutoCompletedAddress([address.complexId, address.street, address.house])

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
        formik={formik}
    />
}

export default compose(
    connect(mapStateToProps, {getAddressesByCityName, addAddress}),
    formikConnect
)(NewBuildingFormContainer)
