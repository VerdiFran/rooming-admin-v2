import React from 'react'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {connect} from 'react-redux'
import {getUserData} from '../../utils/selectors/selectors'
import styles from './Home.module.scss'
import {resetUserData} from '../../redux/reducers/authReducer'

/**
 * Home page component
 * @returns {JSX.Element}
 * @constructor
 */

const Home = () => {

    return (
        <div className={styles.homeContainer}>
            <div>
                HOME
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    userData: getUserData(state)
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, resetUserData)
)(Home)
