import React from 'react'
import logo from './../../assets/images/building.png'
import styles from './Header.module.scss'
import {purple} from '@ant-design/colors'
import {UserOutlined, LogoutOutlined} from '@ant-design/icons'
import {NavLink} from 'react-router-dom'
import {Menu, Dropdown, Avatar} from 'antd'
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
