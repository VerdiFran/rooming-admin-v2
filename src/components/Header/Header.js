import React from 'react'
import logo from './../../assets/images/building.png'
import styles from './Header.module.scss'
import {purple} from '@ant-design/colors'
import {UserOutlined, LogoutOutlined} from '@ant-design/icons'
import {NavLink} from 'react-router-dom'
import {Menu, Dropdown, Avatar} from 'antd'
import UserInfoContainer from './UserInfo/UserInfoContainer'

const Header = () => {

    return (
        <div className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={logo} width='36px' height='36px' alt='logo'/>
                <span>Rooming</span>
            </div>
            <UserInfoContainer/>
        </div>
    )
}

export default Header
