import {Table} from 'antd'
import styles from '../Sessions/Sessions.module.scss'
import React from 'react'
import ActionButton from '../common/ActionButton/ActionButton'
import {DELETE_SESSION_ACTION, DELETE_SESSION_LAYOUT_ACTION, START_SESSION} from '../../utils/actions/sessionsActions'
import flame from '../../assets/images/flame.png'
import preloader from '../../assets/images/preloader.svg'

/**
 * Component with sessions list.
 */
const Sessions = ({
                      sessions,
                      totalSessions,
                      pageSize,
                      setCurrentPage,
                      deleteSession,
                      deleteSessionLayout,
                      startSession,
                      sessionsInLoading
                  }) => {

    const getSessionActions = (action, record) => {
        switch (action.type) {
            case DELETE_SESSION_ACTION.type:
                return <ActionButton
                    title={action.title}
                    handleClick={() => {
                        deleteSession(record.id)
                    }}
                />
            case START_SESSION.type:
                return <ActionButton
                    title={action.title}
                    handleClick={() => {
                        startSession(record.id)
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
            width: '15%',
            render: (date, record) => {
                const creationDate = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()?.slice(0, 5)}`
                if (record.isCurrent) {
                    return <div className={styles.currentSessionCell}>
                        <img className={styles.currentSessionImage} src={flame} alt='current' width='20px'
                             height='20px'/>
                        <div className={styles.currentSessionDate}>{creationDate}</div>
                    </div>
                }

                return creationDate
            }
        },
        {
            title: 'Создатель сессии',
            dataIndex: 'employee',
            key: 'employee',
            align: 'center',
            width: '15%',
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
            width: '20%',
            render: ((actions, session) => session.actions.map(action =>
                getSessionActions(action, session)))
        }
    ]

    const expandedSessionRowRender = (record) => {

        const getSessionLayoutActions = (action, record) => {
            switch (action.type) {
                case DELETE_SESSION_LAYOUT_ACTION.type:
                    return <ActionButton
                        title={action.title}
                        handleClick={() => {
                            deleteSessionLayout(record.sessionId, record.id)
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
                width: '15%',
                render: (date) => {
                    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()?.slice(0, 5)}`
                }
            },
            {
                title: 'Описание планировки',
                dataIndex: 'description',
                key: 'description'
            },
            {
                title: 'Действия',
                dataIndex: 'actions',
                key: 'actions',
                align: 'center',
                width: '15%',
                render: ((actions, session) => session.actions.map(action =>
                    getSessionLayoutActions(action, session)))
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
            {
                !sessionsInLoading ? (
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
                ) : (
                    <img src={preloader} alt="preloader"/>
                )
            }
        </div>
    )
}

export default Sessions