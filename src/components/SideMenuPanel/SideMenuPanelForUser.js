import React from 'react'
import SideMenuPanel from './SideMenuPanel'

const SideMenuPanelForUser = ({location}) => {
    const menuItems = [
        {
            key: '/home',
            title: 'Главная'
        },
        {
            key: '/models',
            title: 'Модели',
            children: [
                {
                    key: '/buildings',
                    title: 'Планировки'
                },
                {
                    key: '/sessions',
                    title: 'Сессии'
                }
            ]
        }
    ]

    return <SideMenuPanel menuItems={menuItems} location={location}/>
}

export default SideMenuPanelForUser
