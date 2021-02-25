import {instance} from './instances'

export const ordersAPI = {
    sendNewOrder(order) {
        return instance.post('company/orders', order)
    },
    getAddresses(city) {
        return instance.get(`addresses?city=${city}`)
    },
    sendModelFiles(layoutId, formData) {
        return instance.post(`orders/layouts/${layoutId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    getOrders() {
        return instance.get(`company/orders?pageNumber=${1}&pageSize=${10}`)
    },
    getAllOrders() {
        return instance.get(`orders?pageNumber=${1}&pageSize=${10}`)
    }
}

