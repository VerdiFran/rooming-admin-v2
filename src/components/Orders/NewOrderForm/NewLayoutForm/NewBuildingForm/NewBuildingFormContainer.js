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

    const [visible, setVisible] = useState(false)

    const buildingSchema = yup.object().shape({
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
        onSubmit: async (values) => {
            const address = {
                city: formik.values.layouts[layoutIndex].city,
                street: values.street,
                house: values.house,
                complexId: values.complexId || -1,
                complexName: values.complexName.length ? values.complexName : 'Отдельные здания',
                description: values.buildingDescription
            }

            await addAddress(address)

            setAutoCompletedAddress([address.complexId, address.street, address.house])

            buildingFormik.resetForm()

            setVisible(false)

            setCityComplexes([])
            setComplexStreets([])
        },
        validationSchema: buildingSchema,
        validateOnChange: false
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

    return <NewBuildingForm
        cityIsSelected={cityIsSelected}
        buildingFormik={buildingFormik}
        cities={cities}
        complexes={cityComplexes}
        streets={complexStreets}
        layoutIndex={layoutIndex}
        getAddresses={getAddressesByCityName}
        formik={formik}
        visible={visible}
        onOpen={() => setVisible(true)}
        onClose={() => setVisible(false)}
    />
}

export default compose(
    connect(mapStateToProps, {getAddressesByCityName, addAddress}),
    formikConnect
)(NewBuildingFormContainer)
