import React, {useState} from 'react'
import {Badge, Table, Button, Space, List, Popover} from 'antd'
import styles from './Orders.module.scss'
import OrderFulfillmentForDeveloper from './OrderFulfillment/OrderFulfillmentForDeveloper'
import OrderFulfillmentContainer from './OrderFulfillment/OrderFulfillmentContainer'

const OrdersForDeveloper = ({ordersData, filteredInfo, sortedInfo, clearFilters, clearAll, handleChange}) => {
    const [currentOrder, setCurrentOrder] = useState(null)
    const [currentLayout, setCurrentLayout] = useState(null)
    const [visible, setVisible] = useState(false)

    const columns = [
        {
            title: 'Описание заказа',
            dataIndex: 'description',
            key: 'description',
            ellipsis: false,
            width: 400
        },
        {
            title: 'Крайний срок',
            dataIndex: 'deadline',
            key: 'deadline',
            ellipsis: false,
            align: 'center'
        },
        {
            title: 'Адреса',
            dataIndex: 'addresses',
            key: 'addresses',
            ellipsis: false,
            render: (addrs => <List size="small">
                {addrs.slice(0, 2).map(addr => <List.Item>{addr}</List.Item>)}
                {addrs.length > 2 && <Popover content={<List size="small">{addrs.map(addr =>
                    <List.Item>{addr}</List.Item>)}</List>}>
                    <List.Item style={{fontStyle: 'italic'}}>все адреса</List.Item>
                </Popover>}
            </List>)
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            ellipsis: true,
            fixed: 'right',
            align: 'center',
            render: (actions => actions.map(act => <div><Button type="link">{act}</Button></div>))
        }
    ]

    const expandedRowRender = (record, index, indent, expanded) => {
        const columns = [
            {
                title: 'Планировки',
                dataIndex: 'layout',
                key: 'layout',
                render: (layout) => layout.complex
                    ? layout.index
                        ? `${layout.city}, ${layout.complex}: ${layout.shortAddress} (${layout.index})`
                        : `${layout.city}, ${layout.complex}: ${layout.shortAddress}`
                    : layout.index
                        ? `${layout.city}: ${layout.shortAddress} (${layout.index})`
                        : `${layout.city}: ${layout.shortAddress}`
            },
            {
                title: 'Статус',
                dataIndex: 'isCompleted',
                key: 'isCompleted',
                render: (value) => value
                    ? <Badge status="success" text="Выполнен" />
                    : <Badge status="processing" text="В процессе" color="yellow"/>
            },
            {
                title: 'Действия',
                dataIndex: 'actions',
                key: 'actions',
                render: ((text, layoutRecord, index) => layoutRecord.actions.map(act => <div>
                    <Button type="link" onClick={() => {
                        setVisible(true)
                        setCurrentOrder(record)
                        setCurrentLayout(layoutRecord.layout)
                    }}>{act}</Button>
                </div>))
            }
        ]

        const data = record.layouts.map(addr => ({
            layout: addr,
            actions: ['Выполнить'],
            key: addr.key,
            isCompleted: addr.isCompleted
        }))

        return <Table columns={columns} dataSource={data} pagination={false}/>
    }

    return (
        <div className={styles.contentContainer}>
            <Table
                columns={columns}
                dataSource={ordersData}
                size="small"
                tableLayout="auto"
                onChange={handleChange}
                expandable={{expandedRowRender, expandRowByClick: true}}
                scroll={{x: 900}}
            />
            {
                currentOrder && currentLayout && <OrderFulfillmentContainer
                    visible={visible}
                    currentOrder={currentOrder}
                    currentLayout={currentLayout}
                    setVisible={setVisible}
                />
            }
        </div>
    )
}

export default OrdersForDeveloper
