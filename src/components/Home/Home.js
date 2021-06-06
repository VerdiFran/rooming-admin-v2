import React from 'react'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import styles from './Home.module.scss'
import {connect} from 'react-redux'
import {getUserRoles} from '../../utils/selectors/selectors'
import {DEVELOPER, EMPLOYEE, USER, ADMIN} from '../../redux/userRoles'
import HomeForEmployee from './HomeForEmployee'
import HomeForDeveloper from './HomeForDeveloper'
import HomeForUser from './HomeForUser'
import HomeForAdmin from './HomeForAdmin'

const mapStateToProps = (state) => ({
    userRoles: getUserRoles(state)
})

/**
 * Home page component.
 */
const Home = (props) => {
    if (props.userRoles.includes(EMPLOYEE)){
        return <HomeForEmployee/>
    } else if (props.userRoles.includes(DEVELOPER)) {
        return <HomeForDeveloper/>
    } else if (props.userRoles.includes(USER)) {
        return <HomeForUser/>
    } else if (props.userRoles.includes(ADMIN)) {
        return <HomeForAdmin/>
    }
    return (
        <div className={styles.homeContainer}>
            <div>HOME</div>
        </div>
    )
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps)
)(Home)
