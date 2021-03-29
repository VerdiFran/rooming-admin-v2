import React from 'react'
import styles from './LoginCard.module.scss'
import logo from '../../../assets/images/building.png'
import AuthForm from './AuthForm/AuthForm'

/**
 * Card with an authentication form
 * @returns {JSX.Element}
 * @constructor
 */

const LoginCard = ({onSubmit}) => {
    return (
        <div className={styles.loginCard}>
            <div className={styles.greeting}>Добро пожаловать!</div>
            <img className={styles.logo} src={logo} alt='logo' width='42px' height='42px'/>
            <AuthForm onSubmit={onSubmit}/>
        </div>
    )
}

export default LoginCard
