import {instance} from './instances'

export const ordersAPI = {
    getAddresses(city) {
        return instance.get(`addresses?city=${city}`)
    },
    getOrders() {
        return instance.get(`company/orders?pageNumber=${1}&pageSize=${10}`)
    },
    getAllOrders() {
        return instance.get(`orders?pageNumber=${1}&pageSize=${10}`)
    },
    sendNewOrder(order) {
        return instance.post('company/orders', order)
    },
    sendNewOrderFile(formData) {
        return instance.post(`resources/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    sendModelFiles(orderId, layoutId, formData) {
        return instance.post(`orders/${orderId}/layouts/${layoutId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    /**
     * PUT request for set order executor.
     * @param orderId Id of order layout order from.
     * @param layoutId Layout order id.
     * @return Request promise.
     */
    takeOnExecute(orderId, layoutId) {
        return instance.put(`orders/${orderId}/layouts/${layoutId}/executor`)
    }
}

