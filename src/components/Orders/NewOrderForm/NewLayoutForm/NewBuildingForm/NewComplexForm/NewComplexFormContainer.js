import React from 'react'
import {connect} from 'react-redux'
import NewComplexReduxForm from './NewComplexForm'
import {addBuildingOption, addComplexOption} from '../../../../../../redux/reducers/ordersReducer'
import {IdGenerator} from '../../../../../../utils/generators/generators'
import NewComplexForm from './NewComplexForm'

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
        return <NewComplexForm handleSubmit={this.handleSubmit} lId={this.props.lId}/>
    }
}

export default connect(mapStateToProps, {addBuildingOption, addComplexOption})(NewComplexFormContainer)
