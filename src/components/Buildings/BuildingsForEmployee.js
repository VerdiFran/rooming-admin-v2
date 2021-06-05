import React, {useState} from 'react'
import {Space, Table} from 'antd'
import styles from './Buildings.module.scss'
import ActionButton from '../common/ActionButton/ActionButton'
import {GET_LAYOUT_INFO_ACTION} from '../../utils/actions/layoutActions'
import LayoutInfoContainer from './LayoutInfo/LayoutInfoContainer'
import preloader from '../../assets/images/preloader.svg'

/**
 * Component for buildings list for employee role.
 */
const BuildingsForEmployee = ({
                                  buildings,
                                  pageSize,
                                  totalPages,
                                  setCurrentPage,
                                  setSelectedLayoutId,
                                  buildingsInLoading
                              }) => {

    const [visible, setVisible] = useState(false)

    const columns = [
        {
            title: 'Адрес здания',
            dataIndex: 'address',
            key: 'address',
            width: '20%',
            ellipsis: false,
            align: 'center',
            render: (addr) => <Space align="center">{`г. ${addr.city} ул. ${addr.street}-${addr.house}`}</Space>
        },
        {
            title: 'Описание здания',
            dataIndex: 'description',
            key: 'description',
            ellipsis: false
        },
        {
            title: 'Комплекс',
            dataIndex: 'complex',
            key: 'complex',
            align: 'center',
            width: '20%',
            ellipsis: false,
            render: (complex) => complex?.name ?? 'Отдельное здание'
        }
    ]

    const getButtonByActionType = (action, record) => {
        switch (action.type) {
            case GET_LAYOUT_INFO_ACTION.type:
                return <ActionButton
                    title={action.title}
                    handleClick={() => {
                        setSelectedLayoutId(record.id)
                        setVisible(true)
                    }}
                />
            default:
                return null
        }
    }

    const expandedBuildingRowRender = (record) => {
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
                render: ((text, layoutRecord) => layoutRecord.actions.map(action =>
                    getButtonByActionType(action, layoutRecord)))
            }
        ]

        const data = record.layouts.map(layout => ({
            id: layout.id,
            key: layout.key,
            description: layout.description,
            createdAt: new Date(layout.createdAt),
            actions: layout.actions
        }))

        return <Table
            bordered
            columns={columns}
            dataSource={data}
            pagination={false}
        />
    }

    const changePage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className={styles.contentContainer}>
            {
                !buildingsInLoading ? (
                    <Table
                        bordered
                        columns={columns}
                        dataSource={buildings}
                        pagination={{defaultPageSize: pageSize, total: totalPages * pageSize, onChange: changePage}}
                        size="small"
                        tableLayout="auto"
                        expandable={{expandedRowRender: expandedBuildingRowRender, expandRowByClick: true}}
                        scroll={{x: 900}}
                    />
                ) : (
                    <img src={preloader} alt="preloader"/>
                )
            }
            <LayoutInfoContainer
                setVisible={setVisible}
                visible={visible}
            />
        </div>
    )
}

export default BuildingsForEmployee
