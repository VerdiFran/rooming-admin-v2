import React from 'react'
import SideMenuPanel from './SideMenuPanel'

const SideMenuPanelForAdmin = () => {
    const menuItems = [
        {
            key: '/home',
            title: 'Главная'
        },
        {
            key: '/companies',
            title: 'Компании',
            children: [
                {
                    key: '/orders',
                    title: 'Заказы'
                },
                {
                    key: '/companies',
                    title: 'Сведения'
                },
                {
                    key: '/add-requests',
                    title: 'Заявки'
                },
            ]
        },
    ]

    return <SideMenuPanel menuItems={menuItems}/>
}

export default SideMenuPanelForAdmin
