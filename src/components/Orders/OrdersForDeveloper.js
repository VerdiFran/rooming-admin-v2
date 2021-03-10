import React, {useState} from 'react'
import {Badge, Table, Button, Space, List, Popover} from 'antd'
import styles from './Orders.module.scss'
import OrderFulfillmentForDeveloper from './OrderFulfillment/OrderFulfillmentForDeveloper'
import OrderFulfillmentContainer from './OrderFulfillment/OrderFulfillmentContainer'
import {IN_PROGRESS, READY_FOR_DEVELOPMENT} from '../../redux/orderFulfillmentStatuses'

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
                render: (layout) => `г. ${layout.city}, комплекс ${layout.complexName}: ул. ${layout.street}, д. ${layout.house}`
            },
            {
                title: 'Статус',
                dataIndex: 'status',
                key: 'status',
                render: (value) => value === READY_FOR_DEVELOPMENT
                    ? <Badge status="default" text="Создан"/>
                    : value === IN_PROGRESS
                        ? <Badge status="processing" text="В процессе" color="yellow"/>
                        : <Badge status="success" text="Выполнен" />
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

        const data = record.layouts.map(layout => ({
            layout: layout.address,
            actions: layout.actions,
            key: layout.key,
            status: layout.status
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
                expandable={{
                    expandedRowRender,
                    expandRowByClick: true
                }}
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
