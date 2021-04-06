import {Button, Descriptions, Drawer, Table} from "antd";
import React from "react";

/**
 * Component with information about company.
 * @param setVisible Set visibility.
 * @param visible Component visibility
 * @param selectedCompany Selected company.
 * @constructor
 */
const CompanyInfo = ({setVisible, visible, selectedCompany}) => {

    const tableColumns = [
        {
            title: 'Имя',
            dataIndex: 'userName',
            key: 'userName',
            elepsis: false
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            elepsis: false
        },
        {
            title: 'Контактный телефон',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            elepsis: false
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
                       </div>
                   }
    >
        <Descriptions title="Описание компании" layout="vertical" bordered>
            <Descriptions.Item label="Название">{selectedCompany?.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedCompany?.email}</Descriptions.Item>
            <Descriptions.Item label="Контактный телефон">{selectedCompany?.contactPhone}</Descriptions.Item>
        </Descriptions>
        <br/>
        <Descriptions title="Информация о сотрудниках"/>
        <Table
            columns={tableColumns}
            dataSource={selectedCompany?.employees}
            pagination={false}
            size="small"
            tableLayout="auto"
        />
    </Drawer>
}

export default CompanyInfo