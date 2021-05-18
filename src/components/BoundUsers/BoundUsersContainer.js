import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'
import {connect} from 'react-redux'
import React from 'react'
import {getBindRequests, getTotalBindRequests} from '../../utils/selectors/selectors'
import {downloadBindRequests} from '../../redux/reducers/usersReducer'
import {usePagination} from '../../hooks/usePagination'
import BoundRequests from './BoundUsers'
import {BindRequestsPaginationArgs} from '../../redux/reducers/common/pagination/BindRequestsPaginationArgs'

const mapStateToProps = (state) => ({
    bindRequests: getBindRequests(state),
    totalRequests: getTotalBindRequests(state)
})

const BoundUsersContainer = (props) => {
    const [pageSize, setPage] = usePagination(() => props.downloadBindRequests(
        new BindRequestsPaginationArgs(1, 10, null, true))
    )

    return <BoundRequests
        bindRequests={props.bindRequests}
        setPage={setPage}
        pageSize={pageSize}
        total={props.totalRequests}
    />
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {downloadBindRequests})
)(BoundUsersContainer)