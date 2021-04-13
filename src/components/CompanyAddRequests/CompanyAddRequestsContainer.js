import {connect} from "react-redux"
import {compose} from "redux"
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {
    downloadCompanyAddRequests,
    executeCompanyAddRequests,
    setSelectedCompanyAddRequest
} from '../../redux/reducers/addRequestsReducer'
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
    const [selectedRequests, setSelectedRequests] = React.useState([])

    useEffect(() => {
        props.downloadCompanyAddRequests(currentPage, pageSize, true)
    }, [currentPage])

    return <CompanyAddRequests
        addRequests={props.addRequests}
        totalPages={props.totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setSelectedCompanyAddRequest={props.setSelectedCompanyAddRequest}
        selectedRequest={props.selectedRequest}
        selectedRequests={selectedRequests}
        setSelectedRequests={setSelectedRequests}
        executeCompanyAddRequests={props.executeCompanyAddRequests}
    />

}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {downloadCompanyAddRequests, setSelectedCompanyAddRequest, executeCompanyAddRequests})
)(CompanyAddRequestsContainer)