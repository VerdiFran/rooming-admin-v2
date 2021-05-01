import {useState, useEffect} from 'react'
import PaginationArgs, {SimplePaginationArgs} from "../redux/reducers/common/PaginationArgs";

/**
 * Hook for pagination using.
 * @param action Action that occurs when changing the current page
 * @param pagination Pagination object.Ad
 */
export const usePagination = (action: (pagination: PaginationArgs) => void, pagination: PaginationArgs = new SimplePaginationArgs()) => {
    const [pageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const initializedPagination = {
        ...pagination,
        page: pageSize,
        pageNumber: currentPage
    }

    useEffect(() => {
        action(initializedPagination)
    }, [currentPage])

    return [pageSize, setCurrentPage]
}