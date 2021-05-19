
import {Table} from 'antd'
import styles from '../CompanyAddRequests/CompanyAddRequests.module.scss'
import React from 'react'
import {UNBIND_USER} from '../../utils/actions/usersActions'
import {getActionByType} from '../../utils/actions/getActionByType'

/**
 * Bound requests component.
 */
const BoundRequests = ({bindRequests, setPage, total, pageSize, unbindRequest}) => {

    const handleUnbind = (record) => {
        unbindRequest(record.id)
    }

    const actionsWithHandlers = new Map([
        [UNBIND_USER, handleUnbind]
    ])

    const columns = [
        {
            title: 'Дата подачи заявки',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            width: "15%",
            render: (date) => {
                const newDate = new Date(date)
                return `${newDate.toLocaleDateString()}, ${newDate.toLocaleTimeString().slice(0, 5)}`
            }
        },
        {
            title: 'Пользователь',
            dataIndex: 'user',
            key: 'username',
            width: '15%',
            align: 'center',
            render: (user) => `${user.firstName} ${user.lastName}`
        },
        {
            title: 'Город',
            dataIndex: 'user',
            key: 'city',
            width: '10%',
            align: 'center',
            render: (user) => user.city
        },
        {
            title: 'Контакты пользователя',
            dataIndex: 'user',
            key: 'contact',
            width: '25%',
            align: 'center',
            render: (user) => `${user.phoneNumber} | ${user.email}`
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            render: (actions, record) => getActionByType(record, actions, actionsWithHandlers)
        }
    ]

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className={styles.contentContainer}>
            <Table
                columns={columns}
                dataSource={bindRequests}
                pagination={{
                    defaultPageSize: pageSize,
                    total: total * pageSize,
                    onChange: changePage
                }}
                bordered
                size="small"
                tableLayout="auto"
                scroll={{x: 900}}
            />
        </div>
    )
}

export default BoundRequests