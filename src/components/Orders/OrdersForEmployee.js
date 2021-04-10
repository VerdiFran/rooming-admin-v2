import React, {useState} from 'react'
import {Popover, List, Table, Button, Space, Badge} from 'antd'
import styles from './Orders.module.scss'
import NewOrderFormContainer from './NewOrderForm/NewOrderFormContainer'
import {IN_PROGRESS, READY_FOR_DEVELOPMENT} from "../../redux/orderFulfillmentStatuses";

const OrdersForEmployee = ({ordersData, handleChange}) => {
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
            align: 'center',
            render: (date) => {
                const newDate = new Date(date)
                return `${newDate.toLocaleDateString()}, ${newDate.toLocaleTimeString().slice(0,5)}`
            }
        },
        {
            title: 'Адреса',
            dataIndex: 'addresses',
            key: 'addresses',
            ellipsis: false,
            render: (addrs => <List size="small">
                {addrs.slice(0, 2).map(addr => <List.Item>{addr}</List.Item>)}
                {
                    addrs.length > 2 &&
                    <Popover content={<List size="small">
                        {addrs.map(addr => <List.Item>{addr}</List.Item>)}
                    </List>}>
                        <List.Item style={{fontStyle: 'italic'}}>все адреса</List.Item>
                    </Popover>
                }
            </List>)
        }
    ]

    const expandedRowRender = (record) => {
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
                title: 'Контакт исполнителя',
                dataIndex: 'executor',
                key: 'executor',
                render: (executor) => executor?.email || 'Заказ еще не находится в разработке'
            }
        ]

        const data = record.layouts.map(layout => ({
            layout: layout.address,
            actions: layout.actions,
            key: layout.key,
            status: layout.status,
            executor: layout.executor,
            id: layout.id
        }))

        return <Table columns={columns} dataSource={data} pagination={false}/>
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

    return (
        <div className={styles.contentContainer}>
            <Space style={{marginBottom: 16}}>
                <Button type="primary" onClick={() => {
                    showDrawer()
                }}>Добавить заказ</Button>
            </Space>
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
            <NewOrderFormContainer
                visible={visible}
                showDrawer={showDrawer}
                onClose={onClose}
            />
        </div>
    )
}

export default OrdersForEmployee
