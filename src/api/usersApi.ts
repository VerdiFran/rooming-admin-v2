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
     */
    getBindRequests(pageNumber: number, pageSize: number, isBound: boolean) {
        const config = {
            params: { pageNumber, pageSize, isBound }
        }

        return instance.get(`company/bind-requests`, config)
    }
}