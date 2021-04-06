import {Button, Table} from 'antd'
import styles from './Companies.module.scss'
import FilterDropdown from '../common/FilterDropdown/FilterDropdown'
import { SearchOutlined } from '@ant-design/icons';
import React from "react";
import CompanyInfo from "./CompanyInfo/CompanyInfo";

/**
 * Table with companies.
 */
const Companies = (props) => {

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
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
        filterIcon: filtered => <SearchOutlined />,
    })

    const columns = [
        {
            title: 'Название компании',
            dataIndex: 'name',
            key: 'name',
            elepsis: false,
            ...columnSearchProps('Название компании')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            elepsis: false
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
            elepsis: false,
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

    const changePage = (page, pageSize) => {
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