import {Card, Space} from 'antd'
import {NavLink} from 'react-router-dom'
import React from 'react'

/**
 * Home page for employee role.
 */
const HomeForEmployee = () => {
    const spaceStyle = {
        width: '100%',
        padding: '0 20px',
    }

    const cardStyle = {
        width: '300px',
        height: "200px"
    }

    return (
        <Space style={spaceStyle} align="start">
            <NavLink to="orders">
                <Card
                    style={cardStyle}
                    title="Заказы"
                    hoverable>
                    <p>Сделайте заказы ваших планировок, чтобы продемонстрировать их в режиме VR</p>
                </Card>
            </NavLink>
            <NavLink to="buildings">
                <Card
                    style={cardStyle}
                    title="Планировки"
                    hoverable>
                    <p>Ищите подходящие планировки и добавляйте готовые 3D-сцены планировок в сессии для демонстрации пользователям</p>
                </Card>
            </NavLink>
            <NavLink to="sessions">
                <Card
                    style={cardStyle}
                    title="Сессии"
                    hoverable>
                    <p>Управляйте сессиями, создавайте готовые наборы 3D-сцен планировок и демонстрируйте их разом</p>
                </Card>
            </NavLink>
            <NavLink to="bind-requests">
                <Card
                    style={cardStyle}
                    title="Предоставление доступа"
                    hoverable>
                    <p>Приглашайте ваших клиентов, имеющих VR-шлем, и предоставляйте доступ к базе ваших планировок</p>
                </Card>
            </NavLink>
        </Space>
    )
}

export default HomeForEmployee