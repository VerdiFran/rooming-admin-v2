import {Table} from "antd";
import styles from "../Sessions/Sessions.module.scss";
import React from "react";
import ActionButton from "../common/ActionButton/ActionButton";
import {DELETE_SESSION_ACTION} from "../../utils/actions/sessionsActions";

/**
 * Component with sessions list.
 */
const Sessions = ({sessions, totalSessions, pageSize, setCurrentPage, deleteSession}) => {

    const getSessionActions = (action, record) => {
        switch (action.type) {
            case DELETE_SESSION_ACTION.type:
                return <ActionButton
                    title={action.title}
                    handleClick={() => {
                        deleteSession(record.id)
                    }}
                />
            default:
                return null
        }
    }

    const columns = [
        {
            title: 'Дата и время создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            width: "15%",
            render: (date) => {
                return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()?.slice(0, 5)}`
            }
        },
        {
            title: 'Создатель сессии',
            dataIndex: 'employee',
            key: 'employee',
            align: 'center',
            width: "15%",
            render: (employee) => `${employee.lastName} ${employee.firstName}`
        },
        {
            title: 'Имя сессии',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            width: '15%',
            render: ((actions, session) => session.actions.map(action =>
                getSessionActions(action, session)))
        }
    ]

    const expandedSessionRowRender = (record) => {
        const columns = [
            {
                title: 'Дата и время создания',
                dataIndex: 'createdAt',
                key: 'createdAt',
                align: 'center',
                width: "15%",
                render: (date) => {
                    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()?.slice(0, 5)}`
                }
            },
            {
                title: 'Описание планировки',
                dataIndex: 'description',
                key: 'description'
            }
        ]


        return <Table
            bordered
            columns={columns}
            dataSource={record.layouts}
            pagination={false}
        />
    }

    const changePage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className={styles.contentContainer}>
            <Table
                bordered
                columns={columns}
                dataSource={sessions}
                pagination={{defaultPageSize: pageSize, total: totalSessions * pageSize, onChange: changePage}}
                size="small"
                tableLayout="auto"
                expandable={{expandedRowRender: expandedSessionRowRender, expandRowByClick: false}}
                scroll={{x: 900}}
            />
        </div>
    )
}

export default Sessions