import {DEVELOPER, EMPLOYEE} from '../../redux/userRoles'
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

export const getUserRole = (state) => {
    return state.auth.roles
}

export const getOrdersData = (state) => {

    if (!state.orders.orders || state.orders.orders.length === 0) return []

    const orderIdIterator = IdGenerator()
    const userRoles = getUserRole(state)

    const separateComplexes = (complexes) => {
        let layouts = []
        const layoutsIdIterator = IdGenerator()

        complexes.forEach(complex => {
            complex.buildings.forEach(building => {
                building.layouts.forEach((layout, idx) =>
                    layouts.push(building.layouts.length > 1
                        ? {
                            city: complex.address.city,
                            complexName: complex.name,
                            shortAddress: building.address.streetAndHouse,
                            index: idx + 1,
                            key: layoutsIdIterator.next().value,
                            description: layout.description,
                            id: layout.id,
                            isCompleted: layout.isCompleted
                        }
                        : {
                            city: complex.address.city,
                            complexName: complex.name,
                            shortAddress: building.address.streetAndHouse,
                            key: layoutsIdIterator.next().value,
                            description: layout.description,
                            id: layout.id,
                            isCompleted: layout.isCompleted
                        }
                    )
                )
            })
        })

        return layouts
    }

    const separateBuildings = (buildings) => {
        let layouts = []
        const layoutsIdIterator = IdGenerator()

        buildings.forEach(building => {
            building.layouts.forEach((layout, idx) =>
                layouts.push(building.layouts.length > 1
                    ? {
                        city: building.address.city,
                        shortAddress: building.address.streetAndHouse,
                        index: idx + 1,
                        key: layoutsIdIterator.next().value,
                        description: layout.description,
                        id: layout.id,
                        isCompleted: layout.isCompleted
                    }
                    : {
                        city: building.address.city,
                        shortAddress: building.address.streetAndHouse,
                        key: layoutsIdIterator.next().value,
                        description: layout.description,
                        id: layout.id,
                        isCompleted: layout.isCompleted
                    }
                )
            )
        })

        return layouts
    }

    return state.orders.orders.map(order => ({
        key: orderIdIterator.next().value,
        description: order.order.description,
        deadline: order.order.deadline,
        companyName: order.companyName,
        createdAt: order.createdAt,
        addresses:
            order.order.ordersForBuilding.map(building => `${building.address.city}, ${building.address.streetAndHouse}`)
                .concat(order.order.ordersForComplex
                    .map(complex => `${complex.address.city}, ${complex.name}: ${complex.buildings.map(building => `${building.address.streetAndHouse}`)
                        .join(', ')}`)),
        layouts: separateBuildings(order.order.ordersForBuilding).concat(separateComplexes(order.order.ordersForComplex)),
        actions: userRoles.includes(EMPLOYEE)
            ? ['Посмотреть', 'Изменить', 'Отменить']
            : userRoles.includes(DEVELOPER)
                ? ['Посмотреть', 'Выполнить']
                : ['Посмотреть']
    }))
}

export const getBuildingOptions = (state) => {
    const buildingAddresses = state.orders.addresses ? state.orders.addresses.buildings : []
    const addressesCount = buildingAddresses.length

    if (addressesCount === 0) return []

    let groupedBuildingsCount = 0
    const buildingOptions = []

    do {
        const buildingsInComplex = buildingAddresses.filter((el, index) =>
            buildingAddresses[groupedBuildingsCount].complexId === el.complexId)
        if (buildingsInComplex.every(el => el.complexId && +el.complexId !== -1)) {
            buildingOptions.push({
                value: buildingsInComplex[0].complexId,
                label: state.orders.addresses.complexes.filter(complex => +complex.id === +buildingsInComplex[0].complexId)[0].name,
                children: buildingsInComplex.map(building => ({
                    value: building.id,
                    label: building.address.shortName
                }))
            })
        } else {
            buildingOptions.push({
                value: -1,
                label: 'Отдельные здания',
                children: [...buildingsInComplex]
            })
        }
        groupedBuildingsCount += buildingsInComplex.length
    } while (groupedBuildingsCount < addressesCount)

    return buildingOptions
}

export const getComplexOptions = (state) => {
    return state.orders.addresses ? state.orders.addresses.complexes.map(complex => ({
        value: complex.id,
        label: complex.name
    })) : []
}

export const getBuildings = (state) => state.orders.addresses ? state.orders.addresses.buildings : []

export const getComplexes = (state) => state.orders.addresses ? state.orders.addresses.complexes.map(complex => ({
    id: complex.id,
    name: complex.name,
    description: complex.description,
    city: complex.city,
})) : []

export const getCities = (state) => state.orders.addresses ? state.orders.addresses.cities : []

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
