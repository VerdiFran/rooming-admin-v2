import {Button, Space, Table} from 'antd'
import styles from '../CompanyAddRequests/CompanyAddRequests.module.scss'
import React, {useState} from 'react'

/**
 * Bind-user-to-company requests.
 */
const BindRequests = ({bindRequests, setPage, total, pageSize, bindToCompany}) => {
    const [selectedRequests, setSelectedRequests] = useState([])
    const [buttonDisabled, setButtonDisabled] = useState(true)

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
            render: (user) => `${user.phoneNumber} | ${user.email}`
        }
    ]

    const changePage = (page) => {
        setPage(page)
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setButtonDisabled(selectedRows.length === 0)
            setSelectedRequests(selectedRows)
        }
    }

    return (
        <div className={styles.contentContainer}>
            <Space style={{marginBottom: 16}}>
                <Button
                    type="primary"
                    onClick={() => {
                        const ids = selectedRequests.map(request => request.id)
                        bindToCompany(ids)
                        setSelectedRequests([])
                        setPage(1)
                        setButtonDisabled(true)
                    }}
                    disabled={buttonDisabled}
                >
                    Дать доступ к базе
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={bindRequests}
                pagination={{
                    defaultPageSize: pageSize,
                    total: total * pageSize,
                    onChange: changePage
                }}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                selection={selectedRequests}
                bordered
                size="small"
                tableLayout="auto"
                scroll={{x: 900}}
            />
        </div>
    )
}

export default BindRequests