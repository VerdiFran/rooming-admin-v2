import React from 'react'
import NewBuildingReduxForm from './NewBuildingForm'
import {getComplexOptions} from '../../../../../utils/selectors/selectors'
import {connect} from 'react-redux'
import {addBuildingOption, addComplexOption, setComplexSelectChanges} from '../../../../../redux/reducers/ordersReducer'
import NewBuildingForm from './NewBuildingForm'

const mapStateToProps = (state) => ({
    complexOptions: getComplexOptions(state),
    //buildingFormData: getFormValues('newBuildingForm')(state)
})

class NewBuildingFormContainer extends React.Component {

    handleSubmit = () => {
        const formData = this.props.buildingFormData
        const lId = this.props.lId

        // console.log(formData)

        const complexId = formData.buildings[lId].complexId || -1

        if (+complexId === -1) {
            this.props.addComplexOption({
                id: -1,
                name: 'Отдельные здания',
                description: '',
                city: ''
            })
        }

        this.props.addBuildingOption({
            complexId: complexId,
            address: {
                city: '',
                shortName: formData.buildings[lId].newBuildingAddress
            },
            description: formData.buildings[lId].newBuildingDescription
        })
    }

    render() {
        return <NewBuildingForm
            handleSubmit={this.handleSubmit}
            {...this.props}
        />
    }
}

export default connect(mapStateToProps, {addBuildingOption, addComplexOption})(NewBuildingFormContainer)
