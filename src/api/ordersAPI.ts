import {instance, instanceForDownloadFile} from './instances'

export const ordersAPI = {
    /**
     * GET request for existing addresses by city name.
     * @param city Part of city name.
     */
    getAddresses(city: string) {
        return instance.get(`addresses?city=${city}`)
    },

    /**
     * GET request for company orders
     * @param pageNumber Page number.
     * @param pageSize Page size.
     */
    getOrders(pageNumber: number, pageSize: number) {
        return instance.get(`company/orders?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    },

    /**
     * GET request for all orders
     * @param pageNumber Page number.
     * @param pageSize Page size.
     */
    getAllOrders(pageNumber: number, pageSize: number) {
        return instance.get(`orders?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    },

    /**
     * POST request for new order adding.
     * @param order New order.
     */
    sendNewOrder(order: any) {
        return instance.post('company/orders', order)
    },

    /**
     * DELETE request for order removing.
     * @param orderId Id of order to remove.
     */
    removeOrder(orderId: number) {
        return instance.delete(`company/orders/${orderId}`)
    },

    /**
     * POST request for image adding.
     * @param formData Image data.
     */
    sendNewOrderFile(formData: FormData) {
        return instance.post(`resources/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    /**
     * GET request for image.
     * @param id Id of resource.
     */
    getLayoutOrderImage(id: number) {
        return instanceForDownloadFile.get(`resources/images/${id}`)
    },

    /**
     * POST request for layout model file sending.
     * @param orderId Order id.
     * @param layoutId Layout order id.
     * @param formData Form data.
     */
    sendModelFiles(orderId: number, layoutId: number, formData: FormData) {
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
    takeOnExecute(orderId: number, layoutId: number) {
        return instance.put(`orders/${orderId}/layouts/${layoutId}/executor`)
    }
}

