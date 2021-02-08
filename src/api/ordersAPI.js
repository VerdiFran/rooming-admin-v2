import {instance} from './commonAPI'

export const ordersAPI = {
    sendNewOrder(order) {
        return instance.post('company/orders', order)
    },
    getAddresses() {
        return instance.get('addresses')
    },
    sendModelFiles(layoutId, formData) {
        return instance.post(`orders/layouts/${layoutId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    getOrders() {
        return instance.get('company/orders')
    },
    getAllOrders() {
        return instance.get('orders')
    }
}

