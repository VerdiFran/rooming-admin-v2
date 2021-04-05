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
    },

    /**
     * POST request for execute company add requests.
     * @param ids Ids of requests for execution.
     * @returns Promise with GET request.
     */
    executeCompanyAddRequests(ids: Array<number>) {
       return instance.post('companies', { ids })
    }
}