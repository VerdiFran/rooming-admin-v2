import { connect } from "react-redux"
import { compose } from "redux"
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { downloadCompanyAddRequests } from '../../redux/reducers/addRequestsReducer'
import CompanyAddRequests from './CompanyAddRequests'
import { getCompaniesAddRequests, getCompaniesAddRequestsTotalPages } from '../../utils/selectors/selectors'
import React, {useEffect} from 'react'


const mapStateToProps = (state) => ({
    addRequests: getCompaniesAddRequests(state),
    totalPages: getCompaniesAddRequestsTotalPages(state)
})

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
    />

}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { downloadCompanyAddRequests })
)(CompanyAddRequestsContainer)