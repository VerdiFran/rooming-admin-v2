import React from 'react'
import {Badge, Button, List, Popover, Table} from 'antd'
import styles from './Buildings.module.scss'

const Buildings = ({buildings, pageSize, totalPages, setCurrentPage}) => {

    const columns = [
        {
            title: 'Адрес здания',
            dataIndex: 'address',
            key: 'address',
            ellipsis: false,
            render: (addr) => `г. ${addr.city} ул. ${addr.street}-${addr.house}`
        },
        {
            title: 'Описание здания',
            dataIndex: 'description',
            key: 'description',
            ellipsis: false
        },
        {
            title: 'Комплекс',
            dataIndex: 'complex',
            key: 'complex',
            ellipsis: false,
            render: (complex) => complex.name
        }
    ]

    const expandedBuildingRowRender = (record, index, indent, expanded) => {
        const columns = [
            {
                title: 'Дата и время создания',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (date) => date.toLocaleString()
            },
            {
                title: 'Описание планировки',
                dataIndex: 'description',
                key: 'description'
            },
            {
                title: 'Действия',
                dataIndex: 'actions',
                key: 'actions',
                render: ((text, layoutRecord, index) => layoutRecord.actions.map(act => <div>
                    <Button type="link" onClick={act.handleSubmit}>{act.label}</Button>
                </div>))
            }
        ]

        const data = record.layouts.map(layout => ({
            key: layout.key,
            description: layout.description,
            createdAt: layout.createdAt,
            actions: []
        }))

        return <Table
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    }

    const changePage = (page, pageSize) => {
        setCurrentPage(page)
    }

    return (
        <div className={styles.contentContainer}>
            <Table
                columns={columns}
                dataSource={buildings}
                pagination={{defaultPageSize: pageSize, total: totalPages * pageSize, onChange: changePage}}
                size="small"
                tableLayout="auto"
                expandable={{expandedRowRender: expandedBuildingRowRender, expandRowByClick: true}}
                scroll={{x: 900}}
            />
        </div>
    )
}

export default Buildings
