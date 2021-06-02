import {Button, List, Popover, Space, Table} from 'antd'
import styles from './Companies.module.scss'
import FilterDropdown from '../common/FilterDropdown/FilterDropdown'
import { SearchOutlined } from '@ant-design/icons';
import React from "react";
import CompanyInfo from "./CompanyInfo/CompanyInfo";

/**
 * Table with companies.
 */
const Companies = (props) => {

    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        props.setNamePart(selectedKeys[0]);
    };

    const handleReset = clearFilters => {
        clearFilters();
        props.setNamePart('');
    };

    const columnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (<FilterDropdown
            setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys}
            confirm={confirm}
            clearFilters={clearFilters}
            handleSearch={handleSearch}
            handleReset={handleReset}
            placeholder={dataIndex}
        />),
        filterIcon: () => <SearchOutlined />,
    })

    const columns = [
        {
            title: 'Название компании',
            dataIndex: 'name',
            key: 'name',
            ...columnSearchProps('Название компании')
        },
        {
            title: 'Офисы',
            dataIndex: 'offices',
            key: 'offices',
            align: 'center',
            width: '30%',
            render: (addresses) => {
                return addresses &&
                    <Space align="center">
                        <List size="small">
                            {addresses.slice(0, 2).map(addr => <List.Item>{addr}</List.Item>)}
                            {addresses.length > 2 && <Popover content={<List size="small">{addresses.map(addr =>
                                <List.Item>{addr}</List.Item>)}</List>}>
                                <List.Item style={{fontStyle: 'italic'}}>все адреса</List.Item>
                            </Popover>}
                        </List>
                    </Space>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (date) => {
                const newDate = new Date(date)
                return `${newDate.toLocaleDateString()}, ${newDate.toLocaleTimeString().slice(0, 5)}`
            }
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            ellipsis: true,
            fixed: 'right',
            align: 'center',
            render: ((actions, record) => actions.map(action =>
                <div>
                    <Button type="link" onClick={() => {
                        props.setSelectedCompanyId(record.id)
                        props.setVisible(true)
                    }}>{action}
                    </Button>
                </div>))
        }
    ]

    const changePage = (page) => {
        props.setCurrentPage(page)
    }

    return (
        <div className={styles.contentContainer}>
            <Table
                columns={columns}
                dataSource={props.companies}
                pagination={{ defaultPageSize: props.pageSize, total: props.totalPages * props.pageSize, onChange: changePage }}
                size="small"
                tableLayout="auto"
                scroll={{ x: 900 }}
                bordered
            />
            {props.selectedCompany && <CompanyInfo
                visible={props.visible}
                setVisible={props.setVisible}
                selectedCompany={props.selectedCompany}
            />}
        </div>
    )
}

export default Companies