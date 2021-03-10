import {connect} from 'react-redux'
import OrderFulfillmentForDeveloper from './OrderFulfillmentForDeveloper'
import React from 'react'
import {ordersAPI} from '../../../api/ordersAPI'
import {getLayoutsInfo} from '../../../utils/selectors/selectors'

const mapStateToProps = (state) => ({
    layoutsInfo: getLayoutsInfo(state)
})

const OrderFulfillmentContainer = (props) => {

    const handleSubmit = (layoutId, files) => {
        files.forEach((file, index) => {
            const fileReader = new FileReader()

            fileReader.onload = async function (event) {
                let formData = new FormData()

                const text = event.target.result
                formData.append('file', file)

                await ordersAPI.sendModelFiles(layoutId, formData)
                props.getAllOrders()
            }

            fileReader.readAsText(file, 'Windows-1251')
        })
    }

    return <OrderFulfillmentForDeveloper
        handleSubmit={handleSubmit}
        {...props}
    />
}

export default connect(mapStateToProps, {/*getAllOrders*/})(OrderFulfillmentContainer)
