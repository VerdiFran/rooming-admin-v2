import React, {useState} from 'react'
import {UserOutlined} from '@ant-design/icons'
import {renderDatepicker, renderFileUploader, renderInput, renderTextarea} from '../../common/FormControls/FormControls'
import {required} from '../../../utils/validators/validators'
import {Divider, Typography, Button, Space, Form} from 'antd'
import NewLayoutFormContainer from './NewLayoutForm/NewLayoutFormContainer'
import {IdGenerator} from '../../../utils/generators/generators'
import {PlusSquareOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {ordersAPI} from '../../../api/ordersAPI'
import {getBuildings} from '../../../utils/selectors/selectors'
import {useFormik} from 'formik'
import NewOrderForm from './NewOrderForm'

const ordersIdIterator = IdGenerator()

const mapStateToProps = (state) => ({
    buildings: getBuildings(state)
})

const NewOrderFormContainer = (props) => {

    return <NewOrderForm
        {...props}
    />
}

export default connect(mapStateToProps, {})(NewOrderFormContainer)
