import React from 'react'
import SideMenuPanel from './SideMenuPanel'

const SideMenuPanelForAdmin = ({location}) => {
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

    return <SideMenuPanel menuItems={menuItems} location={location}/>
}

export default SideMenuPanelForAdmin
