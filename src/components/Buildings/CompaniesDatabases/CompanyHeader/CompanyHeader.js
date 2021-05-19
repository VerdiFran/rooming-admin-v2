import React from 'react'
import {Button, Space, Typography} from 'antd'
import {PlusSquareOutlined, MinusSquareOutlined} from '@ant-design/icons'
import noLogo from './../../../../assets/images/no_logo.png'
import styles from './CompanyHeader.module.scss'
import {FormikProvider} from 'formik'

/**
 * Header of company description.
 */
const CompanyHeader = ({company, formik}) => {
    const {Text} = Typography

    const {values, setFieldValue} = formik

    return (
        <FormikProvider value={formik}>
            <div className={styles.header}>
                <div className={styles.company}>
                    <div className={styles.logoContainer}>
                        <img src={noLogo} alt="no logo" width="44px" height="44px"/>
                    </div>
                    <div className={styles.companyInfo}>
                        <Text strong>{company.name}</Text>
                        <Text
                            type="secondary">{'Работает с нами с ' + company.createdAt.toLocaleDateString()}</Text>
                    </div>
                </div>
                {
                    values.companyIds.includes(company.id)
                        ? <Space>
                            <Text type="secondary">Добавлено</Text>
                            <Button
                                type="primary"
                                icon={<MinusSquareOutlined/>}
                                onClick={() =>
                                    setFieldValue('companyIds', values.companyIds.filter(cId => cId !== company.id))}
                            >Удалить</Button>
                        </Space>
                        : <Button
                            type="default"
                            icon={<PlusSquareOutlined/>}
                            onClick={() => setFieldValue('companyIds', [...values.companyIds, company.id])}
                        >Добавить</Button>
                }
            </div>
        </FormikProvider>
    )
}

export default CompanyHeader
