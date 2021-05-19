import {instance} from './instances'

/**
 * API for companies.
 */
export const companiesAPI = {

    /**
     * GET request on companies that meet specified name.
     * @param pageNumber Number of page.
     * @param pageSize Page size.
     * @param name Part of required company name.
     * @param withLayoutsNumber With layouts count or not.
     * @param city City for sorting.
     * @returns Promise with GET request.
     */
    getCompanies(pageNumber: number, pageSize: number, name: string, withLayoutsNumber: boolean = false, city: string | null = null) {
        const config = {
            params: {
                pageNumber,
                pageSize,
                name,
                withLayoutsNumber
            }
        }
        
        return instance.get('companies', config)
    }
}