import {Card, Space} from 'antd'
import {NavLink} from 'react-router-dom'
import React from 'react'

/**
 * Home page for developer role.
 */
const HomeForDeveloper = () => {
    const spaceStyle = {
        width: '100%',
        padding: '0 20px',
    }

    const cardStyle = {
        width: '300px',
        height: "140px"
    }

    return (
        <Space style={spaceStyle} align="start">
            <NavLink to="orders">
                <Card
                    style={cardStyle}
                    title="Заказы"
                    hoverable>
                    <p>Выполнение заказов клиентов нашей компании</p>
                </Card>
            </NavLink>
        </Space>
    )
}

export default HomeForDeveloper