import PaginationArgs from './PaginationArgs'

/**
 * Pagination args for download bind requests.
 */
export class BindRequestsPaginationArgs implements PaginationArgs {
    pageNumber: number
    pageSize: number
    usernamePart: string | null
    isBound: boolean

    constructor(pageNumber: number = 1, pageSize: number = 10, usernamePart: string | null = null, isBound: boolean = false) {
        this.pageNumber = pageNumber
        this.pageSize = pageSize
        this.usernamePart = usernamePart
        this.isBound = isBound
    }
}