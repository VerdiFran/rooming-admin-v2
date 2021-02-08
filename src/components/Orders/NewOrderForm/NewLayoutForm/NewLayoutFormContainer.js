import React from 'react'
import {getBuildingOptions, getCities, getComplexOptions} from '../../../../utils/selectors/selectors'
import {connect} from 'react-redux'
import NewLayoutReduxForm from './NewLayoutForm'
import NewLayoutForm from './NewLayoutForm'
import {Typography} from 'antd'
import {IdGenerator} from '../../../../utils/generators/generators'

const layoutIdIterator = IdGenerator()

const mapStateToProps = (state) => ({
    buildingOptions: getBuildingOptions(state),
    cities: getCities(state)
})

const handleSubmit = (formData) => {
    // console.log(formData)

    //const {complexName, complexAddress, complexDescription} = formData

    /*addComplexOption({
        value: complexName,
        label: complexName,
        address: complexAddress,
        description: complexDescription
    })*/
}

class NewLayoutFormContainer extends React.PureComponent {
    lId = layoutIdIterator.next().value

    render() {
        return <NewLayoutForm
            lId={this.lId}
            buildingOptions={this.props.buildingOptions}
            handleSubmit={handleSubmit}
            cities={this.props.cities}
        />
    }
}

export default connect(mapStateToProps)(NewLayoutFormContainer)
