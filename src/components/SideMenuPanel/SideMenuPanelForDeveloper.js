import React from 'react'
import SideMenuPanel from './SideMenuPanel'

const SideMenuPanelForDeveloper = ({location}) => {
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
                    key: '/orders',
                    title: 'Заказы'
                },
            ]
        },
    ]

    return <SideMenuPanel menuItems={menuItems} location={location}/>
}

export  default SideMenuPanelForDeveloper
