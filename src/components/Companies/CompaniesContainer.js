import React, { useEffect, FunctionComponent } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { uploadCompanies } from '../../redux/reducers/companiesReducer'
import Companies from './Companies'
import { getUploadedCompanies, getCompaniesTotalPages } from '../../utils/selectors/selectors'

const mapStateToProps = (state) => ({
    companies: getUploadedCompanies(state),
    totalPages: getCompaniesTotalPages(state)
})

const CompaniesContainer = (props) => {

    const [pageSize] = React.useState(10)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [namePart, setNamePart] = React.useState('')

    useEffect(() => {
        props.uploadCompanies(currentPage, pageSize, namePart)
    }, [currentPage, namePart])

    return <Companies
        companies={props.companies}
        totalPages={props.totalPages}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
    />
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { uploadCompanies })
)(CompaniesContainer)