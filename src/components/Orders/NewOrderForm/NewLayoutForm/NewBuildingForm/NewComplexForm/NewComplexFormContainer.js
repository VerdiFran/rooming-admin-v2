import React from 'react'
import {connect} from 'react-redux'
import NewComplexForm from './NewComplexForm'
import {connect as formikConnect} from 'formik'
import {addComplex} from '../../../../../../redux/reducers/ordersReducer'

const mapStateToProps = (state) => ({})

class NewComplexFormContainer extends React.Component {
    render() {
        return <NewComplexForm
            layoutIndex={this.props.layoutIndex}
            addComplex={this.props.addComplex}
            {...this.props}
        />
    }
}

export default connect(
    mapStateToProps, {addComplex}
)(formikConnect(NewComplexFormContainer))
