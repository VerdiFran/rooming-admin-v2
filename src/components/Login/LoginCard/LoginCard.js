import React from 'react'
import AuthReduxForm from './AuthForm/AuthForm'
import styles from './LoginCard.module.scss'
import logo from './../../../assets/images/building.png'

/**
 * Card with an authentication form
 * @returns {JSX.Element}
 * @constructor
 */

const LoginCard = ({onSubmit}) => {
    return (
        <div className={styles.loginCard}>
            <div className={styles.greeting}>Добро пожаловать!</div>
            <img className={styles.logo} src={logo} alt='logo' width='40px' height='40px'/>
            <AuthReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default LoginCard
