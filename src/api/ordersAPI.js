import {instance} from './commonAPI'

export const ordersAPI = {
    sendNewOrder(order) {
        return instance.post('company/orders', order)
    },
    getAddresses(city) {
        /*return instance.get(`addresses?city=${city}`)*/
        return [{
            city: 'Красноярск',
            street: 'Алексеева',
            house: '33',
            buildingId: 6,
            complexId: 12,
            complexName: 'Престиж'
        },
            {
                city: 'Красноярск',
                street: 'Алексеева',
                house: '35',
                buildingId: 45,
                complexId: 12,
                complexName: 'Престиж'
            },
            {
                city: 'Красноярск',
                street: 'Маркса',
                house: '4',
                buildingId: 23,
                complexId: 12,
                complexName: 'Престиж'
            },
            {
                city: 'Красноярск',
                street: 'Борисова',
                house: '83',
                buildingId: 9,
                complexId: 3,
                complexName: 'Голубое небо'
            },
            {
                city: 'Красноярск',
                street: 'Борисова',
                house: '80',
                buildingId: 7,
                complexId: 3,
                complexName: 'Голубое небо'
            }]
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
    },
    getAllCities() {
        return ['Крек', 'Мек']
    }
}

