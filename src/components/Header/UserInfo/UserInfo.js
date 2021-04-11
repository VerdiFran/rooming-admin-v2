import React from 'react'
import styles from './UserInfo.module.scss'
import {UserOutlined} from '@ant-design/icons'
import {NavLink} from 'react-router-dom'
import {Menu, Dropdown, Avatar} from 'antd'

/**
 *
 * @param {any} userData User data
 * @param {function} logout Logout user
 * @returns {JSX.Element}
 * @constructor
 */
const UserInfo = ({userData, logout}) => {
    const menu = (
        <Menu>
            <Menu.Item>
                <NavLink to="#">Настройки</NavLink>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item onClick={logout}>
                Выйти
            </Menu.Item>
        </Menu>
    )

    return (
        <div className={styles.userInfo}>
            <div className={styles.userIcon}>
                <Avatar size="large" shape="square" icon={<UserOutlined/>}/>
            </div>
            <div className={styles.who}>
                <Dropdown overlay={menu} arrow>
                    <NavLink to="#">{userData.userName}</NavLink>
                </Dropdown>
            </div>
            <div className={styles.from}>из <NavLink to="#">{userData.companyName}</NavLink></div>
        </div>
    )
}

export default UserInfo
