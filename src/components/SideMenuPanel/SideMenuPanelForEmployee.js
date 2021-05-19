import React from 'react'
import SideMenuPanel from './SideMenuPanel'

const SideMenuPanelForEmployee = ({location}) => {
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
                {
                    key: '/sessions',
                    title: 'Сессии'
                }
            ]
        },
        {
            key: '/users',
            title: 'Пользователи',
            children: [
                {
                    key: '/bind-requests',
                    title: 'Привязки к базе'
                },
                {
                    key: '/bound-users',
                    title: 'Имеющие досуп'
                }
            ]
        }
    ]

    return <SideMenuPanel menuItems={menuItems} location={location}/>
}

export default SideMenuPanelForEmployee
