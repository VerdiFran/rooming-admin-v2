import React from 'react'
import {connect} from 'react-redux'
import {getBuildings, getNewComplexes} from '../../../utils/selectors/selectors'
import NewOrderForm from './NewOrderForm'
import {addNewOrder, getAddressesByCityName} from '../../../redux/reducers/ordersReducer'
import {useFormik} from 'formik'

const mapStateToProps = (state) => ({
    buildings: getBuildings(state),
    complexes: getNewComplexes(state)
})

const NewOrderFormContainer = (props) => {
    const formik = useFormik({
        initialValues: {
            orderDescription: '',
            deadline: null,
            layouts: [
                {
                    description: '',
                    buildingId: null,
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
        validateOnChange: false
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

    return <NewOrderForm
        formik={formik}
        handleSubmit={handleSubmit}
        {...props}
    />
}

export default connect(
    mapStateToProps,
    {addNewOrder, getAddressesByCityName}
)(NewOrderFormContainer)
