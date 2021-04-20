import React from 'react'
import {connect} from 'react-redux'
import {getBuildings, getComplexes} from '../../../utils/selectors/selectors'
import NewOrderForm from './NewOrderForm'
import {addNewOrder} from '../../../redux/reducers/ordersReducer'
import {useFormik} from 'formik'

const mapStateToProps = (state) => ({
    buildings: getBuildings(state),
    complexes: getComplexes(state)
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
                        address: [],
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

    const handleSubmit = (values = formik.values) => {
        const order = {
            ...values,
            layouts: values.layouts.map(layout => ({
                ...layout,
                building: {
                    ...layout.building,
                    address: {
                        city: layout.city,
                        street: props.buildings.find(building => building.street === layout.building.address[1]).street,
                        house: props.buildings.find(building => building.buildingId === layout.building.address[2]).house
                    },
                    complex: {
                        name: props.complexes.find(complex => complex.complexId === layout.building.complexId)?.complexName,
                        description: props.complexes.find(complex => complex.complexId === layout.building.complexId)?.complexDescription
                    },
                    description: props.buildings.find(building => building.buildingId === layout.buildingId)?.description || ""
                }
            }))
        }

        props.addNewOrder(order)
    }

    return <NewOrderForm
        formik={formik}
        handleSubmit={handleSubmit}
        {...props}
    />
}

export default connect(mapStateToProps, {addNewOrder})(NewOrderFormContainer)
