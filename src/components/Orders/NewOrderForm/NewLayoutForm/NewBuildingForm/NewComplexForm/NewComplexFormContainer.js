import React, {useState} from 'react'
import {connect} from 'react-redux'
import NewComplexForm from './NewComplexForm'
import {useFormik} from 'formik'
import {addComplex} from '../../../../../../redux/reducers/ordersReducer'
import * as yup from 'yup'
import {compose} from 'redux'

const NewComplexFormContainer = (props) => {
    const [visible, setVisible] = useState(false)

    const complexSchema = yup.object().shape({
        name: yup.string().required('Это поле обязательно для заполнения.'),
        description: yup.string().required('Это поле обязательно для заполнения.')
    })

    const complexFormik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        onSubmit: values => {
            props.addComplex({
                city: props.formik.values.layouts[props.layoutIndex].city,
                complexName: values.name,
                complexDescription: values.description
            })

            props.setComplex(values.name)

            complexFormik.resetForm()

            setVisible(false)
        },
        validationSchema: complexSchema,
        validateOnChange: false
    })

    return <NewComplexForm
        formik={complexFormik}
        layoutIndex={props.layoutIndex}
        visible={visible}
        onOpen={() => setVisible(true)}
        onClose={() => setVisible(false)}
    />
}

export default compose(
    connect(null, {addComplex})
)(NewComplexFormContainer)
