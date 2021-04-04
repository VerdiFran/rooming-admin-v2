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
     * @returns Promise with GET request.
     */
    getCompanies(pageNumber: number, pageSize: number, name: string) {
        const config = {
            params: {
                pageNumber,
                pageSize,
                name
            }
        }
        
        return instance.get('companies', config)
    }
}