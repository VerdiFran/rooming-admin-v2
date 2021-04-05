import {connect} from "react-redux"
import {compose} from "redux"
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {downloadCompanyAddRequests, setSelectedCompanyAddRequest} from '../../redux/reducers/addRequestsReducer'
import CompanyAddRequests from './CompanyAddRequests'
import { getCompaniesAddRequests, getCompaniesAddRequestsTotalPages } from '../../utils/selectors/selectors'
import React, {useEffect} from 'react'


const mapStateToProps = (state) => ({
    addRequests: getCompaniesAddRequests(state),
    totalPages: getCompaniesAddRequestsTotalPages(state)
})

/**
 * Container for component with add-requests management logic.
 * @param props Props.
 */
const CompanyAddRequestsContainer = (props) => {

    const [pageSize] = React.useState(10)
    const [currentPage, setCurrentPage] = React.useState(1)

    useEffect(() => {
        props.downloadCompanyAddRequests(currentPage, pageSize, true)
    }, [currentPage])

    return <CompanyAddRequests
        addRequests={props.addRequests}
        totalPages={props.totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setSelectedCompanyAddRequest={props.setSelectedCompanyAddRequest}
        selectedRequest={props.selectedRequest}
    />

}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {downloadCompanyAddRequests, setSelectedCompanyAddRequest})
)(CompanyAddRequestsContainer)