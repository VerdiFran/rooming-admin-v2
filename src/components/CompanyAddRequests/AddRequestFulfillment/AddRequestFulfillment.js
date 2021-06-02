import {Button, Descriptions, Drawer, Table} from "antd";
import React from "react";

/**
 * Container for component with fulfillment of company-add request.
 * @param selectedRequest Request for fulfillment.
 * @param handleSubmit Starts fulfillment.
 * @param setVisible Set visible property.
 * @param visible Drawer with information visibility.
 */
const AddRequestFulfillment = ({selectedRequest, handleSubmit, setVisible, visible}) => {

    if (!selectedRequest) return <div/>

    const tableColumns = [
        {
            title: 'Имя',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Контактный телефон',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        }
    ]

    return <Drawer title="Информация о компании"
                   width={600}
                   onClose={() => setVisible(false)}
                   visible={visible}
                   footer={
                       <div style={{textAlign: 'right'}}>
                           <Button onClick={() => {
                               setVisible(false)
                           }} style={{marginRight: 8}}>
                               Отмена
                           </Button>
                           <Button onClick={() => {
                               handleSubmit()
                               setVisible(false)
                           }} type="primary">
                               Добавить компанию
                           </Button>
                       </div>
                   }
    >
        <Descriptions size="small" title="Описание компании" layout="vertical" bordered>
            <Descriptions.Item label="Название">{selectedRequest?.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedRequest?.email}</Descriptions.Item>
            <Descriptions.Item label="Контактный телефон">{selectedRequest?.contactPhone}</Descriptions.Item>
        </Descriptions>
        <br/>
        <Descriptions title="Информация о сотрудниках"/>
        <Table
            columns={tableColumns}
            dataSource={selectedRequest.employees}
            pagination={false}
            size="small"
            tableLayout="auto"
            bordered
        />
    </Drawer>
}

export default AddRequestFulfillment