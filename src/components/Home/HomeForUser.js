import {Card, Space} from 'antd'
import {NavLink} from 'react-router-dom'
import React from 'react'

/**
 * Home page for user role.
 */
const HomeForUser = () => {
    const spaceStyle = {
        width: '100%',
        padding: '0 20px'
    }

    const cardStyle = {
        width: '300px',
        height: "200px"
    }

    return (
        <Space style={spaceStyle} align="start">
            <NavLink to="buildings">
                <Card
                    style={cardStyle}
                    title="Планировки"
                    hoverable>
                    <p>Ищите подходящие планировки и добавляйте их 3D-сцены в сессии для просмотра</p>
                </Card>
            </NavLink>
            <NavLink to="sessions">
                <Card
                    style={cardStyle}
                    title="Сессии"
                    hoverable>
                    <p>Управляйте сессиями, создавайте готовые наборы 3D-сцен планировок и смотрите их разом</p>
                </Card>
            </NavLink>
        </Space>
    )
}

export default HomeForUser