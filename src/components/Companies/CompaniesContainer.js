import React, { useEffect } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { uploadCompanies, setSelectedCompanyId } from '../../redux/reducers/companiesReducer'
import Companies from './Companies'
import {
    getUploadedCompanies,
    getCompaniesTotalPages,
    getSelectedCompany,
    getCompaniesInLoading
} from '../../utils/selectors/selectors'

const mapStateToProps = (state) => ({
    companies: getUploadedCompanies(state),
    totalPages: getCompaniesTotalPages(state),
    selectedCompany: getSelectedCompany(state),
    companiesInLoading: getCompaniesInLoading(state)
})

/**
 * Container for companies table.
 */
const CompaniesContainer = (props) => {

    const [pageSize] = React.useState(10)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [namePart, setNamePart] = React.useState('')
    const [visible, setVisible] = React.useState(false)

    useEffect(() => {
        props.uploadCompanies(currentPage, pageSize, namePart)
    }, [currentPage, namePart])

    return <Companies
        companiesInLoading={props.companiesInLoading}
        companies={props.companies}
        totalPages={props.totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setNamePart={setNamePart}
        selectedCompany={props.selectedCompany}
        setSelectedCompanyId={props.setSelectedCompanyId}
        visible={visible}
        setVisible={setVisible}
    />
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { uploadCompanies, setSelectedCompanyId })
)(CompaniesContainer)