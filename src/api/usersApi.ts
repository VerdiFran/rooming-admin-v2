import {instance} from './instances'

/**
 * API for work with users.
 */
export const usersApi = {

    /**
     * Returns promise with GET request for available bind-requests.
     * @param pageNumber Page number.
     * @param pageSize Page size.
     * @param isBound Bound or not bound requests needed.
     * @param usernamePart Part of user name for searching.
     */
    getBindRequests(pageNumber: number, pageSize: number, isBound: boolean, usernamePart: string | null) {
        const config = {
            params: { pageNumber, pageSize, isBound, usernamePart }
        }

        return instance.get(`company/bind-requests`, config)
    },

    /**
     * Bind user to company.
     * @param ids Ids of bind-requests.
     */
    bindToCompany(ids: Array<number>) {
        return instance.put('company/bind-requests', { ids })
    },

    unbindRequest(id: number) {
        return instance.delete(`company/bind-requests/${id}`)
    }

}