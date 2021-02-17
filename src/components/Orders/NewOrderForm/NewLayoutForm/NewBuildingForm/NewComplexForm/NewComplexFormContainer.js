import React from 'react'
import {connect} from 'react-redux'
import NewComplexReduxForm from './NewComplexForm'
import {IdGenerator} from '../../../../../../utils/generators/generators'
import NewComplexForm from './NewComplexForm'
import {getCitiesByNamePrefix} from '../../../../../../redux/reducers/ordersReducer'
import {getCitiesByPrefix} from '../../../../../../utils/selectors/selectors'

const complexesIdIterator = IdGenerator()

const mapStateToProps = (state) => ({
    // formData: getFormValues('newComplexForm')(state)
})

class NewComplexFormContainer extends React.Component {
    handleSubmit = () => {
        const lId = this.props.lId
        const formData = this.props.formData

        // console.log(formData)

        this.props.addComplexOption({
            id: complexesIdIterator.next().value,
            name: formData.complexes[lId].newComplexName,
            city: formData.complexes[lId].newComplexAddress,
            description: formData.complexes[lId].newComplexDescription
        })
    }

    render() {
        return <NewComplexForm
            lId={this.props.lId}
            cities={this.props.citiesByNamePrefix}
            handleSubmit={this.handleSubmit}
        />
    }
}

export default connect(mapStateToProps, {getCitiesByNamePrefix})(NewComplexFormContainer)
