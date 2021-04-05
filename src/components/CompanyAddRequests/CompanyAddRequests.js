import { Table } from "antd"
import styles from './CompanyAddRequests.module.scss'

const CompanyAddRequests = (props) => {

    const columns = [
        {
            title: 'Название компании',
            dataIndex: 'name',
            key: 'name',
            elepsis: false
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
        }
    ]

    const changePage = (page, pageSize) => {
        props.setCurrentPage(page)
    }

    return (
        <div className={styles.contentContainer}>
            <Table
                columns={columns}
                dataSource={props.addRequests}
                pagination={{ defaultPageSize: props.pageSize, total: props.totalPages * props.pageSize, onChange: changePage }}
                size="small"
                tableLayout="auto"
                scroll={{ x: 900 }}
            />
        </div>
    )
}

export default CompanyAddRequests