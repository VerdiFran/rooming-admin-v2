import React from 'react'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import styles from './Home.module.scss'

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

export default compose(
    withAuthRedirect
)(Home)
