import React from 'react'
import SideMenuPanel from './SideMenuPanel'

const SideMenuPanelForUser = ({location}) => {
    const menuItems = [
        {
            key: '/home',
            title: 'Главная'
        }
    ]

    return <SideMenuPanel menuItems={menuItems} location={location}/>
}

export default SideMenuPanelForUser
