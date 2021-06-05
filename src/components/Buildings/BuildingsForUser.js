import React, {useState} from 'react'
import {Button, message, Space, Table} from 'antd'
import styles from './Buildings.module.scss'
import ActionButton from '../common/ActionButton/ActionButton'
import {GET_LAYOUT_INFO_ACTION} from '../../utils/actions/layoutActions'
import LayoutInfoContainer from './LayoutInfo/LayoutInfoContainer'
import AddBindRequestsForm from './AddBindRequestsForm/AddBindRequestsForm'
import {useFormik} from 'formik'
import {usersApi} from '../../api/usersApi'
import preloader from '../../assets/images/preloader.svg'

/**
 * Component with buildings list for simple user role.
 */
const BuildingsForUser = ({buildings, pageSize, totalPages, setSelectedLayoutId, setCurrentPage, buildingsInLoading}) => {
    const [layoutInfoVisible, setLayoutInfoVisible] = useState(false)
    const [addRequestsVisible, setAddRequestsVisible] = useState(false)

    const formik = useFormik({
        initialValues: {
            companyIds: []
        },
        onSubmit: values => handleSubmit(values)
    })

    const handleSubmit = (values) => {
        usersApi.addNewRequests(values.companyIds)
            .then(() => {
                setAddRequestsVisible(false)
                message.success('Запрос успешно отправлен')
            })
            .error(() => {
                message.error('Не удалось отправить запрос')
            })
    }

    const columns = [
        {
            title: 'Адрес здания',
            dataIndex: 'address',
            key: 'address',
            width: '25%',
            ellipsis: false,
            render: (addr) => `г. ${addr.city} ул. ${addr.street}-${addr.house}`
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
                        setLayoutInfoVisible(true)
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
                width: '15%',
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
                    <div>
                        <Space style={{marginBottom: 16}}>
                            <Button type="primary" onClick={() => {
                                setAddRequestsVisible(true)
                            }}>Запросить новые планировки</Button>
                        </Space>
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
                    </div>
                ) : (
                    <img src={preloader} alt="preloader"/>
                )
            }
            <LayoutInfoContainer
                setVisible={setLayoutInfoVisible}
                visible={layoutInfoVisible}
            />
            <AddBindRequestsForm
                setVisible={setAddRequestsVisible}
                visible={addRequestsVisible}
                handleSubmit={handleSubmit}
                formik={formik}
            />
        </div>
    )
}

export default BuildingsForUser
