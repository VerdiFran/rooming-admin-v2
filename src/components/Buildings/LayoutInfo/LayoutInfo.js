import {Button, Descriptions, Drawer, Modal, Space} from "antd";
import React, {useState} from "react";
import SessionsSelector from "../../common/SessionsSelector/SessionsSelector";


const LayoutInfo = ({setVisible, visible, selectedLayout, handleDownload, downloadSessions, addToSession}) => {

    const [sessionSelectorVisibility, setSelectorVisibility] = useState(false)

    const handleSessionsUpdate = async (maxSessions, namePart) => {
        const response = await downloadSessions(1, maxSessions, namePart)
        return response.data.content.map(session => ({id: session.id, name: session.name}))
    }

    const handleSessionSelection = (sessionId) => {
        addToSession(sessionId, [selectedLayout.id])
        setSelectorVisibility(false)
    }

    return <Drawer
        title="Информация о планировке"
        onClose={() => setVisible(false)}
        visible={visible}
        width="35%"
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div style={{textAlign: 'right'}}>
                <Button onClick={() => handleDownload(selectedLayout?.buildingId, selectedLayout?.id)} style={{marginRight: 8}}>Скачать модель планировки</Button>
                <Button onClick={() => setSelectorVisibility(true)} style={{marginRight: 8}}>Добавить в сессию</Button>
                <Button onClick={() => setVisible(false)} style={{marginRight: 8}}>
                    Закрыть
                </Button>
                <Modal
                    title={'Выберете сессию'}
                    visible={sessionSelectorVisibility}
                    onCancel={() => setSelectorVisibility(false)}
                    footer={false}
                    width={'25%'}
                    centred
                >
                    <SessionsSelector
                        handleOptionsUpdate={handleSessionsUpdate}
                        updatingTime={750}
                        handleSelection={handleSessionSelection}/>
                </Modal>
            </div>
        }
    >
        <Space size="small" style={{width: "100%"}} direction="vertical">
            <Descriptions bordered size="small" layout="vertical">
                <Descriptions.Item label="Описание" span={3}>{selectedLayout?.description}</Descriptions.Item>
                <Descriptions.Item label="Контакт исполнителя">{selectedLayout?.createdBy?.email}</Descriptions.Item>
                <Descriptions.Item width="40%" label="Дата и время создания">
                    {`${selectedLayout?.createdAt?.toLocaleDateString()}, ${selectedLayout?.createdAt?.toLocaleTimeString()?.slice(0, 5)}`}
                </Descriptions.Item>
            </Descriptions>
        </Space>
    </Drawer>
}

export default LayoutInfo