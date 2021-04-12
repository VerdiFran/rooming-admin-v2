import React from 'react'
import {Menu} from 'antd'
import styles from './SideMenuPanel.module.scss'
import {NavLink} from 'react-router-dom'

const SideMenuPanel = ({menuItems}) => {
    const {SubMenu} = Menu

    const rootSubmenuKeys = menuItems.map(item => item.key)

    const [openKeys, setOpenKeys] = React.useState([rootSubmenuKeys[0]])

    const menu = menuItems.map(item => item.children
        ? <SubMenu key={item.key || null} title={item.title}>
            {
                item.children && item.children.map(child => <Menu.Item key={item.key || null}>
                    <NavLink to={child.key}>{child.title}</NavLink>
                </Menu.Item>)
            }
        </SubMenu>
        : <Menu.Item key={item.key || null}>
            <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
    )

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }

    return (
        <div className={styles.menuPanel}>
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
            >
                {menu}
            </Menu>
        </div>
    )
}

export default SideMenuPanel
