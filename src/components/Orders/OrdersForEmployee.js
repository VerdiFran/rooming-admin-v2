import React, {useState} from 'react'
import {Popover, List, Table, Button, Space, Badge} from 'antd'
import styles from './Orders.module.scss'
import NewOrderFormContainer from './NewOrderForm/NewOrderFormContainer'
import {IN_PROGRESS, READY_FOR_DEVELOPMENT} from "../../redux/orderFulfillmentStatuses";
import {REMOVE_ORDER_ACTION} from "../../utils/actions/orderActions";
import ActionButton from "../common/ActionButton/ActionButton";

/**
 * Component with employee presentation of orders.
 * @return Table with company orders.
 */
const OrdersForEmployee = ({ordersData, handleChange, setCurrentPage, totalPages, pageSize, handleRemove}) => {
    const [visible, setVisible] = useState(false)

    const columns = [
        {
            title: 'Описание заказа',
            dataIndex: 'description',
            key: 'description',
            width: '40%',
            ellipsis: false
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
            align: 'center',
            width: "20%",
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
            align: 'center',
            width: '20%',
            render: ((actions, record) => actions.map(action => {
                return getButtonByActionType(action, record)
            }))
        }
    ]

    const expandedRowRender = (record) => {
        const columns = [
            {
                title: 'Описание планировки',
                dataIndex: 'description',
                key: 'layoutDescription',
                width: '50%'
            },
            {
                title: 'Статус',
                dataIndex: 'status',
                key: 'status',
                align: 'center',
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
                align: 'center',
                width: '30%',
                render: (executor) => !executor ? 'Заказ еще не находится в разработке'
                    : `${executor.email} | ${executor.firstName} ${executor.lastName}`
            }
        ]

        const data = record.layouts.map(layout => ({
            layout: layout.address,
            actions: layout.actions,
            key: layout.key,
            status: layout.status,
            executor: layout.executor,
            description: layout.description,
            id: layout.id
        }))

        return <Table bordered columns={columns} dataSource={data} pagination={false}/>
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const getButtonByActionType = (action, record) => {
        switch (action.type) {
            case REMOVE_ORDER_ACTION.type:
                return <ActionButton
                    title={action.title}
                    handleClick={() => {
                        handleRemove(record.id)
                    }}
                />
            default:
                return null
        }
    }

    return (
        <div className={styles.contentContainer}>
            <Space style={{marginBottom: 16}}>
                <Button type="primary" onClick={() => {
                    showDrawer()
                }}>Добавить заказ</Button>
            </Space>
            <Table
                bordered
                columns={columns}
                dataSource={ordersData}
                size="small"
                tableLayout="auto"
                onChange={handleChange}
                pagination={{ defaultPageSize: pageSize, total: totalPages * pageSize, onChange: changePage }}
                expandable={{
                    expandedRowRender,
                    expandRowByClick: false
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
