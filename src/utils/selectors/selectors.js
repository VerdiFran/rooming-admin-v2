import {ADMIN, DEVELOPER, EMPLOYEE} from '../../redux/userRoles'
import {IdGenerator} from '../generators/generators'
import {buildingsAPI} from '../../api/buildingsAPI'

export const getIsAuth = (state) => {
    return state.auth.isAuth
}

export const getInitialized = (state) => {
    return state.app.initialized
}

export const getUserData = (state) => {
    return {
        userName: `${state.auth.firstName} ${state.auth.lastName}`,
        companyName: state.auth.company.name,
        userRole: state.auth.roles
    }
}

export const getUserRoles = (state) => {
    return state.auth.roles
}

export const getOrdersData = (state) => {
    if (!state.orders.orders || state.orders.orders.length === 0) return []

    const orderIdIterator = IdGenerator()
    const layoutIdIterator = IdGenerator()
    const userRoles = getUserRoles(state)

    return state.orders.orders.map(order => ({
        key: orderIdIterator.next().value,
        description: order.orderDescription,
        deadline: order.deadline,
        addresses: order.layouts.map(addr =>
            `г. ${addr.building.address.city}, ул. ${addr.building.address.street}, д. ${addr.building.address.house}`),
        layouts: order.layouts.map(layout => ({
            id: layout.id,
            key: layoutIdIterator.next().value,
            description: layout.description,
            address: {
                city: layout.building.address.city,
                complexName: layout.building.complex.name,
                street: layout.building.address.street,
                house: layout.building.address.house
            },
            status: layout.layoutOrderStatus,
            createdAt: layout.createdAt,
            actions: userRoles.includes(EMPLOYEE) ? ['посмотреть']
                : userRoles.includes(DEVELOPER) ? ['выполнить']
                    : userRoles.includes(ADMIN) ? [] : ['посмотреть']
        })),
        createdAt: order.createdAt,
        createdBy: order.createdBy.company
            ? `${order.createdBy.company.name} (${order.createdBy.firstName} ${order.createdBy.lastName})`
            : `${order.createdBy.firstName} ${order.createdBy.lastName}`,
        actions: userRoles.includes(EMPLOYEE) ? []
            : userRoles.includes(DEVELOPER) ? []
                : userRoles.includes(ADMIN) ? [] : []
    }))
}

export const getBuildings = (state) => state.orders.addresses ? state.orders.addresses.buildings : []

export const getCities = (state) => {
    return state.orders.cities.length > 0 ? state.orders.cities : []
}

export const getAddresses = (state) => {
    return state.orders.addresses.length > 0 || state.orders.newAddresses.length > 0
        ? state.orders.addresses.concat(state.orders.newAddresses).reduce((groupedAddresses, currAddr) => {
            const currComplex = groupedAddresses.find((addr) => addr.value === currAddr.complexId)
            if (currComplex) {
                const currStreet = currComplex.children.find((street) => street.value === currAddr.street)
                if (currStreet) {
                    currStreet.children.push({
                        value: currAddr.buildingId,
                        label: currAddr.house
                    })
                    return groupedAddresses
                } else {
                    currComplex.children.push({
                        value: currAddr.street,
                        label: currAddr.street,
                        children: [{
                            value: currAddr.buildingId,
                            label: currAddr.house
                        }]
                    })
                    return groupedAddresses
                }
            } else {
                return [...groupedAddresses, {
                    value: currAddr.complexId,
                    label: currAddr.complexName,
                    children: [{
                        value: currAddr.street,
                        label: currAddr.street,
                        children: [{
                            value: currAddr.buildingId,
                            label: currAddr.house
                        }]
                    }]
                }]
            }
        }, [])
        : []
}

export const getComplexes = (state) => {
    const reduceAddressesToComplexes = (addresses) => addresses.reduce((acc, currAddr) => {
        return acc.some(complex => complex.value === currAddr.complexId)
            ? acc
            : [...acc, {
                value: currAddr.complexId,
                label: currAddr.complexName
            }]
    }, [])

    return reduceAddressesToComplexes(state.orders.addresses.concat(state.orders.newComplexes))
}

export const getLayoutsInfo = (state) => {
    if (state.orders.currentLayoutIds.length === 0 ) return []

    const currentOrder = state.orders.orders.filter(order =>
        order.layouts.some(layout => state.orders.currentLayoutIds.includes(layout.id)))[0]

    return currentOrder.layouts.map(layout => ({
        ...layout,
        orderDescription: currentOrder.orderDescription,
        deadline: currentOrder.deadline,
        createdAt: currentOrder.createdAt,
        createdBy: currentOrder.createdBy,
        orderId: currentOrder.id
    }))
}

export const getStreets = (state) => {
    return state.orders.addresses.map(addr => ({
        streetName: addr.street,
        complexId: addr.complexId
    }))
}

export const getFinishedBuildings = (state) => {
    const complexesKeyIterator = IdGenerator()
    const buildingsKeyIterator = IdGenerator()
    const layoutsKeyIterator = IdGenerator()

    return [
        ...state.buildings.buildingComplexes.map(complex => ({
            ...complex,
            buildings: complex.buildings.map(building => ({
                ...building,
                layouts: building.layouts.map(layout => ({
                    ...layout,
                    actions: [{label: 'Скачать', handleSubmit: () => buildingsAPI.downloadFile(layout.id)}],
                    key: layoutsKeyIterator.next().value
                })),
                key: buildingsKeyIterator.next().value
            })),
            key: complexesKeyIterator.next().value
        })),
        {
            id: -1,
            address: {
                id: null,
                city: '',
                streetAndHouse: ''
            },
            name: 'Отдельные здания',
            description: 'В этом разделе находятся здания, не входящие в какой-либо комплекс.',
            buildings: state.buildings.buildings.map(building => ({
                ...building,
                layouts: building.layouts.map(layout => ({
                    ...layout,
                    actions: [{label: 'Скачать', handleSubmit: () => buildingsAPI.downloadFile(layout.id)}],
                    key: layoutsKeyIterator.next().value
                })),
                key: buildingsKeyIterator.next().value
            })),
            key: complexesKeyIterator.next().value
        }
    ]
}
