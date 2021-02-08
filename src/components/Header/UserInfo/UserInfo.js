import React from 'react'
import logo from './../../../assets/images/building.png'
import styles from './UserInfo.module.scss'
import {purple} from '@ant-design/colors'
import {UserOutlined, LogoutOutlined} from '@ant-design/icons'
import {NavLink} from 'react-router-dom'
import {Menu, Dropdown, Avatar} from 'antd'
import {ADMIN, DEVELOPER, EMPLOYEE} from '../../../redux/userRoles'

const menu = (
    <Menu>
        <Menu.Item>
            <NavLink to="#">Настройки</NavLink>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <NavLink to="#">Выйти</NavLink>
        </Menu.Item>
    </Menu>
)

const UserInfo = ({userData}) => {
    return (
        <div>
            {
                userData.userRole.includes(EMPLOYEE)
                    ? <div className={styles.userInfo}>
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
                    : <div style={{marginRight: '10px', color: '#E01625', fontWeight: 'bold'}}>{userData.userRole}</div>
            }
        </div>
    )
}

export default UserInfo
