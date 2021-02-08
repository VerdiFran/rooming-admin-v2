import React, {useState} from 'react'
import {Space, Descriptions, Button, Drawer, Upload, message, Typography} from 'antd'
import {InboxOutlined} from '@ant-design/icons'

const OrderFulfillmentForDeveloper = ({visible, currentOrder, currentLayout, setVisible, handleSubmit}) => {
    const {Dragger} = Upload
    const {Title} = Typography

    const [files, setFiles] = useState(null)

    const props = {
        name: 'file',
        multiple: false,
        accept: 'application/zip',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const {status} = info.file
            if (status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`)
                setFiles(info.fileList.map(file => file.originFileObj))
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        }
    }

    return (
        <Drawer
            title="Выполнение заказа"
            width={600}
            onClose={() => setVisible(false)}
            visible={visible}
            bodyStyle={{paddingBottom: 80}}
            footer={
                <div style={{textAlign: 'right'}}>
                    <Button onClick={() => setVisible(false)} style={{marginRight: 8}}>
                        Отмена
                    </Button>
                    <Button onClick={() => {
                        files.length > 0 && handleSubmit(currentLayout.id, files)
                        setVisible(false)
                    }} type="primary">
                        Подтвердить
                    </Button>
                </div>
            }
        >
            <Space size="small" direction="vertical">
                <Title level={5}>Планировка</Title>
                <Descriptions
                    bordered
                    size="small"
                    layout="vertical"
                >
                    <Descriptions.Item label="Город">{currentLayout.city}</Descriptions.Item>
                    <Descriptions.Item label="Адрес" span="2">{currentLayout.shortAddress}</Descriptions.Item>
                    <Descriptions.Item label="Компания">{currentOrder.companyName}</Descriptions.Item>
                    <Descriptions.Item label="Создан">{currentOrder.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="Крайний срок">{currentOrder.deadline}</Descriptions.Item>
                    <Descriptions.Item label="Описание планировки"
                                       span="3">{currentLayout.description}</Descriptions.Item>
                    <Descriptions.Item label="Описание заказа">{currentOrder.description}</Descriptions.Item>
                </Descriptions>
                <br/>
                <Title level={5}>Файлы готовых моделей</Title>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Щелкните или перетащите архив в эту область, чтобы загрузить</p>
                    <p className="ant-upload-hint">
                        Поддерживаются архивы в формате .rar, .zip. Можно загрузить только один архив.
                    </p>
                </Dragger>
            </Space>
        </Drawer>
    )
}

export default OrderFulfillmentForDeveloper
