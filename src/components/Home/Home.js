import React from 'react'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {purple} from '@ant-design/colors'
import {connect} from 'react-redux'
import {getUserData} from '../../utils/selectors/selectors'
import styles from './Home.module.scss'
import {Button, Card, List, Carousel, Divider} from 'antd'
import {logout} from '../../redux/reducers/authReducer'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

/**
 * Home page component
 * @returns {JSX.Element}
 * @constructor
 */

const Home = ({userData, logout}) => {

    return (
        <div className={styles.homeContainer}>
            <div>
                HOME
            </div>

        </div>
    )
}

const dividerStyle = {
    color: "lightblue"
}

const mapStateToProps = (state) => ({
    userData: getUserData(state)
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, logout)
)(Home)
