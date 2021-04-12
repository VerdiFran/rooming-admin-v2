import React from 'react'
import SideMenuPanel from './SideMenuPanel'

const SideMenuPanelForUser = () => {
    const menuItems = [
        {
            key: '/home',
            title: 'Главная'
        }
    ]

    return <SideMenuPanel menuItems={menuItems}/>
}

export default SideMenuPanelForUser
