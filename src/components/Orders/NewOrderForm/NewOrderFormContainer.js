import React from 'react'
import {connect} from 'react-redux'
import {getBuildings, getNewComplexes} from '../../../utils/selectors/selectors'
import NewOrderForm from './NewOrderForm'
import {addNewOrder, getAddressesByCityName} from '../../../redux/reducers/ordersReducer'
import {useFormik} from 'formik'
import * as yup from 'yup'

const mapStateToProps = (state) => ({
    buildings: getBuildings(state),
    complexes: getNewComplexes(state)
})

const NewOrderFormContainer = (props) => {
    const newOrderSchema = yup.object().shape({
        orderDescription: yup.string().required('Это поле обязательно для заполнения.'),
        deadline: yup.date().min(new Date(), 'Крайний срок должен быть позже текущего времени')
            .required('Это поле обязательно для заполнения.')
            .typeError('Это поле обязательно для заполнения.'),
        layouts: yup.array().of(yup.object().shape({
            description: yup.string().required('Это поле обязательно для заполнения.'),
            city: yup.string().required('Это поле обязательно для заполнения.'),
            building: yup.object().shape({
                addressOption: yup.array()
                    .of(yup.mixed().required('Это поле обязательно для заполнения.'))
                    .length(3, 'Это поле обязательно для заполнения.'),
                address: yup.object().shape({
                    city: yup.string().required('Это поле обязательно для заполнения.'),
                    street: yup.string().required('Это поле обязательно для заполнения.'),
                    house: yup.string().required('Это поле обязательно для заполнения.')
                })
            })
        }))
    })

    const handleSubmit = async (values = formik.values) => {
        const order = {
            ...values,
            layouts: values.layouts.map(layout => ({
                ...layout,
                building: {
                    ...layout.building,
                    address: {
                        city: layout.city,
                        street: props.buildings[layout.city]
                            ?.find(building => building?.street === layout.building.addressOption[1])?.street || null,
                        house: props.buildings[layout.city]
                            ?.find(building => building.buildingId === layout.building.addressOption[2])?.house || null
                    },
                    complex: {
                        name: props.complexes[layout.city]
                            ?.find(complex => complex.complexId === layout.building.complexId)?.complexName || null,
                        description: props.complexes[layout.city]
                            ?.find(complex => complex.complexId === layout.building.complexId)?.complexDescription || null
                    },
                    description: props.buildings[layout.city]
                        ?.find(building => building.buildingId === layout.buildingId)?.description || null
                }

            }))
        }

        await props.addNewOrder(order)

        formik.resetForm()
    }

    const formik = useFormik({
        initialValues: {
            orderDescription: '',
            deadline: null,
            layouts: [
                {
                    description: '',
                    buildingId: null,
                    city: '',
                    building: {
                        description: '',
                        addressOption: [],
                        address: {
                            city: '',
                            street: '',
                            house: ''
                        },
                        complexId: null,
                        complex: {
                            name: '',
                            description: ''
                        }
                    },
                    files: [],
                    resources: []
                }
            ]
        },
        onSubmit: handleSubmit,
        validateOnChange: false,
        validationSchema: newOrderSchema
    })

    return <NewOrderForm
        formik={formik}
        visible={props.visible}
        handleSubmit={handleSubmit}
        onClose={props.onClose}
    />
}

export default connect(
    mapStateToProps,
    {addNewOrder, getAddressesByCityName}
)(NewOrderFormContainer)
