import React from 'react'
import {connect} from 'react-redux'
import NewComplexForm from './NewComplexForm'
import {connect as formikConnect, useFormik} from 'formik'
import {addComplex} from '../../../../../../redux/reducers/ordersReducer'

function NewComplexFormContainer(props) {

    const complexFormik = useFormik({
        initialValues: {
            name: '',
            description: ''
        }
    })

    const handleSubmit = (values = complexFormik.values) => {
        props.addComplex({
            complexName: values.name,
            complexDescription: values.description
        })
    }

    return <NewComplexForm
        formik={complexFormik}
        layoutIndex={props.layoutIndex}
        addComplex={handleSubmit}
    />
}

export default connect(
    null, {addComplex}
)(formikConnect(NewComplexFormContainer))
