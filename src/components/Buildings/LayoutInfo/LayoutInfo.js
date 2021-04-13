import {Button, Descriptions, Drawer, Space} from "antd";
import React from "react";


const LayoutInfo = ({setVisible, visible, selectedLayout, handleDownload}) => {

    return <Drawer
        title="Информация о планировке"
        onClose={() => setVisible(false)}
        visible={visible}
        width="35%"
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div style={{textAlign: 'right'}}>
                <Button onClick={() => handleDownload(selectedLayout?.buildingId, selectedLayout?.id)} style={{marginRight: 8}}>Скачать модель планировки</Button>
                <Button onClick={() => setVisible(false)} style={{marginRight: 8}}>
                    Закрыть
                </Button>
            </div>
        }
    >
        <Space size="small" style={{width: "100%"}} direction="vertical">
            <Descriptions bordered size="small" layout="vertical">
                <Descriptions.Item label="Описание" span={3}>{selectedLayout?.description}</Descriptions.Item>
                <Descriptions.Item label="Контакт исполнителя">{selectedLayout?.createdBy?.email}</Descriptions.Item>
                <Descriptions.Item width="40%" label="Дата создания">
                    {`${selectedLayout?.createdAt?.toLocaleDateString()}, ${selectedLayout?.createdAt?.toLocaleTimeString()?.slice(0, 5)}`}
                </Descriptions.Item>
            </Descriptions>
        </Space>
    </Drawer>
}

export default LayoutInfo