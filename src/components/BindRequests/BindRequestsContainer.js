import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'
import {connect} from 'react-redux'
import React from 'react'
import {getBindRequests, getTotalBindRequests} from '../../utils/selectors/selectors'
import {downloadBindRequests} from '../../redux/reducers/usersReducer'
import {usePagination} from '../../hooks/usePagination'
import BindRequests from './BindRequests'

const mapStateToProps = (state) => ({
    bindRequests: getBindRequests(state),
    totalRequests: getTotalBindRequests(state)
})

/**
 * Container for bind-user-to-company component.
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const BindRequestsContainer = (props) => {
    const [pageSize, setPage] = usePagination(props.downloadBindRequests)

    return <BindRequests
        bindRequests={props.bindRequests}
        setPage={setPage}
        pageSize={pageSize}
        total={props.totalRequests}
    />
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {downloadBindRequests})
)(BindRequestsContainer)