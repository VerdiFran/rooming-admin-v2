import React from 'react'
import {Input, List, Space} from 'antd'
import CompanyHeader from './CompanyHeader/CompanyHeader'
import CompanyDescription from './CompanyDescription/CompanyDescription'

/**
 * List of companies that have layouts databases.
 */
const CompaniesDatabases = ({formik, companies, loading, handleSearch}) => {

    return (
        <Space direction="vertical" size="small" style={{width: '100%', marginTop: '20px'}}>
            <Input.Search
                allowClear
                enterButton
                loading={loading}
                style={{marginTop: '20px'}}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <List>
                {
                    companies.map(company => <List.Item>
                        <Space direction="vertical" size="large" style={{width: '100%', padding: '20px'}}>
                            <CompanyHeader company={company} formik={formik}/>
                            <CompanyDescription company={company}/>
                        </Space>
                    </List.Item>)
                }
            </List>
        </Space>
    )
}

export default CompaniesDatabases
