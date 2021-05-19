import {ADMIN, DEVELOPER, EMPLOYEE} from '../../redux/userRoles'
import {IdGenerator} from '../generators/generators'
import {EXECUTE_ORDER_ACTION, REMOVE_ORDER_ACTION, TAKE_ON_EXECUTE_ACTION} from "../actions/orderActions";
import {COMPLETED, IN_PROGRESS, READY_FOR_DEVELOPMENT} from "../../redux/orderFulfillmentStatuses";
import {ADD_TO_SESSION, GET_LAYOUT_INFO_ACTION} from "../actions/layoutActions";
import {DELETE_SESSION_ACTION, DELETE_SESSION_LAYOUT_ACTION, START_SESSION} from "../actions/sessionsActions";
import {UNBIND_USER} from '../actions/usersActions'

const idIterator = IdGenerator()

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

    const orderActionsSelection = (userRoles) => {
        if (userRoles.includes(EMPLOYEE)) {
            return [REMOVE_ORDER_ACTION]
        }

        return []
    }

    const layoutActionsSelection = (userRoles, status) => {

        if (userRoles.includes(DEVELOPER) || userRoles.includes(ADMIN)) {
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

        return []
    }

    return state.orders.orders.map(order => ({
        id: order.id,
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
                complexName: layout.building.complex ? layout.building.complex.name : 'Отдельные здания',
                street: layout.building.address.street,
                house: layout.building.address.house
            },
            status: layout.layoutOrderStatus,
            createdAt: layout.createdAt,
            executor: layout.executor,
            actions: layoutActionsSelection(userRoles, layout.layoutOrderStatus)
        })),
        createdAt: order.createdAt,
        createdBy: order.createdBy.company
            ? `${order.createdBy.company.name} (${order.createdBy.firstName} ${order.createdBy.lastName})`
            : `${order.createdBy.firstName} ${order.createdBy.lastName}`,
        actions: orderActionsSelection(userRoles)
    }))
}

/**
 * Returns total pages of orders.
 * @param state State.
 */
export const getTotalPagesOfOrders = (state) => state.orders.totalPagesOfOrders

export const getBuildings = (state) => {
    const addresses = state.orders.addresses
    const newAddresses = state.orders.newAddresses

    return addresses.length || newAddresses.length
        ? addresses.concat(newAddresses).reduce((groupedAddresses, currAddr) => {
            const city = currAddr.city
            const group = groupedAddresses[city]

            if (group) {
                group.push({...currAddr})
            } else {
                groupedAddresses[city] = [{...currAddr}]
            }

            return groupedAddresses
        }, {})
        : []
}

export const getCities = (state) => {
    return state.orders.cities.length > 0 ? state.orders.cities : []
}

export const getAddresses = (state) => {
    return state.orders.addresses.length > 0 || state.orders.newAddresses.length > 0
        ? state.orders.addresses
            .concat(state.orders.newAddresses)
            .reduce((groupedAddresses, currAddr) => {
                const city = currAddr.city

                const group = groupedAddresses[city]

                if (group) {
                    const currComplex = group.find((addr) => addr.value === currAddr.complexId)

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
                        groupedAddresses[city] = [...groupedAddresses[city], {
                            value: currAddr.complexId || -1,
                            label: currAddr.complexName || 'Отдельные здания',
                            children: [{
                                value: currAddr.street,
                                label: currAddr.street,
                                children: [{
                                    value: currAddr.buildingId,
                                    label: currAddr.house
                                }]
                            }]
                        }]

                        return groupedAddresses
                    }
                } else {
                    groupedAddresses[city] = [{
                        value: currAddr.complexId || -1,
                        label: currAddr.complexName || 'Отдельные здания',
                        children: [{
                            value: currAddr.street,
                            label: currAddr.street,
                            children: [{
                                value: currAddr.buildingId,
                                label: currAddr.house
                            }]
                        }]
                    }]

                    return groupedAddresses
                }
            }, {})
        : []
}

export const getNewComplexes = (state) => {
    const newComplexes = state.orders.newComplexes

    return newComplexes.length
        ? newComplexes.reduce((groupedComplexes, currComplex) => {
            const city = currComplex.city
            const group = groupedComplexes[city]

            if (group) {
                group.push({...currComplex})
            } else {
                groupedComplexes[city] = [{...currComplex}]
            }

            return groupedComplexes
        }, {})
        : []
}

export const getComplexesOptions = (state) => {
    const reduceAddressesToComplexes = (addresses) =>
        addresses
            .filter(address => address.complexId && address.complexId !== -1)
            .reduce((groupedComplexes, currAddr) => {
                const city = currAddr.city
                const group = groupedComplexes[city]

                if (group) {
                    if (!group.some(complex => complex.value === currAddr.complexId)) {
                        group.push({
                            value: currAddr.complexId,
                            label: currAddr.complexName
                        })
                    }

                    return groupedComplexes
                } else {
                    groupedComplexes[city] = [{
                        value: currAddr.complexId,
                        label: currAddr.complexName
                    }]

                    return groupedComplexes
                }
            }, {})

    return reduceAddressesToComplexes(state.orders.addresses.concat(state.orders.newComplexes))
}

export const getLayoutsInfo = (state) => {
    if (state.orders.currentLayoutIds.length === 0) return []

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
    return state.orders.addresses.concat(state.orders.newAddresses).map(addr => ({
        streetName: addr.street,
        complexId: addr.complexId
    }))
}

/**
 * Returns buildings with finished layouts.
 * @param state State.
 * @return List of buildings.
 */
export const getFinishedBuildings = (state) => {

    const buildingsIdIterator = IdGenerator()
    const layoutsIdIterator = IdGenerator()

    return state.buildings.buildings.map(building => ({
        ...building,
        layouts: building.layouts.map(layout => ({
            ...layout,
            key: layoutsIdIterator.next().value,
            actions: [GET_LAYOUT_INFO_ACTION, ADD_TO_SESSION]
        })),
        key: buildingsIdIterator.next().value
    }))
}

/**
 * Returns total pages of buildings.
 * @param state State.
 * @return Number of total page.
 */
export const getTotalPages = (state) => state.buildings.totalPages

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

/**
 * Returns selected layout.
 * @param state State.
 * @return Selected layout or null if it is not exist.
 */
export const getSelectedLayout = (state) => {

    const selectedLayoutId = state.buildings.selectedLayoutId

    if (selectedLayoutId === 0) {
        return 0;
    }

    for (const building of state.buildings.buildings) {
        const selectedLayout = building.layouts.find(layout => layout.id === selectedLayoutId)
        if (selectedLayout) {
            return {
                ...selectedLayout,
                buildingId: building.id,
                createdAt: new Date(selectedLayout?.createdAt),
                key: 'selectedLayout'
            }
        }
    }

    return null
}

/**
 * Get sessions from state.
 * @param state State.
 */
export const getSessions = (state) => {

    return state.sessions.sessions.map(session => (
        {
            ...session,
            layouts: session.layouts.map(layout => ({
                ...layout,
                createdAt: new Date(layout.createdAt),
                key: idIterator.next().value,
                sessionId: session.id,
                actions: [DELETE_SESSION_LAYOUT_ACTION]
            })),
            actions: [DELETE_SESSION_ACTION, START_SESSION],
            createdAt: new Date(session.createdAt),
            key: idIterator.next().value
        }
    ))
}

/**
 * Returns total pages of sessions.
 * @param state State.
 */
export const getSessionsTotal = (state) => {
  return state.sessions.totalSessions
}

/**
 * Get bin-user-to-company requests.
 * @param state Users state.
 */
export const getBindRequests = (state) => {

    return state.users.bindRequests.map(request => ({
        ...request,
        key: idIterator.next().value,
        actions: [UNBIND_USER]
    }))
}

/**
 * Get total pages of bind-user-to-company requests.
 * @param state Users state.
 */
export const getTotalBindRequests = (state) => {
    return state.users.totalRequests
}