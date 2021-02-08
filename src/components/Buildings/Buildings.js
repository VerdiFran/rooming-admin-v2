import React from 'react'
import {Badge, Button, List, Popover, Table} from 'antd'
import styles from './Buildings.module.scss'

const Buildings = ({buildings}) => {

    const columns = [
        {
            title: 'Город',
            dataIndex: 'address',
            key: 'address',
            ellipsis: false,
            render: (addr) => addr.city
        },
        {
            title: 'Название комплекса',
            dataIndex: 'name',
            key: 'name',
            ellipsis: false
        },
        {
            title: 'Описание комплекса',
            dataIndex: 'description',
            key: 'description',
            ellipsis: false
        }
    ]

    const expandedComplexRowRender = (record, index, indent, expanded) => {
        const columns = [
            {
                title: 'Адрес здания',
                dataIndex: 'address',
                key: 'address',
                render: addr => addr.streetAndHouse
            },
            {
                title: 'Описание здания',
                dataIndex: 'description',
                key: 'description'
            },
            {
                title: 'Количество готовых планировок',
                dataIndex: 'layouts',
                key: 'layouts',
                render: layouts => layouts.length
            }
        ]

        const data = record.buildings.map(building => ({
            key: building.key,
            address: building.address,
            description: building.description,
            layouts: building.layouts
        }))

        return <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            expandable={{expandedRowRender: expandedBuildingRowRender, expandRowByClick: true}}
        />
    }

    const expandedBuildingRowRender = (record, index, indent, expanded) => {
        const columns = [
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
            actions: layout.actions
        }))

        return <Table
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    }

    return (
        <div className={styles.contentContainer}>
            <Table
                columns={columns}
                dataSource={buildings}
                size="small"
                tableLayout="auto"
                expandable={{expandedRowRender: expandedComplexRowRender, expandRowByClick: true}}
                scroll={{x: 900}}
            />
        </div>
    )
}

export default Buildings
