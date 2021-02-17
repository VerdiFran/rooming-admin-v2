import React from 'react'
import NewBuildingReduxForm from './NewBuildingForm'
import {connect} from 'react-redux'
import NewBuildingForm from './NewBuildingForm'
import {getAddressesByCityName} from '../../../../../redux/reducers/ordersReducer'
import NewLayoutForm from '../NewLayoutForm'
import {getAddresses, getCities, getComplexes, getStreets} from '../../../../../utils/selectors/selectors'

const mapStateToProps = (state) => ({
    cities: getCities(state),
    complexes: getComplexes(state),
    streets: getStreets(state)
})

class NewBuildingFormContainer extends React.Component {

    handleSubmit = () => {

    }

    render() {
        return <NewBuildingForm
            cities={this.props.cities}
            complexes={this.props.complexes}
            streets={this.props.streets}
            getAddresses={this.props.getAddressesByCityName}
            {...this.props}
        />
    }
}

export default connect(mapStateToProps, {getAddressesByCityName})(NewBuildingFormContainer)
