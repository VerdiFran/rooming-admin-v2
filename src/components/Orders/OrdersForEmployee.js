import React, {useState} from 'react'
import {Popover, List, Table, Button, Space} from 'antd'
import styles from './Orders.module.scss'
import NewOrderFormContainer from './NewOrderForm/NewOrderFormContainer'

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
