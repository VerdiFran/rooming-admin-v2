import {Card, Space} from 'antd'
import {NavLink} from 'react-router-dom'
import React from 'react'

/**
 * Home page for admin role.
 */
const HomeForAdmin = () => {
    const spaceStyle = {
        width: '100%',
        padding: '0 20px',
    }

    const cardStyle = {
        width: '300px',
        height: "170px"
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
            <NavLink to="companies">
                <Card
                    style={cardStyle}
                    title="Сведения о компаниях"
                    hoverable>
                    <p>Просмотр сведений о компаниях, подключенных к нашей системе</p>
                </Card>
            </NavLink>
            <NavLink to="add-requests">
                <Card
                    style={cardStyle}
                    title="Заявки на регистрацию"
                    hoverable>
                    <p>Просмотр заявок на регистрацию в нашей системе и регистрация новых компаний</p>
                </Card>
            </NavLink>
        </Space>
    )
}

export default HomeForAdmin