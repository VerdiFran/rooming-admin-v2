import React, {useState} from 'react'
import {Space, Descriptions, Button, Drawer, Upload, message, Typography} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import {Formik} from 'formik'

const OrderFulfillmentForDeveloper = ({visible, layoutsInfo, setVisible, handleSubmit}) => {
    const {Dragger} = Upload
    const {Title} = Typography

    const [files, setFiles] = useState(null)

    const props = {
        name: 'file',
        multiple: false,
        accept: '.zip,.rar',
        customRequest(reqOption) {
            const {onSuccess, file} = reqOption
            onSuccess(null, file)
        },
        onChange(info) {
            const {status} = info.file
            if (status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (status === 'done') {
                message.success(`${info.file.name} успешно загружен`)
                setFiles(info.fileList.map(file => file.originFileObj))
            } else if (status === 'error') {
                message.error(`Не удалось загрузить ${info.file.name}`)
            }
        }
    }

    return (
        <Formik
            initialValues={{}}
        >
            {
                ({}) => (
                    <Drawer
                        title="Выполнение заказа"
                        width={590}
                        onClose={() => setVisible(false)}
                        visible={visible}
                        bodyStyle={{paddingBottom: 80}}
                        footer={
                            <div style={{textAlign: 'right'}}>
                                <Button onClick={() => setVisible(false)} style={{marginRight: 8}}>
                                    Отмена
                                </Button>
                                <Button onClick={() => {
                                    if (files.length > 0) {
                                        console.log(layoutsInfo[0].orderId)
                                        handleSubmit(layoutsInfo[0].orderId, layoutsInfo[0].id, files)
                                        setVisible(false)
                                    }
                                }} type="primary">
                                    Подтвердить
                                </Button>
                            </div>
                        }
                    >
                        {
                            layoutsInfo.map(layout => {
                                const createdAt = new Date(layout.createdAt)
                                const deadline = new Date(layout.deadline)

                                return <Space size="small" direction="vertical">
                                    <Title level={5}>Планировка</Title>
                                    <Descriptions
                                        bordered
                                        size="small"
                                        layout="vertical"
                                    >
                                        <Descriptions.Item
                                            label="Город">{layout.building.address.city}</Descriptions.Item>
                                        <Descriptions.Item label="Адрес" span="2">
                                            {`Комплекс "${layout.building.complex.name}": ул. ${layout.building.address.street}, д. ${layout.building.address.house}`}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Компания">Some Company</Descriptions.Item>
                                        <Descriptions.Item label="Создан">
                                            {`${createdAt.toLocaleDateString()}, ${createdAt.toLocaleTimeString().slice(0, 5)}`}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Крайний срок">
                                            {`${deadline.toLocaleDateString()}, ${deadline.toLocaleTimeString().slice(0, 5)}`}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Описание планировки" span="3">
                                            {layout.description}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label="Описание заказа">{layout.orderDescription}</Descriptions.Item>
                                    </Descriptions>
                                    <br/>
                                    <Title level={5}>Файлы готовых моделей</Title>
                                    <Dragger  {...props}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined/>
                                        </p>
                                        <p className="ant-upload-text">Щелкните или перетащите архив в эту область,
                                            чтобы
                                            загрузить</p>
                                        <p className="ant-upload-hint">
                                            Поддерживаются архивы в формате .rar, .zip. Можно загрузить только один
                                            архив.
                                        </p>
                                    </Dragger>
                                </Space>
                            })
                        }
                    </Drawer>
                )
            }
        </Formik>
    )
}

export default OrderFulfillmentForDeveloper
