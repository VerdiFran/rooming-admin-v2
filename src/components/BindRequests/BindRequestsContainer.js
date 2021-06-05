import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'
import {connect} from 'react-redux'
import React from 'react'
import {getBindRequests, getBindRequestsInLoading, getTotalBindRequests} from '../../utils/selectors/selectors'
import {downloadBindRequests, bindToCompany} from '../../redux/reducers/usersReducer'
import {usePagination} from '../../hooks/usePagination'
import BindRequests from './BindRequests'

const mapStateToProps = (state) => ({
    bindRequests: getBindRequests(state),
    requestsInLoading: getBindRequestsInLoading(state),
    totalRequests: getTotalBindRequests(state)
})

/**
 * Container for bind-user-to-company component.
 */
const BindRequestsContainer = (props) => {
    const [pageSize, setPage] = usePagination(props.downloadBindRequests)

    return <BindRequests
        requestsInLoading={props.requestsInLoading}
        bindRequests={props.bindRequests}
        setPage={setPage}
        pageSize={pageSize}
        total={props.totalRequests}
        bindToCompany={props.bindToCompany}
    />
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {downloadBindRequests, bindToCompany})
)(BindRequestsContainer)