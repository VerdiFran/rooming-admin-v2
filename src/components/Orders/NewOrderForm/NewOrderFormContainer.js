import React from 'react'
import {connect} from 'react-redux'
import {getBuildings} from '../../../utils/selectors/selectors'
import NewOrderForm from './NewOrderForm'
import {addNewOrder} from '../../../redux/reducers/ordersReducer'
import {ordersAPI} from '../../../api/ordersAPI'

const mapStateToProps = (state) => ({
    buildings: getBuildings(state)
})

const NewOrderFormContainer = (props) => {

    const sendOrderFiles = (files) => {
        const fileIds = []

        files.forEach((file, index) => {
            const fileReader = new FileReader()

            fileReader.onload = async function (event) {
                let formData = new FormData()
                formData.append('image', file)

                const response = await ordersAPI.sendNewOrderFile(formData)
                fileIds.push(response.data.id)
            }

            fileReader.readAsText(file, 'Windows-1251')
        })

        return fileIds
    }

    return <NewOrderForm
        addNewOrder={props.addNewOrder}
        sendOrderFiles={sendOrderFiles}
        {...props}
    />
}

export default connect(mapStateToProps, {addNewOrder})(NewOrderFormContainer)
