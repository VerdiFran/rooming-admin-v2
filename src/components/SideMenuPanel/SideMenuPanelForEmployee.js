import React from 'react'
import SideMenuPanel from './SideMenuPanel'

const SideMenuPanelForEmployee = () => {
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
                {
                    key: '/buildings',
                    title: 'Планировки'
                },
            ]
        },
    ]

    return <SideMenuPanel menuItems={menuItems}/>
}

export default SideMenuPanelForEmployee
