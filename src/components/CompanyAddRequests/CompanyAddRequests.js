import {Button, Space, Table} from "antd"
import styles from './CompanyAddRequests.module.scss'
import AddRequestFulfilmentContainer from "./AddRequestFulfillment/AddRequestFulfilmentContainer";
import React, {useState} from "react";

/**
 * Component for company-add requests management.
 * @param props Props
 */
const CompanyAddRequests = (props) => {
    const [visible, setVisible] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const columns = [
        {
            title: 'Название компании',
            dataIndex: 'name',
            key: 'name',
            elepsis: false
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            elepsis: false
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
            elepsis: false,
            render: (date) => {
                const newDate = new Date(date)
                return `${newDate.toLocaleDateString()}, ${newDate.toLocaleTimeString().slice(0, 5)}`
            }
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            ellipsis: true,
            fixed: 'right',
            align: 'center',
            render: ((actions, record) => actions.map(action =>
                <div>
                    <Button type="link" onClick={() => {
                        props.setSelectedCompanyAddRequest(record.id)
                        setVisible(true)
                    }}>{action}
                    </Button>
                </div>))
        }
    ]

    const changePage = (page) => {
        props.setCurrentPage(page)
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setButtonDisabled(selectedRows.length === 0)
            props.setSelectedRequests(selectedRows)
        }
    }

    return (
        <div className={styles.contentContainer}>
            <Space style={{marginBottom: 16}}>
                <Button
                    type="primary"
                    onClick={() => {
                        const ids = props.selectedRequests.map(request => request.id)
                        props.setSelectedRequests([])
                        props.setCurrentPage(1)
                        props.executeCompanyAddRequests(ids)
                        setButtonDisabled(true)
                    }}
                    disabled={buttonDisabled}
                >
                    Добавить компании
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={props.addRequests}
                pagination={{
                    current: props.currentPage,
                    defaultPageSize: props.pageSize,
                    total: props.totalPages * props.pageSize,
                    onChange: changePage
                }}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                selection={props.selectedRequests}
                size="small"
                tableLayout="auto"
                scroll={{x: 900}}
            />
            <AddRequestFulfilmentContainer
                setVisible={setVisible}
                visible={visible}
                executeCompanyAddRequests={props.executeCompanyAddRequests}
            />
        </div>
    )
}

export default CompanyAddRequests