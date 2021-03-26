import React from 'react'
import styles from './Header.module.scss'
import UserInfoContainer from './UserInfo/UserInfoContainer'
import Logo from '../common/Logo/Logo'

const Header = () => {

    return (
        <div className={styles.header}>
            <Logo/>
            <UserInfoContainer/>
        </div>
    )
}

export default Header
