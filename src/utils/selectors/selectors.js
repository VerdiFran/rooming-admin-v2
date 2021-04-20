import {ADMIN, DEVELOPER, EMPLOYEE} from '../../redux/userRoles'
import {IdGenerator} from '../generators/generators'
import {EXECUTE_ORDER_ACTION, TAKE_ON_EXECUTE_ACTION} from "../actions/orderActions";
import {COMPLETED, IN_PROGRESS, READY_FOR_DEVELOPMENT} from "../../redux/orderFulfillmentStatuses";

export const getIsAuth = (state) => {
    return state.auth.isAuth
}

export const getInitialized = (state) => {
    return state.app.initialized
}

export const getLogoutIsFinished = (state) => {
    return state.auth.logoutIsFinished
}

export const getUserData = (state) => {
    return {
        userName: `${state.auth.userData.firstName} ${state.auth.userData.lastName}`,
        companyName: state.auth.userData.company.name,
        userRole: state.auth.userData.roles
    }
}

export const getUserRoles = (state) => {
    return state.auth.userData.roles
}

export const getAccessToken = (state) => {
    return state.auth.accessToken
}

export const getOrdersData = (state) => {
    if (!state.orders.orders || state.orders.orders.length === 0) return []

    const orderIdIterator = IdGenerator()
    const layoutIdIterator = IdGenerator()
    const userRoles = getUserRoles(state)

    const actionsSelection = (userRoles, status) => {
        if (userRoles.includes(EMPLOYEE)) {
            return ['посмотреть']
        }

        if (userRoles.includes(DEVELOPER)) {
            if (status === READY_FOR_DEVELOPMENT) {
                return [TAKE_ON_EXECUTE_ACTION, EXECUTE_ORDER_ACTION]
            }

            if (status === IN_PROGRESS) {
                return [EXECUTE_ORDER_ACTION]
            }

            if (status === COMPLETED) {
                return []
            }
        }

        if (userRoles.includes(ADMIN)) {
            return ['посмотреть']
        }

        return []
    }

    return state.orders.orders.map(order => ({
        key: orderIdIterator.next().value,
        description: order.orderDescription,
        deadline: order.deadline,
        addresses: order.layouts.map(addr =>
            `г. ${addr.building.address.city}, ул. ${addr.building.address.street}, д. ${addr.building.address.house}`),
        layouts: order.layouts.map(layout => ({
            id: layout.id,
            key: layoutIdIterator.next().value,
            orderId: order.id,
            description: layout.description,
            address: {
                city: layout.building.address.city,
                complexName: layout.building.complex.name,
                street: layout.building.address.street,
                house: layout.building.address.house
            },
            status: layout.layoutOrderStatus,
            createdAt: layout.createdAt,
            executor: layout.executor,
            actions: actionsSelection(userRoles, layout.layoutOrderStatus)
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

export const getBuildings = (state) => {
    const addresses = state.orders.addresses
    const newAddresses = state.orders.newAddresses

    return addresses.length || newAddresses.length ? addresses.concat(newAddresses) : []
}

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
    const newComplexes = state.orders.newComplexes

    return newComplexes.length ? newComplexes : []
}

export const getComplexesOptions = (state) => {
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

    const buildingsIdIterator = IdGenerator()
    const layoutsIdIterator = IdGenerator()

    return state.layouts.buildings.map(building => ({
        ...building,
        layouts: building.layouts.map(layout => ({
            ...layout,
            key: layoutsIdIterator.next().value
        })),
        key: buildingsIdIterator.next().value
    }))
}

export const getTotalPages = (state) => state.layouts.totalPages

/**
 * Get uploaded companies with keys from state.
 * @param state State. 
 * @returns Uploaded companies.
 */
export const getUploadedCompanies = (state) => {
    const companiesIdIterator = IdGenerator()

    return state.companies.companies.map(company => ({
        ...company,
        actions: ['Подробнее'],
        key: companiesIdIterator.next().value
    }))
}

/**
 * Get companies total pages.
 * @param state State. 
 * @returns Total pages.
 */
export const getCompaniesTotalPages = (state) => state.companies.totalPages

/**
 * Gets companies add requests.
 * @param state State.
 */
export const getCompaniesAddRequests = (state) => {
    const companyAddRequestsIterator = IdGenerator()
    const userAddRequestsIterator = IdGenerator()

    return state.addRequests.companiesAddRequests.map(companyRequest => ({
        ...companyRequest,
        employees: companyRequest.employees.map(userRequest => ({
            ...userRequest,
            userName: `${userRequest.firstName} ${userRequest.lastName}`,
            key: userAddRequestsIterator.next().value
        })),
        actions: ['Подробнее'],
        key: companyAddRequestsIterator.next().value
    }))
}

/**
 * Get companies add requests total pages.
 * @param state State.
 */
export const getCompaniesAddRequestsTotalPages = (state) => state.addRequests.companiesRequestsTotalPages

/**
 * Returns selected company-add request.
 * @param state State
 * @returns Selected company-add request.
 */
export const getSelectedCompanyAddRequest = (state) => {
    const requests = state.addRequests.companiesAddRequests
    const selectedRequest = state.addRequests.selectedCompanyAddRequest
    const request = requests.find(request => request.id === selectedRequest)

    if (request) {
        const newEmployees = request.employees.map(employee => ({
            ...employee,
            userName: `${employee.firstName} ${employee.lastName}`
        }))
        return {
            ...request,
            employees: newEmployees
        }
    }

    return null
}

/**
 * Returns selected company.
 * @param state State
 * @returns {(T&{employees: unknown[]})|null} Selected company.
 */
export const getSelectedCompany = (state) => {

    const companies = state.companies.companies
    const selectedCompanyId = state.companies.selectedCompanyId
    const company = companies.find(company => company.id === selectedCompanyId)

    if (company) {
        const newEmployees = company.employees.map(employee => ({
            ...employee,
            userName: `${employee.firstName} ${employee.lastName}`
        }))
        return {
            ...company,
            employees: newEmployees
        }
    }

    return null
}

/**
 * Get information about logged user.
 * @param state State.
 */
export const getLoggedUserInfo = (state) => state.auth;