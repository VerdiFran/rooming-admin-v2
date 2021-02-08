import {compose} from 'redux'
import UserInfo from './UserInfo'
import {connect} from 'react-redux'
import {getUserData} from '../../../utils/selectors/selectors'

const mapStateToProps = (state) => ({
    userData: getUserData(state)
})

export default compose(
    connect(mapStateToProps)
)(UserInfo)
