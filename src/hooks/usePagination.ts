import {useState, useEffect} from 'react'
import PaginationArgs, {SimplePaginationArgs} from "../redux/reducers/common/pagination/PaginationArgs";

/**
 * Hook for pagination using.
 * @param action Action that occurs when changing the current page
 * @param pagination Pagination object.
 * @param deps Dependencies for update.
 */
export const usePagination = (action: (pagination: PaginationArgs) => void, pagination: PaginationArgs = new SimplePaginationArgs(),
                              deps: Array<any> = []) => {
    const [pageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const initializedPagination = {
        ...pagination,
        page: pageSize,
        pageNumber: currentPage
    }

    useEffect(() => {
        action(initializedPagination)
    }, [currentPage, ...deps])

    return [pageSize, setCurrentPage]
}