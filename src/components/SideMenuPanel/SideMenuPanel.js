import React from 'react'
import {Menu} from 'antd'
import styles from './SideMenuPanel.module.scss'
import {NavLink} from 'react-router-dom'

const SideMenuPanel = ({menuItems, location}) => {
    const {SubMenu} = Menu

    const menu = menuItems.map(item => item.children
        ? <SubMenu key={item.key || null} title={item.title}>
            {
                item.children && item.children.map(child => <Menu.Item key={child.key}>
                    <NavLink to={child.key}>{child.title}</NavLink>
                </Menu.Item>)
            }
        </SubMenu>
        : <Menu.Item key={item.key || null}>
            <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
    )

    const rootSubmenuKeys = menuItems.map(item => item.key)

    let openKey = rootSubmenuKeys[0]

    rootSubmenuKeys.forEach(rootKey => {
        menuItems.forEach(item => {
            if (item.children && item.children.some(child => child.key === location.pathname)) {
                openKey = rootKey
            }
        })
    })

    const [openKeys, setOpenKeys] = React.useState([openKey])

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
                selectedKeys={[location.pathname]}
                onOpenChange={onOpenChange}
            >
                {menu}
            </Menu>
        </div>
    )
}

export default SideMenuPanel
