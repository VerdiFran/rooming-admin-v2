import React, {useState} from 'react'
import {UserOutlined} from '@ant-design/icons'
import {renderDatepicker, renderFileUploader, renderInput, renderTextarea} from '../../common/FormControls/FormControls'
import {required} from '../../../utils/validators/validators'
import {Divider, Typography, Button, Space, Form} from 'antd'
import NewLayoutReduxForm from './NewLayoutForm/NewLayoutForm'
import NewLayoutFormContainer from './NewLayoutForm/NewLayoutFormContainer'
import {IdGenerator} from '../../../utils/generators/generators'
import {PlusSquareOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import NewOrderReduxForm from './NewOrderForm'
import {addNewOrder, sendNewCompanyOrder} from '../../../redux/reducers/ordersReducer'
import {ordersAPI} from '../../../api/ordersAPI'
import {getBuildings, getComplexes} from '../../../utils/selectors/selectors'
import {useFormik} from 'formik'
import NewOrderForm from './NewOrderForm'

const ordersIdIterator = IdGenerator()

const mapStateToProps = (state) => ({
    /*formData: {
        orderFormData: getFormValues('newOrderForm')(state),
        buildingsFormData: getFormValues('newBuildingForm')(state),
        complexesFormData: getFormValues('newComplexForm')(state)
    },*/
    buildings: getBuildings(state),
    complexes: getComplexes(state)
})

const NewOrderFormContainer = (props) => {
    /*const formik = useFormik({
        initialValues: {

        },
        onSubmit: values => alert(JSON.stringify(values, null, 2))
    })*/

    //console.log(props.buildingsFormData)

    /*const handleSubmit = () => {
        formik.handleSubmit()

        console.log(formik.values)
    }*/

    return <NewOrderForm
        {...props}
    />
}

export default connect(mapStateToProps, {addNewOrder, sendNewCompanyOrder})(NewOrderFormContainer)
