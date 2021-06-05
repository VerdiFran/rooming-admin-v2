import {connect} from 'react-redux'
import OrderFulfillmentForDeveloper from './OrderFulfillmentForDeveloper'
import React, {useEffect, useState} from 'react'
import {ordersAPI} from '../../../api/ordersAPI'
import {getLayoutsInfo} from '../../../utils/selectors/selectors'
import {getAllOrders} from '../../../redux/reducers/ordersReducer'
import {message} from 'antd'

const mapStateToProps = (state) => ({
    layoutsInfo: getLayoutsInfo(state)
})

const OrderFulfillmentContainer = (props) => {
    const [images, setImages] = useState([])

    const handleSubmit = (orderId, layoutId, files) => {
        files.forEach((file) => {
            const fileReader = new FileReader()

            fileReader.onload = async function () {
                let formData = new FormData()

                formData.append('model', file)

                try {
                    await ordersAPI.sendModelFiles(orderId, layoutId, formData)
                    message.success('Заказ выполнен!')
                } catch (error) {
                    message.error('Что-то пощло не так, не удалось выполнить заказ')
                }
                props.getAllOrders()
            }

            fileReader.readAsText(file, 'Windows-1251')
        })
    }

    useEffect(() => {
        props.layoutsInfo.forEach(layout => {
            const layoutOrderImagesDownloading = layout.resources.map(resource =>
                ordersAPI.getLayoutOrderImage(resource.id)
            )

            Promise.all(layoutOrderImagesDownloading)
                .then(responses => {
                    const dataImages = responses.map(response => response.data)
                    setImages(prev => [...prev, {layoutId: layout.id, resources: dataImages}])
                })
        })
    }, [props.layoutsInfo])

    return <OrderFulfillmentForDeveloper
        handleSubmit={handleSubmit}
        images={images}
        {...props}
    />
}

export default connect(mapStateToProps, {getAllOrders})(OrderFulfillmentContainer)
