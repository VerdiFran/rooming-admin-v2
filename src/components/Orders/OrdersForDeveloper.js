import React, {useState} from 'react'
import {Badge, Table, List, Popover} from 'antd'
import styles from './Orders.module.scss'
import OrderFulfillmentContainer from './OrderFulfillment/OrderFulfillmentContainer'
import {IN_PROGRESS, READY_FOR_DEVELOPMENT} from '../../redux/orderFulfillmentStatuses'
import {EXECUTE_ORDER_ACTION, TAKE_ON_EXECUTE_ACTION} from "../../utils/actions/orderActions";
import ActionButton from "../common/ActionButton/ActionButton";

/**
 * Component for developer presentation of orders.
 * @return Table with all orders.
 */
const OrdersForDeveloper = ({ordersData, handleChange, setCurrentLayoutIds, takeLayoutOrderOnExecute, getLoggedUser,
                                setCurrentPage, totalPages, pageSize}) => {
    const [visible, setVisible] = useState(false)

    const columns = [
        {
            title: 'Описание заказа',
            dataIndex: 'description',
            key: 'description',
            ellipsis: false,
            width: '50%'
        },
        {
            title: 'Крайний срок',
            dataIndex: 'deadline',
            key: 'deadline',
            ellipsis: false,
            align: 'center',
            render: (date) => {
                const newDate = new Date(date)
                return `${newDate.toLocaleDateString()}, ${newDate.toLocaleTimeString().slice(0, 5)}`
            }
        },
        {
            title: 'Адреса',
            dataIndex: 'addresses',
            key: 'addresses',
            ellipsis: false,
            width: '30%',
            align: "center",
            render: (addresses => <List size="small">
                {addresses.slice(0, 2).map(addr => <List.Item>{addr}</List.Item>)}
                {addresses.length > 2 && <Popover content={<List size="small">{addresses.map(addr =>
                    <List.Item>{addr}</List.Item>)}</List>}>
                    <List.Item style={{fontStyle: 'italic'}}>все адреса</List.Item>
                </Popover>}
            </List>)
        }
    ]

    const getButtonByActionType = (action, record) => {
        switch (action.type) {
            case EXECUTE_ORDER_ACTION.type:
                return <ActionButton
                    title={action.title}
                    handleClick={() => {
                        setCurrentLayoutIds([record.id])
                        setVisible(true)
                    }}
                />
            case TAKE_ON_EXECUTE_ACTION.type:
                return <ActionButton
                    title={action.title}
                    handleClick={() => {
                        takeLayoutOrderOnExecute(record.id, record.orderId, getLoggedUser())
                    }}
                />
            default:
                return null
        }
    }

    const expandedRowRender = (record) => {
        const columns = [
            {
                title: 'Планировки',
                dataIndex: 'layout',
                key: 'layout',
                width: '35%',
                render: (layout) => {
                    const complexTitle = layout.complexName !== 'Отдельные здания' ? `комплекс ${layout.complexName}:` : ''
                    return `г. ${layout.city}, ${complexTitle} ул. ${layout.street}, д. ${layout.house}`
                }
            },
            {
                title: 'Статус',
                dataIndex: 'status',
                align: 'center',
                key: 'status',
                render: (value) => value === READY_FOR_DEVELOPMENT
                    ? <Badge status="default" text="Создан"/>
                    : value === IN_PROGRESS
                        ? <Badge status="processing" text="В процессе" color="yellow"/>
                        : <Badge status="success" text="Выполнен"/>
            },
            {
                title: 'Действия',
                dataIndex: 'actions',
                key: 'actions',
                align: 'center',
                width: '40%',
                render: ((actions, record) => actions.map(action => {
                    return getButtonByActionType(action, record)
                }))
            }
        ]

        const data = record.layouts.map(layout => ({
            layout: layout.address,
            actions: layout.actions,
            key: layout.key,
            status: layout.status,
            id: layout.id,
            orderId: layout.orderId
        }))

        return <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
        />
    }

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className={styles.contentContainer}>
            <Table
                columns={columns}
                dataSource={ordersData}
                pagination={{ defaultPageSize: pageSize, total: totalPages * pageSize, onChange: changePage }}
                size="small"
                tableLayout="auto"
                bordered
                onChange={handleChange}
                expandable={{
                    expandedRowRender,
                    expandRowByClick: true
                }}
                scroll={{x: 900}}
            />
            <OrderFulfillmentContainer
                visible={visible}
                setVisible={setVisible}
            />
        </div>
    )
}

export default OrdersForDeveloper
