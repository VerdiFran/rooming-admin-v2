/**
 * Describes interface that should provide pagination arguments class.
 */
interface PaginationArgs {
    pageSize: number,
    pageNumber: number
}

/**
 * Simple pagination arguments (page size and page number only).
 */
export class SimplePaginationArgs implements PaginationArgs {
    pageNumber: number
    pageSize: number

    constructor(pageNumber: number = 1, pageSize: number = 10) {
        this.pageNumber = pageNumber
        this.pageSize = pageSize
    }
}

export default PaginationArgs