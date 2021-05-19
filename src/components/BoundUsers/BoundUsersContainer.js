import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'
import {connect} from 'react-redux'
import React, {useState} from 'react'
import {getBindRequests, getTotalBindRequests} from '../../utils/selectors/selectors'
import {downloadBindRequests, unbindRequest} from '../../redux/reducers/usersReducer'
import {usePagination} from '../../hooks/usePagination'
import BoundRequests from './BoundUsers'
import {BindRequestsPaginationArgs} from '../../redux/reducers/common/pagination/BindRequestsPaginationArgs'

const mapStateToProps = (state) => ({
    bindRequests: getBindRequests(state),
    totalRequests: getTotalBindRequests(state)
})

/**
 * Container for bound requests component.
 */
const BoundUsersContainer = (props) => {
    const [namePart, setNamePart] = useState('')
    const [pageSize, setPage] = usePagination(props.downloadBindRequests,
        new BindRequestsPaginationArgs(1, 10, namePart, true),
        [namePart]
    )

    return <BoundRequests
        bindRequests={props.bindRequests}
        setPage={setPage}
        pageSize={pageSize}
        total={props.totalRequests}
        unbindRequest={props.unbindRequest}
        setNamePart={setNamePart}
        namePart={namePart}
    />
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {downloadBindRequests, unbindRequest})
)(BoundUsersContainer)