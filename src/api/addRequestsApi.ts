import {instance} from './instances'

/**
 * API for add requests.
 */
export const addRequestsAPI = {

    /**
     * GET request for company add requests.
     * @param pageNumber Number of page.
     * @param pageSize Page size.
     * @param onlyNotExecuted Whether need only executed requests.
     * @returns Promise with GET request.
     */
    getCompanyAddRequests(pageNumber: number, pageSize: number, onlyNotExecuted: boolean) {
        const config = {
            params: {
                pageNumber,
                pageSize,
                onlyNotExecuted: onlyNotExecuted
            }
        }
        
        return instance.get('add-requests/companies', config)
    }
}