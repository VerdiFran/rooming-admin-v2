import React, {useState} from 'react'
import {Popover, List, Table, Button, Space, Drawer, Form, Col, Row, Input, Select, DatePicker} from 'antd'
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
            align: 'center'
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
            <NewOrderFormContainer visible={visible} showDrawer={showDrawer} onClose={onClose}/>
        </div>
    )
}

export default OrdersForEmployee
